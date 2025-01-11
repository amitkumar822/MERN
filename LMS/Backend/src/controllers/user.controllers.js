import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { AsyncHandler } from "../../utils/AsyncHandler.js";
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
