
const User = require('../Models/user');
const ErrorHandler = require('../utils/errorHandler');
const jwt = require('jsonwebtoken')
//checks if user is logged in or not

const isLoggedIn = async (req,res,next)=>{
    try {
     
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1];
    
        jwt.verify(token,process.env.JWT_SECRET_KEY,(err,user)=>{
            if(err) {res.status(403).json("token is not valid")}
            else{
            req.user = user;
            next();}
        });
    }else{
        return res.status(401).json("You are not authenticated");
    }

   
} catch (error) {
        res.send(error)
}


    // const {token} = req.cookies

    // if(!token){
    //     return next (new ErrorHandler('Login first to access this resource',401))

    // }
    // const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
    // req.user= await User.findById(decoded.id);

    // next()
}
 const authorizeRoles = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(
            new ErrorHandler(`Role (${req.user.role}) is not allowed to access this resource`,403)
            )
        }
        next()
    }
 }




exports.authorizeRoles= authorizeRoles;
exports.isLoggedIn = isLoggedIn;