const express = require("express");
const router = express.Router();
const {
  newOrder,
  getSingleOrder,
  myOrders,
  allOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const { isLoggedIn, authorizeRoles } = require("../middlewares/auth");

router.post("/order/new", isLoggedIn, newOrder);
router.get("/order/:id", isLoggedIn, getSingleOrder);
router.get("/orders/me", isLoggedIn, myOrders);
router.get("/admin/orders/", isLoggedIn, authorizeRoles("admin"), allOrders);
router.put(
  "/admin/order/:id",
  //   isLoggedIn,
  //   authorizeRoles("admin"),
  updateOrder
);
router.delete(
  "/admin/order/:id",
  isLoggedIn,
  authorizeRoles("admin"),
  deleteOrder
);

module.exports = router;
