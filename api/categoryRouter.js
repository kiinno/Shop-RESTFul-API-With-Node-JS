const express = require("express");
const {
  getCategories,
  addCategory,
  //
  getSpecificCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/category.controller");
const categoryRouter = express.Router();

categoryRouter.route("/").get(getCategories).post(addCategory);
categoryRouter
  .route("/:id")
  .get(getSpecificCategory)
  .delete(deleteCategory)
  .put(updateCategory);

module.exports = categoryRouter;
