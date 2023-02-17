import express from "express";
import {
  getPhotos,
  getPhotoById,
  getPhotosByUser,
} from "../controllers/photoController.js";

const photoRouter = express.Router();

photoRouter.get("/", getPhotos);

photoRouter.get("/:id", getPhotoById);

photoRouter.get("/user/:username", getPhotosByUser);

export default photoRouter;
