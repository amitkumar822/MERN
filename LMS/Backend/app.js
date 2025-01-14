import express from "express";
import { config } from "dotenv";
config(".enc");
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./src/middlewares/errorHandler.js";

const app = express();

// middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// import all router
import userRoutes from "./src/routes/user.routes.js";
import courseRoutes from "./src/routes/course.routes.js";

// define router
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/course", courseRoutes);

// error middleware
app.use(errorHandler);

export { app };
