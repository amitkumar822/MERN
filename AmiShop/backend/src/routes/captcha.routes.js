import { Router } from "express";
import {
  generateCaptcha,
  getCaptcha,
} from "../controllers/captcha.controller.js";

const router = Router();

// Route to handle GET requests to the root URL
router.post("/generate", generateCaptcha);
router.get("/getcaptcha", getCaptcha);

export default router;
