import createTokenAndSaveCookie from "../jwt/AuthToken.js";
import { User } from "../models/user.model.js";

// Google Callback
export const googleCallback = async (req, res) => {
  try {
    const user = req.user; // Passport automatically attaches the user to `req`
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    // Generate token and set cookie
    await createTokenAndSaveCookie(user._id, res);

    res.redirect("http://localhost:5173");
  } catch (error) {
    console.error("Error in Google Callback:", error);
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal Server Error",
      errors: [error.message],
    });
  }
};

// Logout
export const logout = (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).send(err);
    res.redirect("/");
  });
};

// Check Current User
export const getCurrentUser = (req, res) => {
  res.send(req.user || null);
};
