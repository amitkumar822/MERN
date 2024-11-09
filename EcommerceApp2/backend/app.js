import express from "express";
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
app.use(express.static("public"));

// import router
import userRouter from "./src/routes/user.routes.js";

// difine router
app.use("/api/v1/user", userRouter);

// error middleware
app.use(errorHandler);

// export app
export { app };
