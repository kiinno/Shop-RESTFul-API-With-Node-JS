const Category = require("../models/categoryModel");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

/**
 * @desc        Get All Categories
 * @route       GET api/v1/categories
 * @access      Public
 */
exports.getCategories = asyncHandler(async (req, res, next) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 5;
  const skip = (page - 1) * limit;
  const resault = await Category.find({}, { __v: 0 }).skip(skip).limit(limit);
  res.status(200).json({
    resault: Object.keys(resault).length,
    data: resault,
    page: page,
  });
});

/**
 * @desc          Create Category
 * @route         POST api/v1/categories
 * @access        Private
 * @requestBody   JSON [name*, image]
 */
exports.addCategory = asyncHandler(async (req, res, next) => {
  const resault = await Category.create({
    name: req.body.name,
    slug: slugify(req.body.name, {
      lower: true,
      replacement: "-",
      strict: true,
      trim: true,
    }),
  });
  res.status(201).json(resault);
});

/**
 * @desc Get Specific Category By ID
 * @route GET api/v1/categories/:id
 * @access Public
 * @reqParams [id]
 */
exports.getSpecificCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const resault = await Category.findById(id, { __v: 0 });
  if (!resault)
    return next(new ApiError(`Can't Find This Category ${req.params.id}`, 400));
  res.status(200).json(resault);
});

/**
 * @desc Delete Specific Category By ID
 * @route DELETE api/v1/categories/:id
 * @access Private
 * @reqParams [id]
 */
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const resault = await Category.findByIdAndDelete(req.params.id);
  if (!resault)
    return next(new ApiError(`Can't Find This Category ${req.params.id}`, 400));
  res.status(200).json(resault);
});

/**
 * @desc Update Category By ID
 * @route PUT api/v1/categories/:id
 * @access Private
 * @reqParams [id]
 * @reqBody JSON [name, image]
 */
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const resault = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      slug: slugify(req.body.name, {
        lower: true,
        replacement: "-",
        strict: true,
        trim: true,
      }),
    },
    { new: true }
  );
  if (!resault)
    return next(new ApiError(`Can't Find This Category ${req.params.id}`, 400));
  res.status(200).json(resault);
});
