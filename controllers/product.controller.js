const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const Product = require("../models/products.model");

/**
 * @desc        Get All Products
 * @route       GET api/v1/Product
 * @access      Public
 */
exports.getProducts = asyncHandler(async (req, res, next) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 5;
  const skip = (page - 1) * limit;
  const resault = await Product.find({}, { __v: 0 }).skip(skip).limit(limit);
  res.status(200).json({
    resault: Object.keys(resault).length,
    data: resault,
    page: page,
  });
});

/**
 * @desc          Create Product
 * @route         POST api/v1/Product
 * @access        Private
 * @requestBody   JSON [name*, image]
 */
exports.createProduct = asyncHandler(async (req, res, next) => {
  req.body.slug = slugify(req.body.title, {
    lower: true,
    replacement: "-",
    trim: true,
    strict: true,
  });
  const resault = await Product.create(req.body);
  res.status(201).json(resault);
});

/**
 * @desc Get Specific Product By ID
 * @route GET api/v1/product/:id
 * @access Public
 * @reqParams [id]
 */
exports.getSpecificProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const resault = await Product.findById(id, { __v: 0 });
  if (!resault)
    return next(new ApiError(`Can't Find This Product ${req.params.id}`, 400));
  res.status(200).json(resault);
});

/**
 * @desc Delete Specific Product By ID
 * @route DELETE api/v1/categories/:id
 * @access Private
 * @reqParams [id]
 */
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const resault = await Product.findByIdAndDelete(req.params.id);
  if (!resault)
    return next(new ApiError(`Can't Find This Product ${req.params.id}`, 400));
  res.status(200).json(resault);
});

/**
 * @desc Update Product By ID
 * @route PUT api/v1/categories/:id
 * @access Private
 * @reqParams [id]
 * @reqBody JSON [name, image]
 */
exports.updateProduct = asyncHandler(async (req, res, next) => {
  req.body.slug = slugify(req.body.title, {
    lower: true,
    replacement: "-",
    trim: true,
    strict: true,
  });
  const resault = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!resault)
    return next(new ApiError(`Can't Find This Product ${req.params.id}`, 400));
  res.status(200).json(resault);
});
