const controller = require("../controllers/auth.controller");

const express = require("express");
const router = express.Router();

const {
  getValidationResult,
} = require("../middleware/router_validator/validate");

const {
  validateUser,
} = require("../middleware/router_validator/schema/user.validate");

const passport = require("passport");
const {} = require("../middleware/passport/passport"); //* config passport

router.use(passport.initialize());

router
  .route("/auth/google")
  .post(
    passport.authenticate("google-plus-token", { session: false }),
    controller.authGoogle
  );
router
  .route("/register")
  .post(validateUser(), getValidationResult(), controller.register);

// router
//   .route("/login")
//   .post(
//     passport.authenticate("local", {
//       session: false,
//       successRedirect: "/",
//       failureRedirect: "/login",
//       failureFlash: true,
//     }),
//     controller.login
//   );

router.route("/login").post(
  passport.authenticate("local", {
    session: false,
  }),
  controller.login
);

router.route("/authToken").get(
  passport.authenticate("jwt", {
    session: false,
  }),
  controller.authToken
);

module.exports = router;
