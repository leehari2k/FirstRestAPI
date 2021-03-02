const { HTTP_STATUS_CODE } = require("../constant/index");
const JWT = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/index");
const User = require("../models/user.model");

const encodedToken = (userID) => {
  return JWT.sign(
    {
      iss: "LeNgHai",
      id: userID,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1),
    },
    JWT_SECRET
  );
};

const register = async (req, res, next) => {
  try {
    const { username, email, phone, password } = req.body;
    const emailExists = await User.findOne({ email });
    if (emailExists)
      return res.status(HTTP_STATUS_CODE.FORBIDDEN).json({
        error: "Email is already exists",
      });

    const newUser = new User({ username, email, phone, password });
    const result = await newUser.save();
    if (!result)
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
        error: "register failed",
      });

    const token = encodedToken(newUser._id);
    res.setHeader("Authorization", token);
    return res.status(HTTP_STATUS_CODE.CREATE).json({ success: true });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const user = await User.find({ email });
    if (!user) {
      return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({error: "User not found"})
    }
    if (user[0].password != req.body.password) {
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({error: "Password is incorrect"})
    }
    const token = encodedToken(user[0]._id);
    res.setHeader("Authorization", token);
    return res.status(HTTP_STATUS_CODE.OK).json({ success: true });
  } catch (err) {
    next(err);
  }
};

const authToken = async (req, res, next) => {
  return res.status(HTTP_STATUS_CODE.OK).json({resources: true})
}
module.exports = {
  register,
  login,
  authToken,
};
