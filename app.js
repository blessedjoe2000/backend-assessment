import express from "express";
import router from "./routes/photoRoutes.js";

const app = express();

const port = 3000;

app.use("/api/photos", router);

app.listen(port || process.env.PORT, () => {
  console.log(`Listening to port ${port}`);
});
