const mongoose = require("mongoose");
const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Brand Name Is Required"],
      unique: [true, "Brand Name Must Be Unique"],
      minLength: [2, "Too Short Brand Name"],
      maxLength: [32, "Too Long Brand Name"],
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

module.exports = mongoose.model("brand", brandSchema);
