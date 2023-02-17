import express from "express";
import {
  getUser,
  loginUser,
  registerUser,
} from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/me", protect, getUser);

export default userRouter;
