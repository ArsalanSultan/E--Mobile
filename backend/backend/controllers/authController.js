const User = require("../Models/user");

const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

// register user
const registerUser = async (req, res, next) => {
  try {
    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    const { name, email, password } = req.body;

    const emailVerificationToken = crypto.randomBytes(20).toString("hex");
    const emailVerificationTokenExpiry = Date.now() + 3600000; // 1 hour

    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: result.public_id,
        url: result.secure_url,
      },
      emailVerified: false,
      emailVerificationToken,
      emailVerificationTokenExpiry,
    });

    const verificationUrl = `http://localhost:3000/verify-email?${emailVerificationToken}`;
    const message = `Please click on the following link to verify your email address:\n\n${verificationUrl}\n\nIf you have not requested this email then ignore it.`;
    try {
      await sendEmail({ email, subject: "Email Verification", message });
      res.send({ message: "Plase Verify your email" });
    } catch (err) {
      console.log(err);
    }
    sendToken(user, 200, res);
  } catch (error) {
    res.send(error);
  }
};

// register user with google account => api/v1/register/google

const registerUserWithGoogle = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({
      name,
      email,
      password,
    });

    sendToken(user, 200, res);
  } catch (error) {
    res.send(error);
  }
};

//login user => api/v1/login
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // check if user has entered email and password
    if (!email || !password) {
      throw new ErrorHandler("please enter email & password", 400);
    }
    //finding user db
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new ErrorHandler("Invalid Email or password", 401);
    }

    //checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      throw new ErrorHandler("Invalid Email or password", 401);
    } else {
      //  const {password, ...info} = user._doc;
      //  res.status(200).json(info);
      sendToken(user, 200, res);
    }
  } catch (error) {
    res.send(error);
  }
};

//login user=>api/v1/admin/login

const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // check if user has entered email and password
    if (!email || !password) {
      throw new ErrorHandler("please enter email & password", 400);
    }
    //finding user db
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new ErrorHandler("Invalid Email or password", 401);
    }
    // checks role of the user
    const usser = await User.findOne({ email });
    if (usser.role !== "admin") {
      throw new ErrorHandler("User is not admin", 401);
    }

    //checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      throw new ErrorHandler("Invalid Email or password", 401);
    } else {
      // assign token to user
      sendToken(user, 200, res);
    }
  } catch (error) {
    res.send(error);
  }
};

// forgot password => api/v1/password/forgot
const forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(new ErrorHandler("user not found", 404));
    }
    const resetToken = user.getResetPassToken();

    await user.save({ validateBeforeSave: false });

    //create reset Password url

    //const resetUrl= `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`
    const resetUrl = `http://localhost:3000/password/reset/${resetToken}`;
    const message = `Your password reset token is as follows:\n\n${resetUrl}\n\nIf you have not requested this email then ignore it `;
    try {
      await sendEmail({
        email: req.body.email,
        subject: "Password Recovery Email",
        message,
      });
      res.status(200).json({
        success: true,
        message: "Please Follow the instructions sent to you in email",
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save({ validateBeforeSave: false });
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    res.send(error);
  }
};

// reset Password => api/v1/password/reset/:token
const resetPassword = async (req, res, next) => {
  try {
    //Hash URL token
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
      return next(
        new ErrorHandler("password reset token is invalid or expires", 400)
      );
    }
    if (req.body.password !== req.body.confirmPassword) {
      return next(new ErrorHandler("password does not match", 400));
    }

    //setup new password
    user.password = req.body.password;

    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;

    await user.save();

    sendToken(user, 200, res);
  } catch (error) {
    res.send(error);
  }
};

// get currenttly logged in user => api/v1/me
const getActiveUser = async (req, res, next) => {
  try {
    // console.log("req === ",req.user)
    const user = await User.findById(req.user.id);

    sendToken(user, 200, res);
  } catch (error) {
    res.send(error);
  }
};

//change user password => /api/v1/password/update
const changePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("+password");
    // check previous user  password
    const isMatched = await user.comparePassword(req.body.oldPassword);
    if (!isMatched) {
      return next(new ErrorHandler("old password is incorrect", 400));
    } else {
      user.password = req.body.password;

      await user.save();

      sendToken(user, 200, res);
    }
  } catch (error) {
    res.send(error);
  }
};

//update user profile => /api/v1/me/update

const updateProfile = async (req, res, next) => {
  try {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
    };

    console.log("User id", req.body.id);
    console.log("User Data", newUserData);
    // update avatar
    if (req.body.avatar !== "") {
      const user = await User.findById(req.body.id);
      const image_id = user.avatar.public_id;

      const res = await cloudinary.v2.uploader.destroy(image_id);

      const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });

      newUserData.avatar = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    const user = await User.findByIdAndUpdate(req.body.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json(
      {
        success: true,
      },
      user
    );

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.send(error);
  }
};

//admin routes

//get all users => /api/v1/admin/users

const allUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.send(error);
  }
};
//get eny user with id => /api/v1/admin/user/ id

const userDetail = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(new ErrorHandler("User is not found", 404));
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.send(error);
  }
};

//update userinfo => api/v1/admin/user/:id
const updateUser = async (req, res, next) => {
  try {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.send(error);
  }
};

//deleteuser with id => /api/v1/admin/user/id

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(new ErrorHandler("User is not found", 404));
    }

    await user.remove();

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.send(error);
  }
};

exports.registerUser = registerUser;
exports.registerUserWithGoogle = registerUserWithGoogle;
exports.loginUser = loginUser;
exports.forgotPassword = forgotPassword;
exports.resetPassword = resetPassword;
exports.getActiveUser = getActiveUser;
exports.changePassword = changePassword;
exports.updateProfile = updateProfile;
exports.allUsers = allUsers;
exports.userDetail = userDetail;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.loginAdmin = loginAdmin;
