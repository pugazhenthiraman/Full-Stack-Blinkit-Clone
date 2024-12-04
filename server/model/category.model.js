const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
  },
  { timeseries: true }
);

const categoryModel = mongoose.model("category", categorySchema);
module.exports = categoryModel;
