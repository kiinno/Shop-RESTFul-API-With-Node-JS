const { check } = require("express-validator");
const validateResault = require("./validateResault");

/**
 * @desc MongoDB ID Validation Chain
 * @targetField [id]
 * @typeof Array
 */
module.exports.validateID = [
  check("id").isMongoId().withMessage("Invalid Brand ID Format"),
  validateResault,
];

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
  validateResault,
];

/**
 * @desc Brand ID Validation Chain
 * @targetField [id]
 * @typeof Array
 */
module.exports.brandIDValidator = [
  check("brandId").isMongoId().withMessage("Invalid Brand ID Format"),
  validateResault,
];
