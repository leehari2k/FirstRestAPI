const { HTTP_STATUS_CODE } = require("../constant");

const User = require("../models/user.model");

const create = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    const result = await newUser.save();

    if (!result)
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
        error: "Create failed",
      });

    return res.status(HTTP_STATUS_CODE.CREATE).json(newUser);
  } catch (err) {
    next(err);
  }
};

const getAll = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.status(HTTP_STATUS_CODE.OK).json({ users });
  } catch (err) {
    next(err);
  }
};

const getOne = async (req, res, next) => {
  try {
    const { userID } = req.params;
    const user = await User.findById(userID);
    if (!user)
      return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({
        error: "User not found",
      });
    return res.status(HTTP_STATUS_CODE.OK).json(user);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const { userID } = req.params;
    const user = await User.findById(userID);
    if (!user)
      return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({
        error: "User not found",
      });

    const result = await User.findByIdAndRemove(userID);
    if (!result)
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
        error: "Remove failed",
      });
    return res.status(HTTP_STATUS_CODE.OK).json({ success: true });
  } catch (err) {
    next(err);
  }
};

const removeAll = async (req, res, next) => {
  try {
    const result = await User.deleteMany();
    if (!result)
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
        error: "Remove failed",
      });
    return res.status(HTTP_STATUS_CODE.OK).json({ success: true });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const { userID } = req.params;
    const user = await User.findById(userID);
    if (!user)
      return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({
        error: "User not found",
      });

    const newUser = req.body;
    const result = await User.findByIdAndUpdate(userID, newUser);
    if (!result)
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
        error: "Update failed",
      });
    return res.status(HTTP_STATUS_CODE.OK).json({ success: true });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove,
  removeAll,
};
