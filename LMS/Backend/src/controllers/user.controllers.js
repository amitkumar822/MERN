import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { AsyncHandler } from "../../utils/AsyncHandler.js";
import {
  deleteMediaFromCloudinary,
  uploadMedia,
} from "../../utils/cloudinary.js";
import generateToken from "../jwt/generateToken.js";
import { User } from "../models/user.model.js";

export const register = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "Please fill all fields");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "Email already exists");
  }
  console.log(existingUser);

  const user = await User.create({ name, email, password });
  res.status(201).json(new ApiResponse(201, user, "User created successfully"));
});

export const login = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Please fill all fields");
  }

  const user = await User.findOne({ email }).select("+password -token");
  if (!user) {
    throw new ApiError(404, `User not found with this email: ${email}`);
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    throw new ApiError(400, "Invalid credentials");
  }

  const token = await generateToken(user?._id, res);
  user.password = "";

  return res
    .status(200)
    .json(new ApiResponse(200, { user, token }, "User logged in successfully"));
});

export const logout = AsyncHandler(async (req, res) => {
  const { userId } = req.user;
  // Remove token from database
  await User.findByIdAndUpdate(userId, { $set: { token: "" } }, { new: true });

  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "", "User Logged Out Successfully"));
});

export const getUserProfile = AsyncHandler(async (req, res) => {
  const { userId } = req.user;

  if (!userId) throw new ApiError(401, "Unauthorized");

  const user = await User.findById(userId).lean();
  if (!user) throw new ApiError(404, "User not found");

  return res.status(200).json(new ApiResponse(200, user, "User Profile"));
});

export const updateUserProfile = AsyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { name, email } = req.body;
  const avatar = req.file;

  const user = await User.findById(userId).lean();
  if (!user) throw new ApiError(404, "User not found");

  if (user?.avatar?.public_id) {
    await deleteMediaFromCloudinary(user?.avatar?.public_id);
  }

  let cloudinaryResponse = "";
  if (avatar) {
    const result = await uploadMedia(avatar?.path);

    if (result?.error) throw new ApiError(500, result?.error?.message);
    cloudinaryResponse = result;
  }

  const updateData = {
    name,
    email,
  };

  if (cloudinaryResponse) {
    updateData.avatar = {
      public_id: cloudinaryResponse?.public_id,
      url: cloudinaryResponse?.secure_url,
    };
  }

  const newUser = await User.findByIdAndUpdate(
    userId,
    {
      $set: updateData,
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, newUser, "User Profile Updated"));
});
