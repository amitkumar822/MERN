import createTokenAndSaveCookie from "../jwt/AuthToken.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
  try {
    // if (!req.files || Object.keys(req.files).length === 0) {
    //   return res.status(400).json({ message: "User photo must be required" });
    // }

    // const { photo } = req.files;

    // const allowedFormates = ["image/jpeg", "image/png", "image/webp"];

    // if (!allowedFormates.includes(photo.mimetype)) {
    //   return res.status(400).json({
    //     message: "Invalid photo format, Only jpeg, png and webp are allowed",
    //   });
    // }

    const { email, password, name, phone, education, role } = req.body;

    if (
      [email, password, name, phone, education, role].some(
        (field) => field?.trim() === ""
      )
    ) {
      return res.status(400).json({ message: "All fields must be required" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "User already exists with the same email",
      });
    }

    // upload photo on cloudinary server
    // const cloudinaryResponse = await uploadOnCloudinary(photo.tempFilePath);

    // hash password
    const isPasswordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: isPasswordHash,
      name,
      phone,
      education,
      role,
      // photo: {
      //   public_id: cloudinaryResponse?.public_id,
      //   url: cloudinaryResponse?.url,
      // },
    });
    await newUser.save();

    if (newUser) {
      // token generate and save in cookie
      const token = await createTokenAndSaveCookie(newUser._id, res);
      res
        .status(201)
        .json({ message: "User registered successfully", newUser, token: token });
    }
  } catch (error) {
    console.log("User register Error: ", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if ([email, password].some((field) => field?.trim() === "")) {
      return res.status(400).json({ message: "All fields must be required" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user.password) {
      return res.status(400).json({ message: "User password is missing" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!user || !isPasswordMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    //check user role
    if (user.role !== role) {
      return res.status(400).json({ message: `Given role ${role} not found` });
    }

    // token generate and save in cookie
    const token = await createTokenAndSaveCookie(user._id, res);

    res.status(201).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        // photo: user.photo,
      },
      token: token,
    });
  } catch (error) {
    console.log("log error: " + error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(201).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log("logout error: " + error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
