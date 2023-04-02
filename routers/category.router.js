const express = require("express");
const subCategoryRouter = require("./sub-category.route");
const slugNameMiddleware = require("../middlewares/slug-name.middleware");

const CategoryModel = require("../models/category.model");

const {
  getCategories,
  createCategory,
  getSpecificCategory,
  deleteCategory,
  updateCategory,
  nestedRouteFilterObj,
} = require("../controllers/category.controller");

const {
  itemExistsValidator,
  validationResultMiddleware,
} = require("../utils/validators/global.validator");

const { categoryValidator } = require("../utils/validators/category.validator");

const categoryRouter = express.Router();

categoryRouter.use(
  "/:categoryId/subcategories",
  itemExistsValidator(CategoryModel, "categoryId", "no category with this id"),
  validationResultMiddleware,
  nestedRouteFilterObj,
  subCategoryRouter
);

categoryRouter
  .route("/")
  .get(getCategories)
  .post(
    categoryValidator,
    validationResultMiddleware,
    slugNameMiddleware("name"),
    createCategory
  );

categoryRouter
  .route("/:id")
  .get(
    itemExistsValidator(CategoryModel),
    validationResultMiddleware,
    getSpecificCategory
  )
  .delete(
    itemExistsValidator(CategoryModel),
    validationResultMiddleware,
    deleteCategory
  )
  .put(
    categoryValidator,
    validationResultMiddleware,
    itemExistsValidator(CategoryModel),
    validationResultMiddleware,
    slugNameMiddleware("name"),
    updateCategory
  );

module.exports = categoryRouter;
