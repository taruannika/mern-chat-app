const { body, validationResult } = require("express-validator");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

const validateEmail = async (email) => {
  try {
    const userInDB = await User.findOne({ email });
    return userInDB;
  } catch (error) {
    throw new Error("Database query error");
  }
};

const validatePassword = async (email, password) => {
  const user = await validateEmail(email);
  if (!user) {
    return false;
  }
  const isMatch = await bcrypt.compare(password, user.password);
  return isMatch;
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
          const emailExist = await validateEmail(email);
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
      return res
        .status(400)
        .json({ message: "Some error", error: true, errors: errors.array() });
    }
    next();
  });

  return validations;
};

const validateUserInDB = (fields) => {
  const validations = [];

  if (fields.includes("email")) {
    validations.push(
      body("email")
        .notEmpty()
        .withMessage("Email is required")
        .bail()
        .custom(async (email, { req }) => {
          const password = req.body.password;
          if (email && password) {
            const emailExist = await validateEmail(email);
            if (!emailExist) {
              throw new Error("User not found");
            }
          }
        })
    );
  }

  if (fields.includes("password")) {
    validations.push(
      body("password")
        .notEmpty()
        .withMessage("Password is required")
        .custom(async (password, { req }) => {
          const email = req.body.email;
          if (email && password) {
            const emailExist = await validateEmail(email);
            if (emailExist) {
              const isPasswordValid = await validatePassword(email, password);
              if (!isPasswordValid) {
                throw new Error("Invalid password");
              }
            }
          }
        })
    );
  }

  validations.push((req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Some error", error: true, errors: errors.array() });
    }
    next();
  });

  return validations;
};
module.exports = { validateFields, validateUserInDB };
