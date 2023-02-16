import express from "express";
import router from "./routes/photoRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const port = 3000 || process.env.PORT;

app.use(`/api/photos`, router);

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
