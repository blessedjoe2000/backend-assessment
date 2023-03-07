//import dependecies
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const BASE_URL = `https://api.unsplash.com`;
const access_key = `?client_id=${process.env.UNSPLASH_ACCESS_KEY}`;

export const getPhotos = async (req, res) => {
  try {
    const result = await axios.get(`${BASE_URL + "/photos" + access_key}`);
    const rawPhoto = result.data.map((data) => data.urls.raw);
    res.status(200).json(rawPhoto);
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again later." });
    res.status(404).json({ message: "Not Found" });
  }
};

export const getPhotoById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await axios.get(
      `${BASE_URL + "/photos" + "/" + id + access_key}`
    );
    res.status(200).json(result.data);
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again later." });
    res.status(404).json({ message: "Not Found" });
  }
};

export const getPhotosByUser = (req, res) => {
  const { username } = req.params;

  axios
    .get(`${BASE_URL + "/users/" + username + access_key}`)
    .then((result) => {
      // console.log(result);
      res.status(200).json({
        id: result.data.id,
        username: result.data.username,
        description: result.data.tags.aggregated.map((items) => {
          if (items.source) {
            items.source.cover_photo.description;
          }
        }),

        url: result.data.photos.map((photo) => photo.urls.raw),
      });

      // const userPhotos = result.data.tags.aggregated.map((data) => {
      //   if (data.source) {
      //     return {
      //       id: data.source.cover_photo.id,
      //       username: username,
      //       description:
      //         data.source.cover_photo.description === null
      //           ? "No description provided"
      //           : data.source.cover_photo.description,
      //       url: data.source.cover_photo.urls.raw,
      //     };
      //   }
      // });
      // res.status(200).json(userPhotos);

      // res.status(200).json(result.data);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
};
