const { check, param } = require("express-validator");

exports.validateUser = () => {
  return [
    check("username", "username is required").not().isEmpty(),
    check("username", "username must be more than 3 characters").isLength({
      min: 3,
    }),
    check("username", "username must be only alphabet characters").isAlpha(),
    check("email", "email must be format of email").isEmail(),
    check("password", "password must be more than 6 characters").isLength({
      min: 6,
    }),
    check("password", "password is required").not().isEmpty(),
    check("phone", "phone is invalid").custom((str) => /^\d{10}$/.test(str)),
  ];
};

exports.validateParamUserID = () => {
  return [
    param("userID", "userID is invalid").custom((str) =>
      /^[a-zA-Z0-9]{24}$/.test(str)
    ),
  ];
};
