import { Review } from "../models/review.modal.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
import mongoose from "mongoose";

export const writeReview = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { rating, review } = req.body;
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

export const getReview = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new ApiError(400, "Invalid ProductId");
  }

  // Find reviews and populate the user details
  const reviews = await Review.find({ productId })
    .populate(
      "userId",
      "name avatar" // Specific user fields to include
    )
    .sort({ createdAt: -1 });

  if (!reviews || reviews.length === 0) {
    throw new ApiError(404, "Reviews Not Found!");
  }

  res.status(200).json(new ApiResponse(200, reviews, "Review Details"));
});

export const likesReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const userId = req?.user?.userId;

  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    throw new ApiError(400, "Invalid ReviewId");
  }

  const review = await Review.findById(reviewId);

  if (!review) {
    throw new ApiError(404, "Review Not Found!");
  }

  // Check if the user already liked the review
  const hasLiked = review.likes?.includes(userId);

  if (hasLiked) {
    // remove like when user already liked the review
    await Review.findByIdAndUpdate(
      reviewId,
      { $pull: { likes: userId } },
      { new: true }
    );

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Like removed successfully"));
  }

  // Add the user's ID to the likes array
  await Review.findByIdAndUpdate(
    reviewId,
    { $push: { likes: userId } },
    { new: true }
  );
  // review.likes = [...review.likes, userId];
  // await review.save();

  res
    .status(200)
    .json(new ApiResponse(200, review, "Successfully liked the review"));
});

export const dislikesReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const userId = req?.user?.userId;

  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    throw new ApiError(400, "Invalid ReviewId");
  }

  const review = await Review.findById(reviewId);

  if (!review) {
    throw new ApiError(404, "Review Not Found!");
  }

  // Check if the user already liked the review
  const hasDisLiked = review.dislikes?.includes(userId);

  if (hasDisLiked) {
    // Remove dislike
    await Review.findByIdAndUpdate(
      reviewId,
      { $pull: { dislikes: userId } },
      { new: true }
    );
    return res
      .status(200)
      .json(new ApiResponse(200, null, "Dislike removed successfully"));
  }

  // Add dislike
  await Review.findByIdAndUpdate(
    reviewId,
    { $addToSet: { dislikes: userId } }, // Ensures no duplicate dislikes
    { new: true }
  );

  res
    .status(200)
    .json(new ApiResponse(200, review, "Successfully liked the review"));
});
