//import dependencies
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  //checking if there is a Bearer token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    const encoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(encoded.id).select("-password");

    next();

    res.status(401);
    throw new Error("User not authorized");
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, token not provided");
  }
});

export default protect;
