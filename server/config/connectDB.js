const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

if (!process.env.MONGODB_URI) {
  throw new Error("Please Provide MONGODB_URI in the .env file");
}

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connect DB");
  } catch {
    console.log("MongoDB connected error", error);
    process.exit(1);
  }
};
module.exports = connectDB;
