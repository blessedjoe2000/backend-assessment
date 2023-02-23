import express from "express";
import photoRouter from "./routes/photoRoutes.js";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import favoritePhotoRoute from "./routes/favoritesRoutes.js";
dotenv.config();

connectDb();

const app = express();

const port = 3000 || process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(`/api/photos`, photoRouter);
app.use("/api/users", userRouter);
app.use("/api/favorites", favoritePhotoRoute);

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
