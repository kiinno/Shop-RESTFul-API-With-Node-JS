const Product = require("../models/products.model");
const factoryHandlers = require("./factory.controller");

/**
 * @desc        Get All Products
 * @route       GET api/v1/Product
 * @access      Public
 */
exports.getProducts = factoryHandlers.getAllDocuments(Product);

/**
 * @desc          Create Product
 * @route         POST api/v1/Product
 * @access        Private
 * @requestBody   JSON [name*, image]
 */
exports.createProduct = factoryHandlers.createOne(Product);

/**
 * @desc Get Specific Product By ID
 * @route GET api/v1/product/:id
 * @access Public
 * @reqParams [id]
 */
exports.getSpecificProduct = factoryHandlers.getOne(Product);

/**
 * @desc Delete Specific Product By ID
 * @route DELETE api/v1/categories/:id
 * @access Private
 * @reqParams [id]
 */
exports.deleteProduct = factoryHandlers.deleteOne(Product);

/**
 * @desc Update Product By ID
 * @route PUT api/v1/categories/:id
 * @access Private
 * @reqParams [id]
 * @reqBody JSON [name, image]
 */
exports.updateProduct = factoryHandlers.updateOne(Product);
