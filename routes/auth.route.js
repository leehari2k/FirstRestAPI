const controller = require("../controllers/auth.controller");

const express = require("express");

const {
  getValidationResult,
} = require("../middleware/router_validator/validate");

const {
  validateUser,
  validateParamUserID,
} = require("../middleware/router_validator/schema/user.validate");

const router = express.Router();

router
  .route("/register")
  .post(validateUser(), getValidationResult(), controller.register);

  router
  .route("/signup")
  .post(controller.signUp);

module.exports = router;
