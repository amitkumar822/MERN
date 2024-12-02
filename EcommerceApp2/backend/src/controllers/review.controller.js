import { Review } from "../models/review.modal.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
import mongoose from "mongoose";

export const writeReview = asyncHandler(async (req, res) => {
  const { productId, rating, review } = req.body;
  const userId = req?.user?.userId;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new ApiError(400, "Invalid ProductId");
  }

  if (!rating || rating < 1 || rating > 5) {
    throw new ApiError(400, "Rating should be between 1 and 5");
  }

  if (!review) {
    throw new ApiError(400, "Review should not be empty");
  }

  const reviews = await Review.create({ userId, productId, rating, review });

  res
    .status(201)
    .json(new ApiResponse(201, reviews, "Successfull Write Review."));
});

// export const getReview = asyncHandler(async (req, res) => {
//   const { productId } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(productId)) {
//     throw new ApiError(400, "Invalid ProductId");
//   }

//   const review = await Review.find({ productId });

//   if (!review) {
//     throw new ApiError(404, "Review Not Found!");
//   }

//   res.status(200).json(new ApiResponse(200, review, "Review Details"));
// });

export const getReview = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new ApiError(400, "Invalid ProductId");
  }

  // Find reviews and populate the user details
  const reviews = await Review.find({ productId })
    .populate(
      "userId", // Field to populate
      "name avatar" // Specific user fields to include
    )
    .sort({ createdAt: -1 });

  if (!reviews || reviews.length === 0) {
    throw new ApiError(404, "Reviews Not Found!");
  }

  res.status(200).json(new ApiResponse(200, reviews, "Review Details"));
});
