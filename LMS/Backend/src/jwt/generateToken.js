import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const generateToken = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_TOKEN_SECRET, {
    expiresIn: process.env.JWT_TOKEN_EXPIRY,
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days expiry time
  });

  await User.findByIdAndUpdate(
    userId,
    { token },
  );
  return token;
};

export default generateToken;
