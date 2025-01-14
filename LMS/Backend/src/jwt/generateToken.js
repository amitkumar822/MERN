import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const generateToken = async (user, res) => {
  const userId = user._id;
  const currentRole= user?.role;
  
  const token = jwt.sign({ userId, currentRole }, process.env.JWT_TOKEN_SECRET, {
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
    { new: true}
  );
  return token;
};

export default generateToken;
