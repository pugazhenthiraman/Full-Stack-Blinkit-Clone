const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    address_line: {
      type: String,
      defalult: "",
    },
    city: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
    pincode: {
      type: String,
    },
    country: {
      type: String,
    },
    mobile: {
      type: Number,
      default: null,
    },
    status: {
      type: Boolean,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Addressmodel = mongoose.model("addres", addressSchema);
module.exports = Addressmodel;
