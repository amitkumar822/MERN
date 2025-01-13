import jwt from "jsonwebtoken";
import { config } from "dotenv";
config(".enc");

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "You are not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET, {
      maxAge: 0,
    });
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = {
      userId: decoded.userId,
    };
    next();
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export { isAuthenticated };
