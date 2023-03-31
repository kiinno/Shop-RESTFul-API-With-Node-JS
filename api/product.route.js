const express = require("express");

const {
  createProduct,
  deleteProduct,
  getProducts,
  getSpecificProduct,
  updateProduct,
} = require("../controllers/product.controller");

const {
  createProductValidator,
  deleteProductValidator,
  getSpecificProductValidator,
  updateSpecificProductValidator,
} = require("../utils/validators/product.validator");

const productRouter = express.Router();

productRouter
  .route("/")
  .get(getProducts)
  .post(createProductValidator, createProduct);

productRouter
  .route("/:id")
  .get(getSpecificProductValidator, getSpecificProduct)
  .delete(deleteProductValidator, deleteProduct)
  .put(updateSpecificProductValidator, updateProduct);

module.exports = productRouter;
