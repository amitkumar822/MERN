import express from "express";
import passport from "passport";
import {
  googleCallback,
  getCurrentUser,
} from "../controllers/google.controller.js";

const router = express.Router();

// Google Login
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    // prompt: "select_account", // Forces Google to show the account selection screen
  })
);

// Google Callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  googleCallback
);

// Check Current User
router.get("/current-user", getCurrentUser);

export default router;
