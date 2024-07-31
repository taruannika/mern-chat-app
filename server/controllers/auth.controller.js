const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, confirmpassword } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    return res.status(201).json({
      message: "User created successfully",
      success: true,
      data: savedUser,
    });
  } catch (error) {
    next(error);
  }
};

// TODO: Set token, set cookies and send response
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    res.status(200).json({
      message: "Logged in successfully",
      success: true,
      data: { email, password },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser };
