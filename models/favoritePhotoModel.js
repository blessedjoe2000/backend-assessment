import mongoose from "mongoose";

const favoritePhotosModel = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  url: { type: String },
  description: { type: String },
  username: { type: String },
  explanation: { type: String },
});

export default mongoose.model("FavoritePhotos", favoritePhotosModel);
