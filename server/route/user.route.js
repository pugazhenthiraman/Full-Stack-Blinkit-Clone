const { Router } = require("express");
const { registerUserController } = require("../controllers/user.controller");
const Usermodel = require("../model/user.model");
const { verifyEmailcontroller } = require("../controllers/user.controller");
const { logincontroller } = require("../controllers/user.controller");

const userRouter = Router();
userRouter.post("/register", registerUserController);
userRouter.post("/verify-email", verifyEmailcontroller);
userRouter.post("/login", logincontroller);

module.exports = userRouter;
