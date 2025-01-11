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
  });

  await User.findByIdAndUpdate(
    userId,
    { token },
    { new: true }
  );
  return token;
};

export default generateToken;
