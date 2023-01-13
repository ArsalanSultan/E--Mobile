const Order = require("../Models/order");
const Product = require("../Models/product");
const User = require('../Models/user')
const ErrorHandler = require("../utils/errorHandler");
const { catchAsyncErrors } = require("../middlewares/catchAsyncError");
const mongoose = require('mongoose')
// create new order => api/v1/order/new

const newOrder = catchAsyncErrors(async (req, res, next) => {
  //console.log(req.body, "data is here")
  const user = req.user.id
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    user,
    paidAt: Date.now(),
  });
 // console.log(req.body.user);
//   let result = await Order.aggregate([
//     {
//       $match: {
//         user: mongoose.Types.ObjectId(req.body.user),
//       },
//     },
//     {
//       $lookup: {
//         from: "users",
//         localField: "user", // field in the Order collection
//         foreignField: "_id", // field in the user collection
//         as: "fromItems",
//       },
//     },
//     {
//       $unwind: { path: "$fromItems", preserveNullAndEmptyArrays: true },
//     },
//     {
//       $project: {
//         _id:0,
//         Name: "$fromItems.name",
//         email:"$fromItems.email"
//       },
//     },
//   ]);
//   console.log("result",result);
// console.log(user)
  res.status(200).json({
    success: true,
    order,
  });
});

// Get single order   =>   /api/v1/order/:id
const getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("No Order found with this ID", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// Get logged in user orders   =>   /api/v1/orders/me
const myOrders = catchAsyncErrors(async (req, res, next) => {
  //const user = req.user.id
  const orders = await Order.find({ user: req.user.id});

  res.status(200).json({
    success: true,
    orders,
  });
});

// Get all orders - ADMIN  =>   /api/v1/admin/orders/
const allOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find().populate(
    "user",
    "name email"
  );;

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// Update / Process order - ADMIN  =>   /api/v1/admin/order/:id
const updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this order", 400));
  }

  order.orderItems.forEach(async (item) => {
    await updateStock(item.product, item.quantity);
  });

  (order.orderStatus = req.body.status), (order.deliveredAt = Date.now());

  await order.save();

  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock = product.stock - quantity;

  await product.save({ validateBeforeSave: false });
}

// Delete order   =>   /api/v1/admin/order/:id
const deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("No Order found with this ID", 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
});

exports.newOrder = newOrder;
exports.getSingleOrder = getSingleOrder;
exports.myOrders = myOrders;
exports.allOrders = allOrders;
exports.updateOrder = updateOrder;
exports.deleteOrder = deleteOrder;
