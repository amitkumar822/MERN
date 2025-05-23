import mongoose from "mongoose";
import { Review } from "../models/review.modal.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
import { deleteFromCloudinary } from "../../utils/deleteFromCloudinary.js";
import { AllowedFormatType } from "../../utils/AllowedFormatType.js";

export const writeReview = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { rating, review } = req.body;
  const userId = req?.user?.userId;
  const photo = req?.file;

  if (photo && !AllowedFormatType.includes(photo.mimetype)) {
    throw new ApiError(
      400,
      "Invalid photo format, Only jpeg, png, and webp are allowed"
    );
  }

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new ApiError(400, "Invalid ProductId");
  }

  if (!rating || rating < 1 || rating > 5) {
    throw new ApiError(400, "Rating should be between 1 and 5");
  }

  if (!review) {
    throw new ApiError(400, "Review should not be empty");
  }

  // Check if user already write review for the product
  const checkUserAlreadyWriteReview = await Review.find({
    userId,
    productId,
  });

  if (checkUserAlreadyWriteReview.length > 0) {
    throw new ApiError(
      400,
      "You have already written a review for this product"
    );
  }

  let photoData = null;

  if (photo?.path) {
    // upload photo on cloudinary
    const cloudinaryResponse = await uploadOnCloudinary(photo?.path);
    if (cloudinaryResponse === null) {
      throw new ApiError(400, "Failed to upload photo!");
    }

    photoData = {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    };
    console.log(cloudinaryResponse);
  }

  const reviews = await Review.create({
    userId,
    productId,
    rating,
    review,
    photo: photoData,
  });

  res
    .status(201)
    .json(new ApiResponse(201, reviews, "Successfull Write Review."));
});

export const getAllReview = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new ApiError(400, "Invalid ProductId");
  }

  const reviews = await Review.find({ productId })
    .populate("userId", "name avatar")
    .sort({likes: -1 ,rating: -1, createdAt: -1 });

  if (!reviews || reviews.length === 0) {
    throw new ApiError(404, "Reviews Not Found!");
  }

  // Calculate total ratings and average
  const ratingStats = {
    totalRatings: 0,
    ratingCounts: {}, // Example: { 1: 4, 2: 3, 3: 10, 4: 5, 5: 25 }
    averageRating: 0,
    totalUsers: reviews.length,
  };

  reviews.forEach((review) => {
    const { rating } = review;

    // Count each rating
    ratingStats.ratingCounts[rating] =
      (ratingStats.ratingCounts[rating] || 0) + 1;

    // Sum all ratings
    ratingStats.totalRatings += rating;
  });

  // Calculate the average rating
  ratingStats.averageRating = (
    ratingStats.totalRatings / ratingStats.totalUsers
  ).toFixed(1);

  // Format response
  const response = {
    reviews,
    stats: {
      averageRating: ratingStats.averageRating,
      totalUsers: ratingStats.totalUsers,
      ratingCounts: ratingStats.ratingCounts,
    },
  };

  res.status(200).json(new ApiResponse(200, response, "Review Details"));
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

export const UpdateOrEditReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const userId = req?.user?.userId;
  const { rating, review } = req.body;
  const photo = req.file;

  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    throw new ApiError(400, "Invalid ReviewId");
  }

  const verifyReview = await Review.findOne({ _id: reviewId, userId });
  if (!verifyReview) {
    throw new ApiError(404, "Not Found Review");
  }

  if (photo && AllowedFormatType.includes(photo.mimetype)) {
    if (verifyReview.photo?.public_id) {
      await deleteFromCloudinary(verifyReview.photo?.public_id);
    }

    // Upload photo on cloudinary
    const cloudinaryResponse = await uploadOnCloudinary(photo.path);
    if (cloudinaryResponse === null) {
      throw new ApiError(400, "Failed to upload photo!");
    }
    verifyReview.photo = {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    };
    await verifyReview.save();
  }

  const editReview = await Review.findOneAndUpdate(
    { _id: reviewId, userId },
    {
      rating,
      review,
    },
    { new: true }
  );

  res
    .status(200)
    .json(new ApiResponse(200, editReview, "Successfully Update review"));
});

export const getSingleReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    throw new ApiError(400, "Invalid ReviewId");
  }
  const review = await Review.findById(reviewId).populate(
    "userId",
    "name avatar"
  );

  // Check if review exists
  if (!review) {
    throw new ApiError(404, "Review Not Found!");
  }

  res.status(200).json(new ApiResponse(200, review, "Review Details"));
});

export const deleteReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const userId = req?.user?.userId;

  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    throw new ApiError(400, "Invalid ReviewId");
  }

  const review = await Review.findOne({ _id: reviewId, userId });
  if (!review) {
    throw new ApiError(404, "Review Not Found!");
  }

  // Delete the photo from cloudinary before deleting the review
  const reviewPhoto = review.photo;
  if (reviewPhoto.public_id) {
    const deleteReviewPhoto = await deleteFromCloudinary(
      reviewPhoto?.public_id
    );
    if (!deleteReviewPhoto) {
      throw new ApiError(500, "Failed to delete review photo from cloudinary");
    }
  }
  await Review.findByIdAndDelete(reviewId);

  res
    .status(200)
    .json(new ApiResponse(200, null, "Review deleted successfully"));
});
