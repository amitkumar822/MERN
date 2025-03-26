import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const createTokensAndSaveCookies = async (userId, res) => {
  // Generate Access Token
  const accessToken = jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET_KEY, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES, // Short lifespan
  });

  // Generate Refresh Token
  const refreshToken = jwt.sign(
    { userId },
    process.env.JWT_REFRESH_SECRET_KEY,
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRES,
    }
  );

  // Set cookies
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 24 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
  });

  await User.findByIdAndUpdate(userId, { refreshToken });

  return { accessToken, refreshToken };
};

export default createTokensAndSaveCookies;
