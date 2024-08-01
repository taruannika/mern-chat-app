const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");

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

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    const token = await jwt.sign(
      { id: user.id, email: user.email },
      config.JWT_SECRET
    );

    const cookieOptions = { httpOnly: true, secure: true };

    return res.cookie("token", token, cookieOptions).status(200).json({
      message: "Logged in successfully",
      success: true,
      token: token,
      user: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser };
