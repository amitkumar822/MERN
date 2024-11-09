import express, { Router } from "express";
import {
  registerUser,
  loginUser,
  getUserDetails,
  logOut,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/userAuth.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", isAuthenticated, logOut);
router.get("/get-user-details", isAuthenticated, getUserDetails);

export default router;
