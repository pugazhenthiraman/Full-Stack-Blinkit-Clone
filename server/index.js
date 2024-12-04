const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const app = express();
const connectDB = require("./config/connectDB");
const userRouter = require("./route/user.route");

//CORS Middleware Setup:
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);

//Middlwares

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

//Routes api

app.get("/", (req, res) => {
  //server to client
  res.json({
    message: " Server is running " + PORT,
  });
});
app.use("/api/user", userRouter);

//server start
connectDB();
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server us Running", PORT);
});
