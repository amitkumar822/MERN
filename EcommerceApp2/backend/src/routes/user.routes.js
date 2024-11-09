import express, { Router } from "express";
import {
  registerUser,
  loginUser,
  getUserDetails,
  logOut,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/userAuth.js";
import { upload } from "../middlewares/multer.js";

const router = Router();

router.post(
  "/register",
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
      // limits: { fileSize: 10 * 1024 * 1024 },
    },
  ]),
  registerUser
);
router.post("/login", loginUser);
router.post("/logout", isAuthenticated, logOut);
router.get("/get-user-details", isAuthenticated, getUserDetails);

export default router;
