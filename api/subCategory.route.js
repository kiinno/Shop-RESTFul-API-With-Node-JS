const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  createSubCategory,
  getAllSubCategory,
  getSpecificSubCategory,
  updateSubCategory,
  deleteSubCategory,
  setCategoryIDForBody,
  createFilterObj,
} = require("../controllers/subCategory.controller");

const {
  createSubCategoryValidator,
  validateID,
} = require("../utils/validators/subCategory.validator");

router
  .route("/")
  .get(createFilterObj, getAllSubCategory)
  .post(setCategoryIDForBody, createSubCategoryValidator, createSubCategory);

router
  .route("/:id")
  .get(validateID, getSpecificSubCategory)
  .put(validateID, createSubCategoryValidator, updateSubCategory)
  .delete(validateID, deleteSubCategory);
module.exports = router;
