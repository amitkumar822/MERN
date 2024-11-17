import { Router } from "express";
import {
  generateCaptcha,
  getCaptcha,
} from "../controllers/captcha.controller.js";
import { isAuthenticated } from "../middlewares/userAuth.js";

const router = Router();

// Route to handle GET requests to the root URL
router.post("/generate", isAuthenticated, generateCaptcha);
router.get("/getcaptcha", isAuthenticated, getCaptcha);

export default router;
