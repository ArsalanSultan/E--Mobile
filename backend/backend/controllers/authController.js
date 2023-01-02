const User = require('../Models/user')

const ErrorHandler = require('../utils/errorHandler')
const {catchAsyncErrors} = require('../middlewares/catchAsyncError');
const sendToken = require('../utils/jwtToken');
const sendEmail =require('../utils/sendEmail')
const crypto = require ('crypto')
const cloudinary = require('cloudinary')

// register user
const registerUser = catchAsyncErrors( async (req,res,next)=>{

    const result = await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:'avatars',
        width:150,
        crop:'scale'
    })
        
    const {name,email,password} = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:result.public_id,
            url:result.secure_url
        }
    })

   sendToken(user,200,res)
})

//login user => api/v1/login
const loginUser = catchAsyncErrors(async(req,res,next)=>{
    const {email,password} = req.body;
    // check if user has entered email and password
    if(!email || !password){
        throw new ErrorHandler("please enter email & password",400)
    }
    //finding user db
const user = await User.findOne({ email }).select('+password')

   if(!user){
    throw new ErrorHandler('Invalid Email or password',401)

     }
      
     //checks if password is correct or not
     const isPasswordMatched = await user.comparePassword(password)
      if(!isPasswordMatched){
        throw new ErrorHandler('Invalid Email or password',401)
      }else{
    //  const {password, ...info} = user._doc;
    //  res.status(200).json(info);
     sendToken(user,200,res)
       
      }
})



//login user=>api/v1/admin/login
const loginAdmin = catchAsyncErrors(async(req,res,next)=>{
    const {email,password} = req.body;
    // check if user has entered email and password
    if(!email || !password){
        throw new ErrorHandler("please enter email & password",400)
    }
    //finding user db
const user = await User.findOne({ email }).select('+password')

   if(!user){
    throw new ErrorHandler('Invalid Email or password',401)

     }
      // checks role of the user
      const usser= await User.findOne({email})
      if(usser.role !== 'admin'){
        throw new ErrorHandler('User is not admin',401)
      }
      
     //checks if password is correct or not
     const isPasswordMatched = await user.comparePassword(password)
      if(!isPasswordMatched){
        throw new ErrorHandler('Invalid Email or password',401)
      }else{
      // assign token to user
      sendToken(user,200,res)
       
      }
})



// forgot password => api/v1/password/forgot
const forgotPassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findOne({ email:req.body.email })
    if(!user){
        return next(new ErrorHandler('user not found',404));
    }
    const resetToken = user.getResetPassToken();

    await user.save({ validateBeforeSave: false })

    //create reset Password url
    const resetUrl= `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`

    const message =`Your password reset token is as follows:\n\n${resetUrl}\n\nIf you have not requested this email then ignore it `
    try {
        await sendEmail({
            email: req.body.email,
            subject:'Password Recovery Email',
            message
        })
        res.status(200).json({
            success: true,
            message: 'Email sent to user'
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false })
        return next (new ErrorHandler(error.message,500))
    }
})


// reset Password => api/v1/password/reset/:token
const resetPassword= catchAsyncErrors(async(req,res,next)=>{
      //Hash URL token
      const resetPasswordToken=crypto.createHash('sha256').update(req.params.token).digest('hex')

      const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt: Date.now() }
      })
      if(!user){
        return next(new ErrorHandler ('password reset token is invalid or expires',400))
      }
      if(req.body.password !== req.body.confirmPassword){
        return next (new ErrorHandler('password does not match',400))
      }
         
      //setup new password
      user.password = req.body.password;
       
      user.resetPasswordExpire = undefined;
      user.resetPasswordToken = undefined;

      await user.save();

      sendToken(user,200,res)


})


// get currenttly logged in user => api/v1/me
const getActiveUser = catchAsyncErrors(async(req,res,next)=>{
    // console.log("req === ",req.user)
    const user = await User.findById(req.user.id);

    sendToken(user,200,res)
})

//change user password => /api/v1/password/update
const changePassword = catchAsyncErrors(async(req,res,next)=>{
   
    const user = await User.findById(req.user.id).select('+password');
     // check previous user  password
     const isMatched = await user.comparePassword(req.body.oldPassword)
     if(!isMatched){
        return next(new ErrorHandler('old password is incorrect',400))
     }else{
     user.password= req.body.password;

     await user.save()

     sendToken(user,200,res)
     }

})

//update user profile => /api/v1/me/update

const updateProfile = catchAsyncErrors(async(req,res,next)=>{
   const newUserData ={
    name:req.body.name,
    email:req.body.email
   }

 // update avatar
 if(req.body.avatar !== ""){
    const user = await User.findById(req.user.id);
    const image_id = user.avatar.public_id
    
    const res =  await cloudinary.v2.uploader.destroy(image_id);

    const result = await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:'avatars',
        width:150,
        crop:'scale'
    });

    newUserData.avatar ={
        public_id: result.public_id,
        url: result.secure_url
    }

   }


    const user = await User.findByIdAndUpdate(req.user.id,newUserData, {
        new:true,
        runValidators:true,
        useFindAndModify: false
    })
      
    res.status(200).json({
        success:true
    })
   
})


// logout user => api/v1/logout
 const logout = catchAsyncErrors(async(req,res,next)=>{
    if (req.session) {
        req.session.destroy()
    }
    res.status(200).json({
        sucess:true,
        message:'logged out'
    })
 })

//admin routes

//get all users => /api/v1/admin/users

const allUsers = catchAsyncErrors(async(req,res,next)=>{
    const users = await User.find()

    res.status(200).json({
        success : true,
        users
    })
})
//get eny user with id => /api/v1/admin/user/ id

const userDetail = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.params.id)

    if(!user){
        return next (new ErrorHandler('User is not found',404))
    }
    res.status(200).json({
        success : true,
        user
    })
})

//update userinfo => api/v1/admin/user/:id
const updateUser = catchAsyncErrors(async(req,res,next)=>{
    const newUserData ={
     name:req.body.name,
     email:req.body.email,
     role:req.body.role
    }
 
     const user = await User.findByIdAndUpdate(req.params.id,newUserData, {
         new:true,
         runValidators:true,
         useFindAndModify: false
     })
       
     res.status(200).json({
         success:true
     })
 })

//deleteuser with id => /api/v1/admin/user/id

const deleteUser = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.params.id)

    if(!user){
        return next (new ErrorHandler('User is not found',404))
    }
     
    await user.remove();

    res.status(200).json({
        success : true,
        
    })
})










exports.registerUser=registerUser;
exports.loginUser=loginUser;
exports.logout= logout;
exports.forgotPassword= forgotPassword;
exports.resetPassword = resetPassword;
exports.getActiveUser = getActiveUser; 
exports.changePassword= changePassword;
exports.updateProfile = updateProfile;
exports.allUsers=allUsers;
exports.userDetail =userDetail;
exports.updateUser =updateUser;
exports.deleteUser = deleteUser;
exports.loginAdmin = loginAdmin;