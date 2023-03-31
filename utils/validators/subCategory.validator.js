const { check } = require("express-validator");
const validationMiddleware = require("./validateResault");
const SubCategory = require("../../models/subCategoryModel");
const Category = require("../../models/categoryModel");
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
    .withMessage("SubCategory Must Be Belong to Category")
    .isMongoId()
    .withMessage("Invalid Category ID Format")
    .custom(async (value, { req }) => {
      const resault = await Category.findById(value);
      if (!resault) {
        throw new Error(`This Category ID '${value}' Is Not Exists`);
      }
      return true;
    }),
  validationMiddleware,
];

/**
 * @desc MongoDB ID Validation Chain
 * @targetField [id]
 * @typeof Array
 */
module.exports.validateID = [
  check("id").isMongoId().withMessage("Invalid SubCategory ID Format"),
  validationMiddleware,
];
