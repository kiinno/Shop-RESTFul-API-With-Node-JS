const express = require("express");

const {
  getBrands,
  addBrand,
  getSpecificBrand,
  deleteBrand,
  updateBrand,
} = require("../controllers/brand.controller");

const {
  validateID,
  updateBrandValidator,
  brandIDValidator,
} = require("../utils/validators/brandValidator");

const brandRouter = express.Router();

brandRouter.route("/").get(getBrands).post(updateBrandValidator, addBrand);

brandRouter
  .route("/:id")
  .all(validateID)
  .get(getSpecificBrand)
  .delete(deleteBrand)
  .put(updateBrandValidator, updateBrand);

module.exports = brandRouter;
