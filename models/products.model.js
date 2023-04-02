const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Product Title Is Required"],
      minLength: [3, "Too Short Product Title"],
      maxLength: [100, "Too Long Product Title"],
    },

    slug: {
      type: String,
      required: true,
      lowercase: true,
    },

    description: {
      type: String,
      required: [true, "Product Description Is Required"],
      trim: true,
      minLength: [20, "Too Short Product Description"],
      maxLength: [2000, "Too Long Product Description"],
    },

    quantity: {
      type: Number,
      required: [true, "Product Quantity Is Required"],
    },

    sold: {
      type: Number,
      default: 0,
    },

    price: {
      type: Number,
      required: [true, "Product Price Is Required"],
      trim: true,
      min: [1, "Too Low Product Price"],
    },

    priceAfterDiscount: {
      type: Number,
    },

    colors: [String],

    imageCover: {
      type: String,
      required: [true, "Product Image Cover Is Required"],
    },

    images: [String],

    category: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "category",
      required: [true, "Product Must Be Belong To Category"],
    },

    subCategories: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "SubCategory",
      },
    ],

    brand: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "brand",
    },

    ratingsAverage: {
      type: Number,
      min: [1, "Rating Must Be Above Or Equal 1.0"],
      max: [5, "Rating Must Be Below Or Equal 5.0"],
    },

    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    __v: { type: Number, select: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);
