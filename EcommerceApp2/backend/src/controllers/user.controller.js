import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
import createTokenAndSaveCookie from "../jwt/AuthToken.js";
import { User } from "../models/user.model.js";

// Register User Endpoint
export const registerUser = asyncHandler(async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    throw new ApiError(400, "User photo must be required!");
  }

  const avatar = req.files?.avatar[0];

  const allowedFormats = ["image/jpeg", "image/png", "image/webp"];

  if (!allowedFormats.includes(avatar.mimetype)) {
    throw new ApiError(
      400,
      "Invalid avatar format, Only jpeg, png and webp are allowed!"
    );
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "All Fields Must Be Required!");
  }

  const user = await User.findOne({ email });
  if (user) {
    throw new ApiError(400, "User All Ready Register With This Email!");
  }
  // console.log("Avatar", avatar)
  const cloudinarResponse = await uploadOnCloudinary(avatar?.path);
  if (cloudinarResponse === null) {
    throw new ApiError(400, "Failed to upload avatar!");
  }

  const newUser = new User({
    name,
    email,
    password,
    role: "GENERAL",
    avatar: {
      public_id: cloudinarResponse.public_id,
      url: cloudinarResponse.url,
    },
  });

  const savedUser = await newUser.save();
  // password remove in response
  savedUser.password = "";

  // generate token and save
  const token = await createTokenAndSaveCookie(savedUser._id, res);

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        { user: savedUser, token },
        "User Created Successfully"
      )
    );
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "All Fields Must Be Required!");
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new ApiError(404, "User Not Found With This Email!");
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    throw new ApiError(400, "Password Wrong!");
  }

  // password remove in response
  user.password = "";

  // generate token and save
  const token = await createTokenAndSaveCookie(user._id, res);

  return res
    .status(201)
    .json(new ApiResponse(200, { user, token }, "User Login Successfully"));
});

export const logOut = asyncHandler(async (req, res) => {
  await res.clearCookie("jwt");
  return res
    .status(200)
    .json(new ApiResponse(200, "User Logged Out Successfully"));
});

export const getUserDetails = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User Not Found!");
  res.status(200).json({ success: true, user });
});
