import { Router } from "express";
import {
  getUserProfile,
  login,
  logout,
  register,
} from "../controllers/user.controllers.js";
import { isAuthenticated } from "../middlewares/authUser.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/profile", isAuthenticated, getUserProfile);

export default router;
