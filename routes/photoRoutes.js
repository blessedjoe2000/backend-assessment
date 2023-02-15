import express from "express";
import { getPhotos } from "../controllers/photoController.js";

const router = express.Router();
router.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Unsplash API!" });
});
router.get("/api/photos", getPhotos);

export default router;
