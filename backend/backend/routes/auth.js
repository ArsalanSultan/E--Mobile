const express = require("express")
const router = express.Router()

const {registerUser,loginUser,loginAdmin,logout,forgotPassword,resetPassword,getActiveUser,changePassword,updateProfile,allUsers,userDetail, updateUser, deleteUser}= require("../controllers/authController")
const { isLoggedIn,authorizeRoles} = require('../middlewares/auth')



router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/logout',logout )
router.post('/password/forgot',forgotPassword )
router.put('/password/reset/:token',resetPassword )
router.get('/me',isLoggedIn,getActiveUser )
router.put('/password/update',isLoggedIn,changePassword )
router.put('/me/update',isLoggedIn,updateProfile )
router.get('/admin/users',isLoggedIn,authorizeRoles('admin'),allUsers)
router.get('/admin/user/:id',isLoggedIn,authorizeRoles('admin'),userDetail)
router.put('/admin/user/:id',isLoggedIn,authorizeRoles('admin'),updateUser)
router.delete('/admin/user/:id',isLoggedIn,authorizeRoles('admin'),deleteUser)
router.post('/admin/login',loginAdmin)






module.exports = router;