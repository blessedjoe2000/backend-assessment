
//import dependency and functions
import express from "express";
import {
  getPhotos,
  getPhotoById,
  getPhotosByUser,
} from "../controllers/photoController.js";

//initiate photo route
const photoRouter = express.Router();

//create API routes associated with photo route
photoRouter.get("/", getPhotos);
photoRouter.get("/:id", getPhotoById);
photoRouter.get("/user/:username", getPhotosByUser);

export default photoRouter;

