//import all dependecies
import express from "express";

import photoRouter from "./routes/photoRoutes.js";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import favoritePhotoRoute from "./routes/favoritesRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";
dotenv.config();

connectDb();

import router from "./routes/photoRoutes.js";

const app = express();

const port = 3000 || process.env.PORT;

//body parser for POST and PUT request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//create API routes
app.use(`/api/photos`, photoRouter);
app.use("/api/users", userRouter);
app.use("/api/favorites", favoritePhotoRoute);

//import error handler
app.use(errorHandler);

//listening to the port and giving user information on what port it is connected to
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
