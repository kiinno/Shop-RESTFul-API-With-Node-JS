const Category = require("../models/category.model");
const factoryHandlers = require("./factory.controller");

const expressAsyncHandler = require("express-async-handler");

exports.nestedRouteFilterObj = expressAsyncHandler(async (req, _, next) => {
  const { categoryId } = req.params;
  if (categoryId) {
    req.filterObj = { category: categoryId };
    req.body.category = categoryId;
  }
  next();
});

/**
 * @desc        Get All Categories
 * @route       (GET) api/v1/categories
 * @access      Public
 */
exports.getCategories = factoryHandlers.getAllDocuments(Category);

/**
 * @desc        Create New Category
 * @route       (POST) api/v1/categories
 * @access      Private
 */
exports.createCategory = factoryHandlers.createOne(Category);

/**
 * @desc        Get All Categories
 * @route       (GET) api/v1/categories
 * @httpReqParams JSON [id*]
 * @access      Public
 */
exports.getSpecificCategory = factoryHandlers.getOne(Category);

/**
 * @desc        Get All Categories
 * @route       (DELETE) api/v1/categories
 * @httpReqParams JSON [id*]
 * @access      Private
 */
exports.deleteCategory = factoryHandlers.deleteOne(Category);

/**
 * @desc        Update Specific Category
 * @route       (PUT) api/v1/categories
 * @httpReqParams JSON [id*]
 * @httpReqBody JSON [name*]
 * @access      Private
 */
exports.updateCategory = factoryHandlers.updateOne(Category);
