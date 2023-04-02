const { body } = require("express-validator");

/**
 * @desc Update Category Validation Chain
 * @targetField [name]
 * @typeof Array
 */
exports.categoryValidator = [
  body("name")
    .notEmpty()
    .withMessage("Category Name is Required")
    .isLength({ min: 3 })
    .withMessage("Category Name is Too Short")
    .isLength({ max: 32 })
    .withMessage("Category Name is Too Long"),
];
