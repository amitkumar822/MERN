import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { ApiError } from "./utils/ApiError.js";
import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [process.env.FRONTEND_URI || process.env.DASHBOARD_URI],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// import routes
import messageRouter from "./routes/message.routes.js";
import userRouter from "./routes/user.routes.js";

// routes
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);

// Error handling middleware
app.use(ApiError);
export default app;
