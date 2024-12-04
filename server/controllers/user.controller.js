const Usermodel = require("../model/user.model");
const bcryptjs = require("bcryptjs");
const sendEmail = require("../config/sendEmail");
const dotenv = require("dotenv");
const verifyEmailTemplate = require("../utils/verifyEmailTemplate");
const { response } = require("express");
const generatedAccessToken = require("../utils/generatedAccesstoken");
const generatedRefreshToken = require("../utils/generatedRefreshToken");
dotenv.config();

const registerUserController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "provide email , name , password",
        error: true,
        success: false,
      });
    }
    const user = await Usermodel.findOne({ email });
    console.log(user);

    if (user) {
      return res.json({
        message: "Alredy register email",
        error: true,
        success: false,
      });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const payload = {
      name,
      email,
      password: hashPassword,
    };
    const newUser = new Usermodel(payload);
    const save = await newUser.save();
    const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`;
    console.log(verifyEmailUrl);
    const verifyEmail = await sendEmail({
      sendTo: email,
      subject: "Verify email form Binkeyit",
      html: verifyEmailTemplate({
        name,
        url: verifyEmailUrl,
      }),
    });

    return res.json({
      message: "User register successfully",
      error: false,
      success: true,
      data: save,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

const verifyEmailcontroller = async (req, res) => {
  try {
    const { code } = req.body;

    const user = await Usermodel.findOne({ _id: code });

    if (!user) {
      return response.status(400).json({
        message: "Invalid code",
        error: true,
        success: false,
      });
    }

    const updateUser = await Usermodel.updateOne(
      { _id: code },
      {
        verify_email: true,
      }
    );

    return response.json({
      message: "Verify email done ",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).josn({
      message: error.message || error,
      error: true,
      success: true,
    });
  }
};

//logincontroller

const logincontroller = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Usermodel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "USer not Register",
        error: true,
        success: false,
      });
    }
    if (user.status !== "Active") {
      return res.status(400).json({
        message: "Conduct to Admin",
        error: true,
        success: false,
      });
    }
    const checkPassword = await bcryptjs.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({
        message: "Check your Password",
        error: true,
        success: false,
      });
    }
    const cookieOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    const accesstoken = await generatedAccessToken(user._id);
    const refreshToken = await generatedRefreshToken(user._id);

    return response.json({
      message: "Login successfully",
      error: false,
      success: true,
      data: {
        accesstoken,
        refreshToken,
      },
    });

    res.cookie("accesstoken", accesstoken, cookieOption);
    res.cookie("refreshToken", refreshToken, cookieOption);
  } catch (error) {
    return res.status(500).json({
      message: error,
      error: true,
      success: false,
    });
  }
};

module.exports = {
  registerUserController,
  logincontroller,
  verifyEmailcontroller,
};
