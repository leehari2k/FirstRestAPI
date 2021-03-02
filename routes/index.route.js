const express = require("express");

const router = express.Router();

router.use("/", require("./auth.route"));
router.use("/", require("./post.route"));
router.use("/", require("./user.route"));

module.exports = router;
