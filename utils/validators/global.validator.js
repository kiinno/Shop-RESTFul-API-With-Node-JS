const { param, validationResult } = require("express-validator");
const { default: mongoose } = require("mongoose");

/**
 * Create ID Parameter Validator
 * @param {String} paramName Default 'id'
 * @param {String} msg Default 'id format is not right'
 * @targetFields JSON HTTP-REQ-PARAMS [ id ]
 * @returns Express Validator Middleware
 */
module.exports.IDParamValidator = (
  paramName = "id",
  msg = "id format is not right"
) => param(paramName).isMongoId().withMessage(msg);

/**
 * Create validation Middleware can comminecate with database to check if item is exists
 * @param {mongooseModel}  Model*
 * @param {String}          idParamName   Default 'id'
 * @param {String}          msg           Default 'item not exists'
 * @returns Express Validator Middleware
 */
module.exports.itemExistsValidator = (
  Model,
  idParamName = "id",
  msg = "item not exists"
) =>
  param(idParamName).custom(async (value, { req }) => {
    const documentID = req.params[idParamName];

    if (mongoose.Types.ObjectId.isValid(documentID)) {
      const document = await Model.findById(documentID);

      if (!document) throw new Error(msg);
    } else throw new Error("id format is not right");
  });

/**
 * Checking If Have Any Validation Error To Stop The Middleware Stack And Response The Validation Errors
 * @returns Express Validation Checker Middleware
 */
module.exports.validationResultMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
