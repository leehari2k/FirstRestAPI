const { HTTP_STATUS_CODE } = require("../constant/index");
const hapi = require("@hapi/joi");
const User = require("../models/user.model");

const register = async (req, res, next) => {
  try {
    const { username, email, phone, password } = req.body;
    const emailExists = await User.findOne({ email });
    console.log(emailExists);
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

    return res.status(HTTP_STATUS_CODE.CREATE).json({ user: newUser });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
};
