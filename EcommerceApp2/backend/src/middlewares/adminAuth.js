import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const isAdminAuth = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.jwt;
  if (!token) {
    throw new ApiError(401, "User Not Authenticated");
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const user = await User.findById(decoded.userId);
  if (user?.role !== "ADMIN") {
    throw new ApiError(403, "Unauthorized Access");
  }
  next();
});
