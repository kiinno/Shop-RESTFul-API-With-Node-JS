const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

module.exports = (itemNameKey) =>
  asyncHandler(async (req, _, next) => {
    req.body.slug = slugify(req.body[itemNameKey], {
      strict: true,
      lower: true,
      trim: true,
    });
    next();
  });
