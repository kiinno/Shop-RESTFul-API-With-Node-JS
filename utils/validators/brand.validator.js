const { check } = require("express-validator");

/**
 * @desc Update Brand Validation Chain
 * @targetField [name]
 * @typeof Array
 */
exports.updateBrandValidator = [
  check("name")
    .notEmpty()
    .withMessage("Brand Name is Required")
    .isLength({ min: 2 })
    .withMessage("Brand Name is Too Short")
    .isLength({ max: 32 })
    .withMessage("Brand Name is Too Long"),
];
