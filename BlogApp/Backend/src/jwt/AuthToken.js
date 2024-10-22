import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const createTokenAndSaveCookie = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_TOKEN_SECRET, {
    expiresIn: process.env.JWT_TOKEN_EXPIRY,
  });
  
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  })

  await User.findByIdAndUpdate(userId, {token});
  return token;
};

export default createTokenAndSaveCookie
