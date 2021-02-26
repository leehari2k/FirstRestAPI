const { HTTP_STATUS_CODE } = require("../constant");

const Post = require("../models/post.model");
const User = require("../models/user.model");

const create = async (req, res, next) => {
  try {
    const { userID } = req.params;
    const user = await User.findById(userID);
    if (!user)
      return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({
        error: "User not found",
      });

    const newPost = new Post(req.body);
    newPost.ownerIdPost = userID;
    const result = await newPost.save();

    if (!result)
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
        error: "Create failed",
      });
    return res.status(HTTP_STATUS_CODE.CREATE).json({ post: newPost });
  } catch (err) {
    next(err);
  }
};

const getAll = async (req, res, next) => {
  try {
    const posts = await Post.find({});
    return res.status(HTTP_STATUS_CODE.OK).json({ posts });
  } catch (err) {
    next(err);
  }
};

const getAllOfAnUser = async (req, res, next) => {
  try {
    const { userID } = req.params;
    const user = await User.findById(userID);
    if (!user)
      return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({
        error: "User not found",
      });
    const posts = await Post.find((userID) => {
      return Post.ownerIdPost == userID;
    });
  } catch (err) {
    next(err);
  }
};

const getOne = async (req, res, next) => {
  try {
    const { postID } = req.params;
    const post = await Post.findById(postID);
    if (!post)
      return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({
        error: "Post not found",
      });
    return res.status(HTTP_STATUS_CODE.OK).json(post);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const { postID, userID } = req.params;

    const user = await User.findById(userID);
    if (!user)
      return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({
        error: "User not found",
      });

    const post = await Post.findById(postID);
    if (!post)
      return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({
        error: "Post not found",
      });

    if (post.ownerIdPost !== userID)
      return res.status(HTTP_STATUS_CODE.FORBIDDEN).json({
        error: "You don't have permission",
      });

    const result = await Post.findByIdAndRemove(postID);
    if (!result)
      return res.status(HTTP_STATUS_CODE.FORBIDDEN).json({
        error: "Remove failed",
      });
    return res.status(HTTP_STATUS_CODE.OK).json({ success: true });
  } catch (err) {
    next(err);
  }
};

const removeAll = async (req, res, next) => {
  try {
    const result = await Post.deleteMany();
    if (!result)
      throw new Error({
        message: "Remove failed",
        status: HTTP_STATUS_CODE.BAD_REQUEST,
      });
    return res.status(HTTP_STATUS_CODE.OK).json({ success: true });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const { postID, userID } = req.params;

    const user = await User.findById(userID);
    if (!user)
      return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({
        error: "User not found",
      });

    const post = await Post.findById(postID);
    if (!post)
      return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({
        error: "Post not found",
      });

    if (post.ownerIdPost !== userID)
      return res.status(HTTP_STATUS_CODE.FORBIDDEN).json({
        error: "You don't have permission",
      });

    const newPost = req.body;
    const result = await Post.findByIdAndUpdate(postID, newPost);
    if (!result)
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
        error: "update failed",
      });
    return res.status(HTTP_STATUS_CODE.OK).json({ success: true });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getAllOfAnUser,
  getOne,
  create,
  update,
  remove,
  removeAll,
};
