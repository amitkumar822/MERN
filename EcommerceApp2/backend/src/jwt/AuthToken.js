import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const createTokenAndSaveCookie = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  await User.findByIdAndUpdate(userId, token);
  return token;
};

export default createTokenAndSaveCookie;
