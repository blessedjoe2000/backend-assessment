import express from "express";

const app = express();

const port = 3000;

app.use("/", (req, res) => {
  res.status(200).json({ message: "welcome to the Unsplash API" });
});

app.listen(port || process.env.PORT, () => {
  console.log(`Listening to port ${port}`);
});
