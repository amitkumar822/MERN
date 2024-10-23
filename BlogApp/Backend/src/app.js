import express from "express";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express();

// middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(cookieParser());

//routes import
import userRoutes from "../src/routes/user.routes.js";
import blogRoutes from "../src/routes/blog.routes.js";

//routes declaration
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/blogs", blogRoutes);

export { app };
