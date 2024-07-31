const { body, validationResult } = require("express-validator");
const User = require("../models/user.model");

const isEmailAlreadyUsed = async (email) => {
  try {
    const usedEmail = await User.findOne({ email });
    return usedEmail;
  } catch (error) {
    throw new Error("Database query failed");
  }
};

const validateFields = (fields) => {
  const validations = [];

  if (fields.includes("name")) {
    validations.push(body("name").notEmpty().withMessage("Name is required"));
  }

  if (fields.includes("email")) {
    validations.push(
      body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email")
        .custom(async (email) => {
          console.log(`Validating email: ${email}`);
          const emailExist = await isEmailAlreadyUsed(email);
          if (emailExist) {
            throw new Error("Email is already in use");
          }
        })
    );
  }

  if (fields.includes("password")) {
    validations.push(
      body("password").notEmpty().withMessage("Password is required")
    );
  }

  if (fields.includes("confirmpassword")) {
    validations.push(
      body("confirmpassword")
        .notEmpty()
        .withMessage("confirmpassword is required")
        .custom((value, { req }) => value === req.body.password)
        .withMessage("Passwords do not match")
    );
  }

  validations.push((req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  });

  return validations;
};

module.exports = validateFields;
