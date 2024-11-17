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
import productRouter from "./src/routes/product.routes.js";
import bannerSliderRouter from "./src/routes/bannerSlider.controller.routes.js";

// difine router
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/banner-slider", bannerSliderRouter);

// difine captch router

import captchaRouter from "./src/routes/captcha.routes.js";
app.use("/api/v1/captcha", captchaRouter);

// error middleware
app.use(errorHandler);

// export app
export { app };
