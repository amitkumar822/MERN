import jwt from "jsonwebtoken";

export const googleCallback = async (req, res) => {
  try {
    const user = req.user; // Passport attaches the user to req
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    // Generate access and refresh tokens
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_ACCESS_SECRET_KEY,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_REFRESH_SECRET_KEY,
      { expiresIn: "7d" }
    );

    // Optionally store refresh token in DB
    user.token = refreshToken;
    await user.save();

    // Set cookies and redirect to frontend
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

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

// Check Current User
export const getCurrentUser = (req, res) => {
  res.send(req.user || null);
};
