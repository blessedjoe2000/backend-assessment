import mongoose from "mongoose";

const blackListTokenSchema = mongoose.Schema(
  {
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Blacklist", blackListTokenSchema);
