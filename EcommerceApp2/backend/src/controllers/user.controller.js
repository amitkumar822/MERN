import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
import createTokenAndSaveCookie from "../jwt/AuthToken.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary"; // use in user delete controller
import { AddToCart } from "../models/addToCart.modal.js";

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
  res.status(200).json(new ApiResponse(200, user, "User Details"));
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  if (!users) throw new ApiError(404, "No Users Found!");
  res.status(200).json(new ApiResponse(200, users, "Get All Users"));
});

export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    throw new ApiError(404, "Invalid User ID!");

  const updatedUser = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (updatedUser === null) throw new ApiError(404, "User Not Found!");

  res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "User Updated Successfully"));
});

export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    throw new ApiError(404, "Invalid User ID!");

  const user = await User.findById(id);
  if (!user) throw new ApiError(404, "User Not Found!");

  if (user?.avatar && user?.avatar?.public_id) {
    const result = await cloudinary.uploader.destroy(user.avatar.public_id);
    if (result.result !== "ok")
      throw new ApiError(500, "Failed to delete user avatar!");
  } else {
    throw new ApiError(400, "No valid public_id found for user's avatar!");
  }

  const deletedUser = await User.findByIdAndDelete(id);
  if (deletedUser === null) throw new ApiError(404, "User Not Found!");

  res.status(200).json(new ApiResponse(200, "", "User Deleted Successfully"));
});

// TODO: Add To Cart Controller
export const addToCart = asyncHandler(async (req, res) => {
  const { productId } = req?.body;
  const userId = req.user.userId;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new ApiError(400, "Invalid ProductId");
  }

  const isProductAvailable = await AddToCart.findOne({ productId, userId });

  if (isProductAvailable) {
    throw new ApiError(400, "This product is already in your cart.");
  }

  const cart = await AddToCart.create({
    productId,
    userId,
    quantity: 1,
  });

  res
    .status(201)
    .json(new ApiResponse(201, cart, "Product Added To Cart Successfully"));
});

export const countAddToCart = asyncHandler(async (req, res) => {
  const userId = req.user.userId;

  const count = await AddToCart.countDocuments({ userId });

  res.status(200).json(new ApiResponse(200, count, "Total Products In Cart"));
});

export const addToCartViewProduct = asyncHandler(async (req, res) => {
  const userId = req.user.userId;

  const product = await AddToCart.find({ userId }).populate("productId");

  if (!product) {
    throw new ApiError(404, "Product Not Found!");
  }

  res.status(200).json(new ApiResponse(200, product, "Product Details"));
});

export const updateIncreaseDescreaseAddToCartProduct = asyncHandler(
  async (req, res) => {
    const userId = req.user.userId;
    const addToCartProductId = req.body?._id;

    if (!addToCartProductId)
      throw new ApiError(400, "Product Id Must Be Required");

    const qty = req.body?.quantity;

    const updateProduct = await AddToCart.updateOne(
      { _id: addToCartProductId, userId },
      {
        ...(qty && { quantity: qty }),
      }
    );

    res
      .status(200)
      .json(new ApiResponse(200, updateProduct, "Product Update Success"));
  }
);

export const deleteAddToCartProduct = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const addToCartProductId = req.body?._id;

  if (!addToCartProductId)
    throw new ApiError(400, "Product Id Must Be Required");

  const deleteProduct = await AddToCart.deleteOne({
    _id: addToCartProductId,
    userId,
  });

  if (!deleteProduct) throw new ApiError(400, "Product Delete Faild...");

  res.status(200).json(new ApiResponse(200, [], "Product Delete Successfully"));
});
