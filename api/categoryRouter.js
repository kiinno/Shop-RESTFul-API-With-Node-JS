const express = require("express");

const {
  getCategories,
  addCategory,
  getSpecificCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/category.controller");

const {
  validateID,
  updateCategoryValidator,
  categoryIDValidator,
} = require("../utils/validators/categoryValidator");

const subCategoryRouter = require("./subCategory.route");

const categoryRouter = express.Router();

categoryRouter.use(
  "/:categoryId/subcategories",
  categoryIDValidator,
  subCategoryRouter
);

categoryRouter
  .route("/")
  .get(getCategories)
  .post(updateCategoryValidator, addCategory);

categoryRouter
  .route("/:id")
  .all(validateID)
  .get(getSpecificCategory)
  .delete(deleteCategory)
  .put(updateCategoryValidator, updateCategory);

module.exports = categoryRouter;
