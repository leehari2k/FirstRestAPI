const express = require("express");

const controller = require("../controllers/user.controller");

const {
  validateUser,
  validateParamUserID,
} = require("../middleware/router_validator/schema/user.validate");
const {
  getValidationResult,
} = require("../middleware/router_validator/validate");

const router = express.Router();

router
  .route("/users")
  .get(controller.getAll)
  .post(validateUser(), getValidationResult(), controller.create)
  .delete(controller.removeAll);
router
  .route("/users/:userID")
  .get(validateParamUserID(), getValidationResult(), controller.getOne)
  .post(
    validateParamUserID(),
    validateUser(),
    getValidationResult(),
    controller.update
  )
  .delete(validateParamUserID(), getValidationResult(), controller.remove);

module.exports = router;
