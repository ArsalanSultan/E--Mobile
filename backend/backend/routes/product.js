const express = require('express');
const router = express.Router();
const { deleteProduct,updateProduct,getProductById, getProducts ,newProduct, createProductReview, getProductReviews, deleteReview } = require('../controllers/productcontroller');
 const {  authorizeRoles, isLoggedIn}= require('../middlewares/auth')


router.get('/products', getProducts);
router.get('/product/:id', getProductById);
router.post('/admin/product/new', newProduct); // isLoggedIn,authorizeRoles('admin'),
router.put('/admin/product/:id',updateProduct);//isLoggedIn, authorizeRoles('admin'),
router.delete('/admin/product/:id',deleteProduct);//isLoggedIn, authorizeRoles('admin'),

router.post('/review',isLoggedIn,createProductReview);
router.get('/review',isLoggedIn,getProductReviews);
router.delete('/review',isLoggedIn,deleteReview)


module.exports = router;