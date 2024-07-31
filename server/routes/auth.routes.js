const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth.controller");
const middleware = require("../middleware/middleware");

router.post(
  "/register",
  middleware.validateFields(["name", "email", "password", "confirmpassword"]),
  controller.registerUser
);

router.post(
  "/login",
  middleware.validateUserInDB(["email", "password"]),
  controller.loginUser
);

module.exports = router;
