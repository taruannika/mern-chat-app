const { body, validationResult } = require("express-validator");
const User = require("../models/user.model");

const isEmailAlreadyUsed = async (email) => {
  try {
    console.log(`Checking if email ${email} is already used`);
    const usedEmail = await User.findOne({ email });
    console.log(`Email ${email} is ${usedEmail ? "already used" : "not used"}`);
    return usedEmail;
  } catch (error) {
    console.error(`Error checking email: ${error.message}`);
    throw new Error("Database query failed");
  }
};

const validateAuthFields = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email")
    .custom(async (email) => {
      console.log(`Validating email: ${email} `);
      const emailExist = await isEmailAlreadyUsed(email);
      if (emailExist) {
        throw new Error("Email is already in use");
      }
    }),
  body("password").notEmpty().withMessage("password is required"),
  body("confirmpassword")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log("Validation passed, proceeding to next middleware");
    next();
  },
];

module.exports = validateAuthFields;
