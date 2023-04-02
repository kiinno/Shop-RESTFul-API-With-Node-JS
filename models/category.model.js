const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category Name Is Required"],
      unique: [true, "Category Name Must Be Unique"],
      minLength: [3, "Too Short Category Name"],
      maxLength: [32, "Too Long Category Name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: { type: String },
    __v: { type: Number, select: false },
  },
  { timestamps: true }
);
const CategoryModel = mongoose.model("category", categorySchema);

module.exports = CategoryModel;
