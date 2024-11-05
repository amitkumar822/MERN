import { User } from "../models/user.model.js";
import ApiErrorHandler from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const isAdminAuthenticated = asyncHandler(async (req, res, next) => {
  const token = req.cookies.adminToken;
  if (!token) {
    return next(new ApiErrorHandler("Admin Not Authenticated!", 400));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);

  if (req.user.role !== "Admin") {
    return next(
      new ApiErrorHandler(
        `This role ${req.user.role} not authorized for this resources`,
        403
      )
    );
  }
  next();
});

export const isPatientAuthenticated = asyncHandler(async (req, res, next) => {
  const token = req.cookies.patientToken;
  if (!token) {
    return next(new ApiErrorHandler("Patient Not Authenticated!", 400));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);

  if (req.user.role !== "Patient") {
    return next(
      new ApiErrorHandler(
        `This role ${req.user.role} not authorized for this resources`,
        403
      )
    );
  }
  next();
});
