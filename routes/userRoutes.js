//import dependency and functions
import express from "express";
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";

//initiate user route
const userRouter = express.Router();

//create API routes associated with user route
userRouter.post("/", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/me", protect, getUser);
userRouter.put("/logout", protect, logoutUser);

export default userRouter;
