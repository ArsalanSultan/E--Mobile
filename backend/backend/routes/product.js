const express = require("express");
const router = express.Router();
const {
  deleteProduct,
  updateProduct,
  getProductById,
  getProducts,
  newProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
} = require("../controllers/productcontroller");
const { authorizeRoles, isLoggedIn } = require("../middlewares/auth");

router.get("/products", getProducts);
router.get("/product/:id", getProductById);
router.post(
  "/admin/product/new",
  isLoggedIn,
  authorizeRoles("admin"),
  newProduct
);
router.put(
  "/admin/product/:id",
  isLoggedIn,
  authorizeRoles("admin"),
  updateProduct
);
router.delete(
  "/admin/product/:id",
  isLoggedIn,
  authorizeRoles("admin"),
  deleteProduct
);

<<<<<<< HEAD
<<<<<<< HEAD
router.get('/products', getProducts);
router.get('/product/:id', getProductById);
router.post('/admin/product/new', newProduct); // isLoggedIn,authorizeRoles('admin'),
router.put('/admin/product/:id',updateProduct);//isLoggedIn, authorizeRoles('admin'),
router.delete('/admin/product/:id',deleteProduct);//isLoggedIn, authorizeRoles('admin'),
=======
router.post("/review", isLoggedIn, createProductReview);
router.get("/review", isLoggedIn, getProductReviews);
router.delete("/review", isLoggedIn, deleteReview);
>>>>>>> 7a3d48a (Completed the add and delete product module)
=======
router.post("/review", isLoggedIn, createProductReview);
router.get("/review", isLoggedIn, getProductReviews);
router.delete("/review", isLoggedIn, deleteReview);
>>>>>>> 38a4cc75628c0f47b055e719b73da00a161f8b06

module.exports = router;
