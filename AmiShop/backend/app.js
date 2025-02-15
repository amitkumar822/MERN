import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./src/middlewares/errorHandler.js";

//google login import
import session from "express-session";
import passport from "passport";
import "./src/config/passport.js";

const app = express();

// middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
// body parser middleware
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(cookieParser());
app.use(express.static("public"));

// this middleware for google login
app.use(
  session({
    secret: process.env.GOOGLE_CLIENT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// import router
import userRouter from "./src/routes/user.routes.js";
import productRouter from "./src/routes/product.routes.js";
import bannerSliderRouter from "./src/routes/bannerSlider.controller.routes.js";
import desktopBannerSliderRouter from "./src/routes/desktopBannerSlider.routes.js";
import orderRoutes from "./src/routes/order.routes.js";
import googleRoutes from "./src/routes/google.routes.js";
import reviewRoutes from "./src/routes/review.routes.js";

// define router
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/banner-slider", bannerSliderRouter);
app.use("/api/v1/desktop-banner-slider", desktopBannerSliderRouter);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/auth", googleRoutes); // integrate with google login routes
app.use("/api/v1/review", reviewRoutes);

// define captcha router
import captchaRouter from "./src/routes/captcha.routes.js";
app.use("/api/v1/captcha", captchaRouter);

// define sale router
import saleRouter from "./src/routes/sale.routes.js";
app.use("/api/v1/sale", saleRouter);

// error middleware
app.use(errorHandler);

// export app
export { app };
