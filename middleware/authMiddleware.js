//import dependencies
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import BlackList from "../models/blackListModel.js";

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

    //find blacklisted token
    const blackListedToken = await BlackList.find(req.user.token);
    console.log("token", token);
    blackListedToken.map((blackListToken) => {
      if (token === blackListToken.token) {
        res.status(401);
        throw new Error("Not authorize, token invalidated");
      }
    });

    next();
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, token not provided");
  }
});

export default protect;
