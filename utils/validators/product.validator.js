const { check } = require("express-validator");
const validationMiddleware = require("./validateResault");
const SubCategory = require("../../models/subCategoryModel");
const Category = require("../../models/categoryModel");
const { default: mongoose } = require("mongoose");

module.exports.createProductValidator = [
  check("title")
    .notEmpty()
    .withMessage("Product Must Have a Title")
    .isLength({ min: 3 })
    .withMessage("Product Title Must Be At Least 3 Chars")
    .isLength({ max: 100 })
    .withMessage("Too Long Product Title"),

  check("description")
    .notEmpty()
    .withMessage("Product Description Is Required")
    .isLength({ min: 20 })
    .withMessage("Product Description Must Be At Least 20 Chars")
    .isLength({ max: 2000 })
    .withMessage("Too Long Product Description"),

  check("quantity")
    .notEmpty()
    .withMessage("Product Quantity Is Required")
    .isNumeric()
    .withMessage("Product Quantity Must Be Number"),

  check("sold")
    .optional()
    .isNumeric()
    .withMessage("Product Sold quantity must be a number"),

  check("price")
    .notEmpty()
    .withMessage("Product Price Is Required")
    .isNumeric({ min: 0 })
    .withMessage("Product Price Must Be Number")
    .isLength({ max: 32 })
    .withMessage("To long price")
    .toFloat(),

  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage(
      "Product Price After Discount Must Be a Number & Greater Than 0"
    )
    .toFloat()
    .custom((val, { req }) => {
      if (!(val <= +req.body.price))
        throw new Error(
          "Product Price After Discount Must Be Lower Than The Price"
        );
      return true;
    }),

  check("colors")
    .optional()
    .isArray()
    .withMessage("Product Colors Should Be Array of String"),

  check("imageCover").notEmpty().withMessage("Product Image Cover Is Required"),

  check("images")
    .optional()
    .isArray()
    .withMessage("Product Images Should Be Array of String"),

  check("category")
    .notEmpty()
    .withMessage("Product Must Be Belong To a Category")
    .isMongoId()
    .withMessage("Invalid Category ID Format")
    .custom(async (value, { req }) => {
      let resault;
      if (mongoose.Types.ObjectId.isValid(value)) {
        resault = await Category.findById(value);
        if (!resault)
          throw new Error(`This Category ID '${value}' Is Not Exists`);
        return true;
      }
      return false;
    }),

  check("subCategories")
    .optional()
    .isMongoId()
    .withMessage("Invalid SubCategory ID Format")
    .custom(async (value, { req }) => {
      if (Array.isArray(value)) {
        const invalidFields = value.filter(
          (mongo_id) => !mongoose.Types.ObjectId.isValid(mongo_id)
        );
        if (invalidFields.length < 1) {
          const queryResaults = await SubCategory.find(
            {
              _id: { $in: value },
            },
            { _id: true }
          );
          const notExistsFields = [...new Set(value)].filter(
            (field) =>
              !queryResaults.some((queryField) => queryField._id.equals(field))
          );
          if (notExistsFields.length > 0)
            throw new Error(
              `Some SubCategories Is Not Exists [${notExistsFields}]`
            );
        } else {
          throw new Error(
            `Invalid List of SubCategory ID's Format [${invalidFields}]`
          );
        }
      } else if (mongoose.Types.ObjectId.isValid(value)) {
        const queryResault = await SubCategory.findById(value);
        if (!queryResault)
          throw new Error(`SubCategory ID '${value}' Is Not Exists`);
      }
    }),

  check("brand").optional().isMongoId().withMessage("Invalid Brand ID Format"),

  check("ratingsAverage")
    .isNumeric()
    .withMessage("Product Rating Average Must Be Number")
    .toFloat()
    .custom((value, { req }) => {
      if (!(req.body.ratingsAverage > 0 && req.body.ratingsAverage <= 5)) {
        throw new Error("Rating Average Must Be From 1-5 Range");
      }
      return true;
    }),

  check("ratingsQuantity")
    .optional()
    .isNumeric()
    .withMessage("Product Rating Quantity Must Be Number")
    .isNumeric({ min: 1 })
    .withMessage("Ratings Quantity Must Be Above Or Equal 1"),

  validationMiddleware,
];

module.exports.deleteProductValidator = [
  check("id").isMongoId().withMessage("Invalid Product ID"),
  validationMiddleware,
];
module.exports.updateSpecificProductValidator = [
  check("id").isMongoId().withMessage("Invalid Product ID"),
  validationMiddleware,
];
module.exports.getSpecificProductValidator = [
  check("id").isMongoId().withMessage("Invalid Product ID"),
  validationMiddleware,
];
