const { check } = require("express-validator");
const validateResault = require("./validateResault");

/**
 * @desc MongoDB ID Validation Chain
 * @targetField [id]
 * @typeof Array
 */
module.exports.validateID = [
  check("id").isMongoId().withMessage("Invalid Category ID Format"),
  validateResault,
];

/**
 * @desc Update Category Validation Chain
 * @targetField [name]
 * @typeof Array
 */
exports.updateCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Category Name is Required")
    .isLength({ min: 3 })
    .withMessage("Category Name is Too Short")
    .isLength({ max: 32 })
    .withMessage("Category Name is Too Long"),
  validateResault,
];

/**
 * @desc Category ID Validation Chain
 * @targetField [id]
 * @typeof Array
 */
module.exports.categoryIDValidator = [
  check("categoryId").isMongoId().withMessage("Invalid Category ID Format"),
  validateResault,
];
