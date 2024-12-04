const Usermodel = require("../model/user.model");

const generatedRefreshToken = async (userId) => {
  const token = await jwt.sign(
    { id: userId },
    process.env.SECRET_KEY_ACCESS_TOKEN,
    { expiresIn: "7d" }
  );

  const updatedRefreshTokenUser = await Usermodel.updateOne(
    { _id: userId },
    { refresh_token: token } //take this from schema
  );

  return token;
};
module.exports = generatedRefreshToken;
