const Product = require("../Models/product");
const ErrorHandler = require("../utils/errorHandler");
const { catchAsyncErrors } = require("../middlewares/catchAsyncError");
const APIFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");
//create a new product =>api/v1/product/new

const newProduct = catchAsyncErrors(async (req, res, next) => {
  // req.body.user =  req.body.id;
  const { name, price, description, brand, seller, stock } = req.body;

  const result = await cloudinary.v2.uploader.upload(req.body.image, {
    folder: "Products",
    width: 150,
    crop: "scale",
  });
  const product = await Product.create({
    name,
    price,
    description,
    brand,
    seller,
    stock,
    images: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  });
  //   const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//get single product =>api/v1/product/:id

const getProductById = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    next(new ErrorHandler("Product not found", 404));
  } else {
    res.status(200).json({
      success: true,
      product,
    });
  }
});

//getall the products => api/vi/products
const getProducts = catchAsyncErrors(async (req, res, next) => {
  const resPerpage = 8;
  productsCount = await Product.countDocuments();

  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resPerpage);

  const products = await apiFeatures.query;

  res.status(200).json({
    success: true,
    productsCount,
    resPerpage,
    products,
  });
});

//update product =>api/v1/admin/product/:id

const updateProduct = catchAsyncErrors(async (req, res, next) => {
  //let product = await Product.findById(req.params.id);
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );

  if (!product) {
    next(new ErrorHandler("Product not found", 404));
  } else {
    res.status(200).json({
      success: true,
      product,
    });
  }
});
// delete product =>api/v1/admin/product/:id

const deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findByIdAndRemove(req.params.id);
  if (!product) {
    next(new ErrorHandler("Product not found", 404));
  } else {
    res.status(200).json("product has been deleted");
  }
});

// Create new review   =>   /api/v1/review
const createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get Product Reviews   =>   /api/v1/reviews
const getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Product Review   =>   /api/v1/reviews
const deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  console.log(product);

  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );

  const numOfReviews = reviews.length;

  const ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});

exports.newProduct = newProduct;
exports.getProducts = getProducts;
exports.getProductById = getProductById;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
exports.createProductReview = createProductReview;
exports.getProductReviews = getProductReviews;
exports.deleteReview = deleteReview;
