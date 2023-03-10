//Import functions
import asyncHandler from "express-async-handler";
import FavoritePhotos from "../models/favoritePhotoModel.js";
import User from "../models/userModel.js";

export const addPhoto = asyncHandler(async (req, res) => {
  const { url, description, explanation } = req.body;

  const photo = await FavoritePhotos.create({
    user: req.user.id,
    url,
    description,
    username: req.user.username,
    explanation,
  });

  if (photo) {
    res.status(200).json({ photo });
  }
});

export const getFavoritePhotos = asyncHandler(async (req, res) => {
  const favoritePhotos = await FavoritePhotos.find({ user: req.user.id });

  if (!favoritePhotos) {
    res.status(400);
    throw new Error("Favorite photos not found");
  }

  res.status(200).json(favoritePhotos);
});

export const getFavPhotoById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const photo = await FavoritePhotos.findById(id);

  if (!photo) {
    res.status(400);
    throw new Error("Photo not found");
  }

  if (photo.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  res.status(200).json(photo);
});

export const deleteFavoritePhoto = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const photo = await FavoritePhotos.findById(id);

  if (!photo) {
    res.status(400);
    throw new Error("Photo not found");
  }

  if (photo.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const deletePhoto = await FavoritePhotos.findByIdAndDelete(photo.id);

  if (deletePhoto) {
    res.status(200).json(`photo with id ${id} deleted`);
  }
});

export const updateFavoritePhoto = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const photo = await FavoritePhotos.findById(id);

  if (!photo) {
    res.status(400);
    throw new Error("Photo not found");
  }

  if (photo.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const updatedPhoto = await FavoritePhotos.findByIdAndUpdate(
    photo.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedPhoto);
});
