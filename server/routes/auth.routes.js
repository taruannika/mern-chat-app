const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth.controller");
const validateAuthFields = require("../middleware/middleware");

router.post("/register", validateAuthFields, controller.registerUser);

module.exports = router;
