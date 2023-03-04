//Import dependecies abd functions
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();

export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  //check for required field
  if (!username) {
    res.status(400);
    throw new Error("username is required");
  }

  if (!email) {
    res.status(400);
    throw new Error("email is required");
  }

  if (!password) {
    res.status(400);
    throw new Error("password is required");
  }

  //check for a user
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("Email already exist");
  }

  //encrypting the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create a user
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  //if user is created, print user's information
  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("invalid user");
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //check for required field
  if (!email) {
    res.status(400);
    throw new Error("email is required");
  }

  if (!password) {
    res.status(400);
    throw new Error("password is required");
  }

  //find a user
  const user = await User.findOne({ email });

  //if user exist, compare the registration and login password
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("invalid credentials");
  }
  res.status.json({ message: "user logged in" });
});

// export const logoutUser = asyncHandler(async (req, res) => {
//   const { email } = req.body;
//   const user = await User.findOne({ email });

//   if (user) {
//     return await User.deleteOne(generateToken(user._id));
//   }
//   res.json({ message: "logged out" });
// });


export const getUser = async (req, res) => {
  //find a user user using protected route from auth middleware
  const { _id, username, email } = await User.findById(req.user.id);

  res.status(200).json({
    id: _id,
    username,
    email,
  });
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });
};
