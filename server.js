require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(
  cors({
    origin: "https://rolexpenel.win", // React app
    credentials: true,
  }),
);
app.use(express.json());
// Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Rolex Panel API is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});
app.use("/api/auth", require("./routes/auth"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
