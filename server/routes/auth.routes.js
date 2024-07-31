const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth.controller");
const validateAuthFields = require("../middleware/middleware");
const validateFields = require("../middleware/middleware");

router.post(
  "/register",
  validateFields(["name", "email", "password", "confirmpassword"]),
  controller.registerUser
);

module.exports = router;
