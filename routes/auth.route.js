const controller = require("../controllers/auth.controller");

const express = require("express");

const {
  getValidationResult,
} = require("../middleware/router_validator/validate");

const {
  validateUser,
} = require("../middleware/router_validator/schema/user.validate");

const passport = require("passport");
const {} = require("../middleware/passport/passport");

const router = express.Router();
router.use(passport.initialize());
router
  .route("/register")
  .post(validateUser(), getValidationResult(), controller.register);

router.route("/login").post(controller.login);

router
  .route("/authToken")
  .get(passport.authenticate("jwt", {
    session: false
}), controller.authToken);

module.exports = router;
