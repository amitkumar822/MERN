import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRoutes from "./routes/user_route.js";
import messageRoutes from "./routes/message_routes.js";
import { app, io, server } from "./socketIo/server.js"

dotenv.config();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const PORT = process.env.PORT || 3002;
const URI = process.env.MONGODB_URI;

try {
  mongoose.connect(URI);
  console.log("Connected to MongoDB");
} catch (error) {
  console.log(error);
}

// Routes
app.use("/api/user", userRoutes);
app.use("/api/message", messageRoutes);

server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
