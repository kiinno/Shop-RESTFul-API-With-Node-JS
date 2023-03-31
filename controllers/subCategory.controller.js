const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

const SubCategory = require("../models/subCategoryModel");
/**
 * For Swaping 'categoryId' Param To Request Body Field 'category'
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.setCategoryIDForBody = (req, res, next) => {
  if (req.params.categoryId) {
    req.body.category = req.params.categoryId;
  }
  next();
};

/**
 * @desc    Create New SubCategory
 * @route   POST /api/v1/subcategories
 * @access  Private
 * @reqBody JSON [name*, category*]
 */
exports.createSubCategory = asyncHandler(async (req, res, next) => {
  // For Nested Routes
  if (!req.body.category) req.body.category = req.params.categoryId;

  const { name, category } = req.body;
  const resault = await SubCategory.create({
    name,
    slug: slugify(name, {
      replacement: "-",
      lower: true,
      strict: true,
      trim: true,
    }),
    category,
  });
  res.status(200).json(resault);
});

/**
 * Create Data Filter Object And Passing To Req-body
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  req.filter = filterObject;
  next();
};

/**
 * @desc    Get List Of All SubCategories
 * @route   GET /api/v1/subcategories
 * @access  Public
 */
exports.getAllSubCategory = asyncHandler(async (req, res, next) => {
  const { limit = 5, page = 1 } = req.query;
  const skip = (page - 1) * limit;

  const data = await SubCategory.find(req.filter)
    .skip(skip)
    .limit(limit)
    .populate({
      path: "category",
      select: "name",
    });

  res.status(200).json({
    resault: data.length,
    data,
    page,
  });
});

/**
 * @desc Get Specific SubCategory
 * @route GET api/v1/subcategories/:id
 * @access Public
 * @reqParams [id]
 */
exports.getSpecificSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const resault = await SubCategory.findById(id, { __v: 0 }).populate({
    path: "category",
    select: "name -_id",
  });
  if (!resault)
    return next(
      new ApiError(`No SubCategory For This ID ${req.params.id}`, 400)
    );
  res.status(200).json(resault);
});

/**
 * @desc Update Specific SubCategory
 * @route PUT api/v1/subcategories/:id
 * @access Private
 * @reqParams [id]
 * @reqBody JSON [name, category]
 */
exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  const resault = await SubCategory.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      slug: slugify(req.body.name, {
        lower: true,
        replacement: "-",
        strict: true,
        trim: true,
      }),
      category: req.body.category,
    },
    { new: true }
  );
  if (!resault)
    return next(
      new ApiError(`No SubCategory For This ID ${req.params.id}`, 400)
    );
  res.status(200).json(resault);
});

/**
 * @desc Delete Specific SubCategory
 * @route DELETE api/v1/subcategories/:id
 * @access Private
 * @reqParams [id]
 */
exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
  const resault = await SubCategory.findByIdAndDelete(req.params.id);
  if (!resault)
    return next(
      new ApiError(`No SubCategory For This ID ${req.params.id}`, 400)
    );
  res.status(200).json(resault);
});
