const Brand = require("../models/brandModel");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

/**
 * @desc        Get All Brand
 * @route       GET api/v1/Brand
 * @access      Public
 */
exports.getBrands = asyncHandler(async (req, res, next) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 5;
  const skip = (page - 1) * limit;
  const resault = await Brand.find({}, { __v: 0 }).skip(skip).limit(limit);
  res.status(200).json({
    resault: Object.keys(resault).length,
    data: resault,
    page: page,
  });
});

/**
 * @desc          Create Brand
 * @route         POST api/v1/Brand
 * @access        Private
 * @requestBody   JSON [name*, image]
 */
exports.addBrand = asyncHandler(async (req, res, next) => {
  const resault = await Brand.create({
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
 * @desc Get Specific Brand By ID
 * @route GET api/v1/Brand/:id
 * @access Public
 * @reqParams [id]
 */
exports.getSpecificBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const resault = await Brand.findById(id, { __v: 0 });
  if (!resault)
    return next(new ApiError(`Can't Find This Brand ${req.params.id}`, 400));
  res.status(200).json(resault);
});

/**
 * @desc Delete Specific Brand By ID
 * @route DELETE api/v1/Brand/:id
 * @access Private
 * @reqParams [id]
 */
exports.deleteBrand = asyncHandler(async (req, res, next) => {
  const resault = await Brand.findByIdAndDelete(req.params.id);
  if (!resault)
    return next(new ApiError(`Can't Find This Brand ${req.params.id}`, 400));
  res.status(200).json(resault);
});

/**
 * @desc Update Brand By ID
 * @route PUT api/v1/Brand/:id
 * @access Private
 * @reqParams [id]
 * @reqBody JSON [name, image]
 */
exports.updateBrand = asyncHandler(async (req, res, next) => {
  const resault = await Brand.findByIdAndUpdate(
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
    return next(new ApiError(`Can't Find This Brand ${req.params.id}`, 400));
  res.status(200).json(resault);
});
