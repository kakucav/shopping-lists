import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("running...");
});

app.listen(5000, () => {
  console.log("Application is running on port 5000...");
});
