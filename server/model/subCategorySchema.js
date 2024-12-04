const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    category: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "category",
      },
    ],
  },
  {
    timeseries: true,
  }
);

const subCategoryModel = mongoose.model("subCategory", subCategorySchema);

module.exports = subCategoryModel;
