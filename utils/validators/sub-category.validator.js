const { check } = require("express-validator");
const Category = require("../../models/category.model");
const { default: mongoose } = require("mongoose");
/**
 * @desc Create SubCategory Validator
 * @targetFields [name*, category*]
 */
exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("SubCategory Name Is Required")
    .isLength({ min: 2 })
    .withMessage("SubCategory Name Is Too Short")
    .isLength({ max: 32 })
    .withMessage("SubCategory Name Is Too Long"),
  check("category")
    .notEmpty()
    .withMessage("main category is required")
    .isMongoId()
    .withMessage("invalid main category id format")
    .custom(async (value, { req }) => {
      if (mongoose.Types.ObjectId.isValid(value) && !req.params.categoryId) {
        const document = await Category.findById(value);
        if (!document) {
          throw new Error(`no category for this id`);
        }
      }
    }),
];
