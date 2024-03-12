import dotenv from "dotenv";
dotenv.config();
import express from "express";

import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes.js";
import mongoose from "mongoose";
// this is how to connect to the express server
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/v1/users", userRoutes);

const PORT = process.env.PORT;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.listen(PORT, () => console.log(`serving running on port ${PORT}`));
