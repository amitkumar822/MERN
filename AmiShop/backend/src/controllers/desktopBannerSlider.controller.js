import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
import { deleteFromCloudinary } from "../../utils/deleteFromCloudinary.js";
import mongoose from "mongoose";
import { DeskTopBannerSlider } from "../models/desktopBannerSlider.model.js";

export const desktopBannerUpload = asyncHandler(async (req, res) => {
  // Check if files are provided
  if (!req.file) {
    throw new ApiError(400, "Banner photo must be provided");
  }
  const bannerImg = req.file; // Handle single images
  const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
  // Validate the format of each image
  if (!allowedFormats.includes(bannerImg.mimetype)) {
    throw new ApiError(
      400,
      "Invalid photo format, Only jpeg, png, and webp are allowed"
    );
  }

  const { category } = req.body;

  if (!category) {
    throw new ApiError(400, "Category must be provided");
  }

  // Upload each image to Cloudinary
  const result = await uploadOnCloudinary(bannerImg.path);
  if (result === null) {
    throw new ApiError(500, "Failed to upload banner to Cloudinary");
  }

  // Create a new DeskTopBannerSlider document
  const newDeskTopBannerSlider = new DeskTopBannerSlider({
    bannerImg: {
      public_id: result?.public_id,
      url: result?.secure_url,
    },
    category,
    owner: req.user.userId,
  });

  await newDeskTopBannerSlider.save();
  res
    .status(201)
    .json(
      new ApiResponse(201, "Banner uploaded successfully", newDeskTopBannerSlider)
    );
});

export const getAllDesktopBanners = asyncHandler(async (req, res) => {
  const banners = await DeskTopBannerSlider.find();
  if (banners.length === 0) {
    throw new ApiError(404, "No Banners Found!");
  }
  res.status(200).json(new ApiResponse(200, banners, "Get All Banners"));
});

export const deleteDesktopBanner = asyncHandler(async (req, res) => {
  const { bannerId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(bannerId)) {
    throw new ApiError(404, "Invalid Banner ID!");
  }

  // Find the banner by ID and populate the owner field
  const banner = await DeskTopBannerSlider.findById(bannerId);
  if (!banner) throw new ApiError(404, "Not Found Banner!");

  if (banner?.bannerImg && banner?.bannerImg?.public_id) {
    const result = await deleteFromCloudinary(banner.bannerImg.public_id);

    if (result) throw new ApiError(500, "Failed to delete banner!");
  }

  await DeskTopBannerSlider.findByIdAndDelete(bannerId);

  res.status(200).json(new ApiResponse(200, "", "Banner deleted successfully"));
});

//TODO: Testing owner (populate functionality)
export const getDesktopBannerById = asyncHandler(async (req, res) => {
  const { bannerId } = req.params;

  // Find the banner by ID and populate the owner field
  const banner = await DeskTopBannerSlider.findById(bannerId).populate(
    "owner",
    "name email"
  );

  if (!banner) {
    throw new ApiError(404, "Banner not found");
  }

  // Respond with the banner including the populated owner details
  res
    .status(200)
    .json(new ApiResponse(200, banner, "Banner fetched successfully"));
});
