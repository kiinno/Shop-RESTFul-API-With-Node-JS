const { validationResult } = require("express-validator");
/**
 * Checking If Have Any Validation Error To Stop The Middleware Stack And Response The Validation Errors
 * @desc Validation Resault Middleware
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
