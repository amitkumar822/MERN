import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

const app = express();
config({ path: "./config/config.env" });

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

// routes
app.use("/api/v1/message", messageRouter);

export default app;
