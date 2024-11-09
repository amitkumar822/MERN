import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";

export const isAuthenticated = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.jwt;

  if (!token) {
    throw new ApiError(401, "User Not Authenticated");
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const user = await User.findById(decodedToken.userId);

  if (!user) {
    throw new ApiError(404, "User Not Found");
  }

  const userDetails = {
    userId: user._id,
    email: user.email,
    role: user.role,
    // name: user.name,
    // avatar: user.avatar,
  }

  req.user = userDetails;
  next();
});
