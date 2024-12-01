import express from "express";
import passport from "passport";
import {
  googleCallback,
  logout,
  getCurrentUser,
} from "../controllers/google.controller.js";

const router = express.Router();

// Google Login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google Callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  googleCallback
);

// Logout
router.get("/logout", logout);

// Check Current User
router.get("/current-user", getCurrentUser);

export default router;
