//import dependecies
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const BASE_URL = `https://api.unsplash.com`;
const access_key = `?client_id=${process.env.UNSPLASH_ACCESS_KEY}`;

export const getPhotos = async (req, res) => {
  try {
    const result = await axios.get(`${BASE_URL + "/photos" + access_key}`);

    if (!result) {
      res.status(500);
      throw new Error(
        json({ message: "Server error. Please try again later." })
      );
    }

    const photoRawUrl = result.data.map((data) => data.urls.raw);
    res.status(200).json(photoRawUrl);
  } catch (error) {
    res.status(404).json({ message: "Not Found" });
  }
};

export const getPhotoById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await axios.get(
      `${BASE_URL + "/photos" + "/" + id + access_key}`
    );

    if (!result) {
      res.status(500);
      throw new Error(
        json({ message: "Server error. Please try again later." })
      );
    }
    res.status(200).json(result.data);
  } catch (error) {
    res.status(404).json({ message: "Not Found" });
  }
};

export const getPhotosByUser = (req, res) => {
  const { username } = req.params;

  axios
    .get(`${BASE_URL + "/users/" + username + access_key}`)
    .then((result) => {
      res.status(200).json({
        id: result.data.id,
        username: result.data.username,
        description: "No description provided",
        photoRawUrl: result.data.photos.map((items) => items.urls.raw),
      });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
};
