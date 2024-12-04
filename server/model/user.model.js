const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Provide name"], // User name is mandatory
    },
    email: {
      type: String,
      required: true,
      unique: [true, "Provide email"], // Email must be unique
    },
    password: {
      type: String,
      required: [true, "Provide password"],
    },
    avatar: {
      type: String, // URL or path to the user's avatar image
      default: "",
    },
    mobile: {
      type: Number,
      default: null,
    },
    refresh_token: {
      type: String, // Used for authentication
      default: "",
    },
    verify_email: {
      type: Boolean,
      default: false, // False by default until the user verifies their email
    },
    last_login_date: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Suspended"], // Possible account statuses
      default: "Active",
    },
    address_details: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "address", // References the 'Address' schema
      },
    ],
    shopping_cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cartProduct", // References the 'CartProduct' schema
      },
    ],
    orderHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "order", // References the 'Order' schema
      },
    ],
    forgot_password_otp: {
      type: String, // OTP for password reset
      default: null,
    },
    forgot_password_expiry: {
      type: Date, // Expiry date for OTP
      default: "",
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"], // User role
      default: "USER",
    },
  },
  { timestamps: true }
); // Enable automatic createdAt and updatedAt fields

const Usermodel = mongoose.model("User", userSchema);
module.exports = Usermodel;
