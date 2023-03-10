import mongoose from "mongoose";

const blackListTokenSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Blacklist", blackListTokenSchema);
