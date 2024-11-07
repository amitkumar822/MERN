import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// middleware
app.use(
  cors({
    origin: false,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(express.static("public"));

// import router
import userRouter from "./src/routes/user.routes.js"

// difine router
app.use("/api/v1/user", userRouter);

// export app

export { app };
