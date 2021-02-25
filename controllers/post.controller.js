const { HTTP_STATUS_CODE } = require("../constant");

const Post = require("../models/post.model");
const User = require("../models/user.model");

const create = async (req, res, next) => {
  try {
    const { userID } = req.params;
    const user = await User.findById(userID);
    if (!user)
      throw new Object({
        message: "User not found",
        status: HTTP_STATUS_CODE.NOT_FOUND,
      });

    const newPost = new Post(req.body);
    newPost.ownerIdPost = userID;
    const result = await newPost.save();

    if (!result)
      throw new Object({
        message: "Create failed",
        status: HTTP_STATUS_CODE.BAD_REQUEST,
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
      throw new Object({
        message: "User not found",
        status: HTTP_STATUS_CODE.NOT_FOUND,
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
      throw new Object({
        message: "Post not found",
        status: HTTP_STATUS_CODE.NOT_FOUND,
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
      throw new Object({
        message: "User not found",
        status: HTTP_STATUS_CODE.NOT_FOUND,
      });

    const post = await Post.findById(postID);
    if (!post)
      throw new Object({
        message: "Post not found",
        status: HTTP_STATUS_CODE.NOT_FOUND,
      });

    if (post.ownerIdPost !== userID)
      throw new Object({
        message: "You do not have permission to remove this post",
        status: HTTP_STATUS_CODE.BAD_REQUEST,
      });

    const result = await Post.findByIdAndRemove(postID);
    if (!result)
      throw new Object({
        message: "Remove failed",
        status: HTTP_STATUS_CODE.BAD_REQUEST,
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
      throw new Object({
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
      throw new Object({
        message: "User not found",
        status: HTTP_STATUS_CODE.NOT_FOUND,
      });

    const post = await Post.findById(postID);
    if (!post)
      throw new Object({
        message: "Post not found",
        status: HTTP_STATUS_CODE.NOT_FOUND,
      });

    if (post.ownerIdPost !== userID)
      throw new Object({
        message: "You do not have permission to edit this post",
        status: HTTP_STATUS_CODE.BAD_REQUEST,
      });

    const newPost = req.body;
    const result = await Post.findByIdAndUpdate(postID, newPost);
    if (!result)
      throw new Object({
        message: "Update failed",
        status: HTTP_STATUS_CODE.BAD_REQUEST,
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
