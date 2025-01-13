import { Router } from "express";
import {
  getUserProfile,
  login,
  logout,
  register,
  updateUserProfile,
} from "../controllers/user.controllers.js";
import { isAuthenticated } from "../middlewares/authUser.js";
import upload from "../../utils/multer.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/profile", isAuthenticated, getUserProfile);
router.put("/update-profile", isAuthenticated, upload.single("avatar"), updateUserProfile);

export default router;
