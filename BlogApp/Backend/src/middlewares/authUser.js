import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

// authenticate the user
export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    const user = await User.findById(decodedToken.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "user is not authenticated" });
  }
};

export const isAdmin = (...roles) => {
  try {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res
          .status(401)
          .json({
            error: `User with given role ${req.user.role} does not exist`,
          });
      }
      next();
    };
  } catch (error) {
    return res.status(401).json({ error: "Invalid role" });
  }
};
