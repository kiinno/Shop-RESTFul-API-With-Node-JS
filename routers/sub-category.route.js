const express = require("express");
const router = express.Router({ mergeParams: true });
const slugNameMiddleware = require("../middlewares/slug-name.middleware");
const {
  createSubCategory,
  getAllSubCategory,
  getSpecificSubCategory,
  updateSubCategory,
  deleteSubCategory,
} = require("../controllers/sub-category.controller");

const {
  createSubCategoryValidator,
} = require("../utils/validators/sub-category.validator");

const {
  itemExistsValidator,
  validationResultMiddleware,
} = require("../utils/validators/global.validator");
const SubCategory = require("../models/sub-category.model");

router
  .route("/")
  .get(getAllSubCategory)
  .post(
    createSubCategoryValidator,
    validationResultMiddleware,
    slugNameMiddleware("name"),
    createSubCategory
  );

router
  .route("/:id")
  .get(
    itemExistsValidator(SubCategory),
    validationResultMiddleware,
    getSpecificSubCategory
  )
  .put(
    itemExistsValidator(SubCategory),
    createSubCategoryValidator,
    validationResultMiddleware,
    slugNameMiddleware("name"),
    updateSubCategory
  )
  .delete(
    itemExistsValidator(SubCategory),
    validationResultMiddleware,
    deleteSubCategory
  );
module.exports = router;
