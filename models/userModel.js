import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: { true: "enter username" } },
    email: {
      type: String,
      required: { true: "enter email" },
      unique: true,
    },
    password: {
      type: String,
      required: { true: "enter password" },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
