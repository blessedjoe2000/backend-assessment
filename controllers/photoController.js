//Require axios to make API calls
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const BASE_URL = `https://api.unsplash.com/`;
const access_key = process.env.UNSPLASH_ACCESS_KEY;

export const getPhotos = async (req, res) => {
  try {
    const result = await axios.get(`${BASE_URL}photos?client_id=${access_key}`);
    const rawPhoto = result.data.map((item) => item.urls.raw);
    res.status(200).json(rawPhoto);
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

export const getPhotosById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await axios.get(`${BASE_URL}photos?client_id=${access_key}`);
    const photo = result.data.find((item) => item.id === id);
    res.status(200).json(photo);
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
