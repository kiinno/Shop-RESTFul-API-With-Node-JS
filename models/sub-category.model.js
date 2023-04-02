const mongoose = require("mongoose");

const SubCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: [true, "Subcategory Must Be Unique"],
      minLength: [2, "Subcategory Name Is Too Short"],
      maxLength: [32, "Subcategory Name Is Too Long"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "category",
      required: [true, "Subcategory Must Be Belong To Parent Category"],
    },
    __v: { type: Number, select: false },
  },
  { timestamps: true }
);

// Mongoose Middleware To Populate Category Field When Find Query Incoming

SubCategorySchema.pre(/^find/i, function (next) {
  this.populate({ path: "category", select: "name" });
  next();
});

module.exports = mongoose.model("SubCategory", SubCategorySchema);
