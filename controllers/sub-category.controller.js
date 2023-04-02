const factoryHandlers = require("./factory.controller");
const SubCategory = require("../models/sub-category.model");

/**
 * @desc    Create New SubCategory
 * @route   POST /api/v1/subcategories
 * @access  Private
 * @reqBody JSON [name*, category*]
 */
exports.createSubCategory = factoryHandlers.createOne(SubCategory);

/**
 * @desc    Get List Of All SubCategories
 * @route   GET /api/v1/subcategories
 * @access  Public
 */
exports.getAllSubCategory = factoryHandlers.getAllDocuments(SubCategory);

/**
 * @desc Get Specific SubCategory
 * @route GET api/v1/subcategories/:id
 * @access Public
 * @reqParams [id]
 */
exports.getSpecificSubCategory = factoryHandlers.getOne(SubCategory);

/**
 * @desc Update Specific SubCategory
 * @route PUT api/v1/subcategories/:id
 * @access Private
 * @reqParams [id]
 * @reqBody JSON [name, category]
 */
exports.updateSubCategory = factoryHandlers.updateOne(SubCategory);

/**
 * @desc Delete Specific SubCategory
 * @route DELETE api/v1/subcategories/:id
 * @access Private
 * @reqParams [id]
 */
exports.deleteSubCategory = factoryHandlers.deleteOne(SubCategory);
