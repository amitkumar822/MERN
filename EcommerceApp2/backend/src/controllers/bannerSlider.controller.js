import mongoose from "mongoose";
import { BannerSlider } from "../models/bannerSlider.modal.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
import { deleteFromCloudinary } from "../../utils/deleteFromCloudinary.js";

export const bannerUpload = asyncHandler(async (req, res) => {
  // Check if files are provided
  if (!req.files || Object.keys(req.files).length === 0) {
    throw new ApiError(400, "Banner photos must be provided");
  }
  const bannerImages = req.files.bannerImg; // Handle multiple images
  const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
  // Validate the format of each image
  for (const image of bannerImages) {
    if (!allowedFormats.includes(image.mimetype)) {
      throw new ApiError(
        400,
        "Invalid photo format, Only jpeg, png, and webp are allowed"
      );
    }
  }

  const { category } = req.body;
  if (!category) {
    throw new ApiError(400, "Category must be provided");
  }

  // Upload each image to Cloudinary
  const newImages = [];
  for (const image of bannerImages) {
    const uploadResult = await uploadOnCloudinary(image.path);
    if (uploadResult) {
      console.log("Uploading image ", uploadResult);
      newImages.push({
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url,
      });
    }
  }
  // Create a new bannerSlider document
  const newBannerSlider = new BannerSlider({
    bannerImg: newImages,
    category,
  });

  await newBannerSlider.save();
  res
    .status(201)
    .json(
      new ApiResponse(201, "Banner uploaded successfully", newBannerSlider)
    );
});

export const getAllBanners = asyncHandler(async (req, res) => {
  const banners = await BannerSlider.find();
  if (banners.length === 0) {
    throw new ApiError(404, "No Banners Found!");
  }
  res.status(200).json(new ApiResponse(200, banners, "Get All Banners"));
});
