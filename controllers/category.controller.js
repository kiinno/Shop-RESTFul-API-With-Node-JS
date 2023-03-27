const Category = require("../models/categoryModel");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");

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
  const resault = await Category.findById(req.params.id, { __v: 0 });
  res.status(200).json(resault);
});

/**
 * @desc Delete Specific Category By ID
 * @route DELETE api/v1/categories/:id
 * @access Private
 * @reqParams [id]
 */
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const resault = await Category.findByIdAndDelete({ _id: req.params.id });
  if (resault) res.status(200).json(resault);
  res.status(404).json({
    status: false,
    id: req.params.id,
  });
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
  res.status(200).json(resault);
});
