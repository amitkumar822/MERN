import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const createTokensAndSaveCookies = async (userId, res) => {
  // Generate Access Token
  const accessToken = jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET_KEY, {
    expiresIn: "15m", // Short lifespan
  });

  // Generate Refresh Token
  const refreshToken = jwt.sign(
    { userId },
    process.env.JWT_REFRESH_SECRET_KEY,
    {
      expiresIn: "7d", // Long lifespan
    }
  );

  // Set cookies
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

  // Optionally save refreshToken in DB (if you want server-side verification)
  await User.findByIdAndUpdate(userId, { refreshToken });

  return { accessToken, refreshToken };
};

export default createTokensAndSaveCookies;

// import { User } from "../models/user.model.js";
// import jwt from "jsonwebtoken";

// const createTokenAndSaveCookie = async (userId, res) => {
//   const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
//     expiresIn: process.env.JWT_EXPIRES,
//   });

//   res.cookie("jwt", token, {
//     httpOnly: true,
//     secure: true,
//     sameSite: "strict",
//   });

//   await User.findByIdAndUpdate(userId, token);
//   return token;
// };

// export default createTokenAndSaveCookie;
