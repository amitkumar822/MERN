import jwt from "jsonwebtoken";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { User } from "../models/user.model.js";

export const isAdminAuth = asyncHandler(async (req, res, next) => {
  let accessToken = req.cookies?.accessToken;
  const refreshToken = req.cookies?.refreshToken;

  if (!accessToken && !refreshToken) {
    throw new ApiError(401, "User Not Authenticated");
  }

  try {
    // Verify the access token
    const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET_KEY);
    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    if (user.role !== "ADMIN") {
      throw new ApiError(403, "Unauthorized Access");
    }

    next();
  } catch (err) {
    // If access token is invalid or expired, check refresh token
    if (err.name === "TokenExpiredError" || err.name === "JsonWebTokenError") {
      if (!refreshToken) {
        throw new ApiError(401, "Authentication required");
      }

      try {
        const decodedRefresh = jwt.verify(
          refreshToken,
          process.env.JWT_REFRESH_SECRET_KEY
        );
        const user = await User.findById(decodedRefresh.userId);

        if (!user) {
          throw new ApiError(404, "User not found");
        }

        if (user.role !== "ADMIN") {
          throw new ApiError(403, "Unauthorized Access");
        }

        // Issue a new access token
        accessToken = jwt.sign(
          { userId: user._id },
          process.env.JWT_ACCESS_SECRET_KEY,
          {
            expiresIn: "15m",
          }
        );

        // Set the new access token in the cookies
        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 15 * 60 * 1000, // 15 minutes
        });

        next();
      } catch (refreshErr) {
        throw new ApiError(401, "Session expired. Please log in again");
      }
    } else {
      throw new ApiError(401, "Invalid token. Please log in again");
    }
  }
});

// import { asyncHandler } from "../../utils/asyncHandler.js";
// import { ApiError } from "../../utils/ApiError.js";
// import jwt from "jsonwebtoken";
// import { User } from "../models/user.model.js";

// export const isAdminAuth = asyncHandler(async (req, res, next) => {
//   const token = req.cookies?.jwt;
//   if (!token) {
//     throw new ApiError(401, "User Not Authenticated");
//   }
//   const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

//   const user = await User.findById(decoded.userId);
//   if (user?.role !== "ADMIN") {
//     throw new ApiError(403, "Unauthorized Access");
//   }
//   next();
// });
