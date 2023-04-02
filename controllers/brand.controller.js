const Brand = require("../models/brand.model");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const factoryHandlers = require("./factory.controller");

/**
 * @desc        Get All Brand
 * @route       GET api/v1/Brand
 * @access      Public
 */
exports.getBrands = factoryHandlers.getAllDocuments(Brand);

/**
 * @desc          Create Brand
 * @route         POST api/v1/Brand
 * @access        Private
 * @requestBody   JSON [name*, image]
 */
exports.createBrand = factoryHandlers.createOne(Brand);

/**
 * @desc Get Specific Brand By ID
 * @route GET api/v1/Brand/:id
 * @access Public
 * @reqParams [id]
 */
exports.getSpecificBrand = factoryHandlers.getOne(Brand);

/**
 * @desc Delete Specific Brand By ID
 * @route DELETE api/v1/Brand/:id
 * @access Private
 * @reqParams [id]
 */
exports.deleteBrand = factoryHandlers.deleteOne(Brand);

/**
 * @desc Update Brand By ID
 * @route PUT api/v1/Brand/:id
 * @access Private
 * @reqParams [id]
 * @reqBody JSON [name, image]
 */
exports.updateBrand = factoryHandlers.updateOne(Brand);
