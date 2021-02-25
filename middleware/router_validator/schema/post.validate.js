const { check, param } = require("express-validator");

exports.validatePost = () => {
  return [
    check("title", "title is require").not().isEmpty(),
    check("contentPost", "contentPost is require").not().isEmpty(),
  ];
};
exports.validateParamPostId = () => {
  return [
    param("postID", "postID is invalid").custom((str) =>
      /^[a-zA-Z0-9]{24}$/.test(str)
    ),
  ];
};
exports.validateCommentOfPost = () => {
  return [check("comment.contentComment").not().isEmpty()];
};
