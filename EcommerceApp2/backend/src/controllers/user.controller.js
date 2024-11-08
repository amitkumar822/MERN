import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "All Fields Must Be Required!");
  }

  const user = await User.findOne({ email });
  if (user) {
    throw new ApiError(400, "User All Ready Register With This Email!");
  }

  const newUser = new User({ name, email, password });
  const savedUser = await newUser.save();

  return res
    .status(201)
    .json(
      new ApiResponse(200, { user: savedUser }, "User Created Successfully")
    );
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // if (!email || !password) {
  //   throw new ApiError(400, "All Fields Must Be Required!");
  // }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User Not Found With This Email!");
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    throw new ApiError(400, "Password Wrong!");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, { user }, "User Login Successfully"));
});
