import express from "express";
import {
  addPhoto,
  deleteFavoritePhoto,
  getFavoritePhotos,
  updateFavoritePhoto,
} from "../controllers/favoritesController.js";
import protect from "../middleware/authMiddleware.js";

const favoritePhotoRoute = express.Router();

favoritePhotoRoute.post("/", protect, addPhoto);
favoritePhotoRoute.get("/photos", protect, getFavoritePhotos);
favoritePhotoRoute.delete("/delete/:id", protect, deleteFavoritePhoto);
favoritePhotoRoute.put("/edit/:id", protect, updateFavoritePhoto);

export default favoritePhotoRoute;
