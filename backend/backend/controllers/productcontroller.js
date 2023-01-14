const Product = require("../Models/product");
const ErrorHandler = require("../utils/errorHandler");

const APIFeatures = require("../utils/functionalities");
const cloudinary = require("cloudinary");
//create a new product =>api/v1/product/new

const newProduct = async (req, res, next) => {
  try {
 
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
  })
} catch (error) {
    res.send(error)
};
};

//get single product =>api/v1/product/:id

const getProductById = async (req, res, next) => {
  try {
    
  
  const product = await Product.findById(req.params.id);
  if (!product) {
    next(new ErrorHandler("Product not found", 404));
  } else {
    res.status(200).json({
      success: true,
      product,
    });
  }
} catch (error) {
    res.send(error)
}
};

//getall the products => api/vi/products
const getProducts = async (req, res, next) => {
  try {
    
  
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
} catch (error) {
    res.send(error)
}
};

//update product =>api/v1/admin/product/:id

const updateProduct = async (req, res, next) => {
  try {
   
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
   
} catch (error) {
    res.send(error)
}
};
// delete product =>api/v1/admin/product/:id

const deleteProduct = async (req, res, next) => {
  try {
   
  const product = await Product.findByIdAndRemove(req.params.id);
  if (!product) {
    next(new ErrorHandler("Product not found", 404));
  } else {
    res.status(200).json("product has been deleted");
  }
   
} catch (error) {
    res.send(error)
}
};

// Create new review   =>   /api/v1/review
const createProductReview = async (req, res, next) => {
  try {
   
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
   
} catch (error) {
    res.send(error)
}
};

// Get Product Reviews   =>   /api/v1/reviews
const getProductReviews = async (req, res, next) => {
  try {
   
  const product = await Product.findById(req.query.id);

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
   
} catch (error) {
    res.send(error)
}
};

// Delete Product Review   =>   /api/v1/reviews
const deleteReview = async (req, res, next) => {
  try {
   
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
   
} catch (error) {
    res.send(error)
}
}

exports.newProduct = newProduct;
exports.getProducts = getProducts;
exports.getProductById = getProductById;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
exports.createProductReview = createProductReview;
exports.getProductReviews = getProductReviews;
exports.deleteReview = deleteReview;
