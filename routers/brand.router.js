const express = require("express");
const slugNameMiddleware = require("../middlewares/slug-name.middleware");

const brandModel = require("../models/brand.model");

const {
  getBrands,
  createBrand,
  getSpecificBrand,
  deleteBrand,
  updateBrand,
} = require("../controllers/brand.controller");

const { updateBrandValidator } = require("../utils/validators/brand.validator");

const {
  itemExistsValidator,
  validationResultMiddleware,
} = require("../utils/validators/global.validator");

const brandRouter = express.Router();

brandRouter
  .route("/")
  .get(getBrands)
  .post(
    updateBrandValidator,
    validationResultMiddleware,
    slugNameMiddleware("name"),
    createBrand
  );

brandRouter
  .route("/:id")
  .get(
    itemExistsValidator(brandModel),
    validationResultMiddleware,
    getSpecificBrand
  )
  .delete(
    itemExistsValidator(brandModel),
    validationResultMiddleware,
    deleteBrand
  )
  .put(
    updateBrandValidator,
    validationResultMiddleware,
    itemExistsValidator(brandModel),
    validationResultMiddleware,
    slugNameMiddleware("name"),
    updateBrand
  );

module.exports = brandRouter;
