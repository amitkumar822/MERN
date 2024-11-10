import mongoose from "mongoose";
import { Product } from "../models/product.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
import { v2 as cloudinary } from "cloudinary"; // use in user delete controller
import { deleteFromCloudinary } from "../../utils/deleteFromCloudinary.js";

export const uploadProduct = asyncHandler(async (req, res) => {
  console.log("ReqBody: ", req.files);

  // Check if files are provided
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ message: "Product photos must be provided" });
  }

  const productImages = req.files.productImage; // Handle multiple images
  const allowedFormats = ["image/jpeg", "image/png", "image/webp"];

  // Validate each file
  for (const image of productImages) {
    if (!allowedFormats.includes(image.mimetype)) {
      return res.status(400).json({
        message: "Invalid photo format, Only jpeg, png, and webp are allowed",
      });
    }
  }

  const {
    productName,
    description,
    price,
    sellingPrice,
    brand,
    category,
    quantity,
  } = req.body;

  if (
    !productName ||
    !description ||
    !price ||
    !sellingPrice ||
    !brand ||
    !category ||
    !quantity
  ) {
    throw new ApiError(400, "All Fields Must Be Required!");
  }

  // Upload images to Cloudinary and collect responses
  const uploadedImages = [];
  for (const image of productImages) {
    const cloudinaryResponse = await uploadOnCloudinary(image.path);
    uploadedImages.push({
      public_id: cloudinaryResponse?.public_id,
      url: cloudinaryResponse?.secure_url,
    });
  }

  // Create the product with all uploaded images
  const product = await Product.create({
    productName,
    description,
    price,
    sellingPrice,
    brand,
    category,
    quantity,
    productImage: uploadedImages, // Save array of uploaded images
  });

  if (!product) throw new ApiError(400, "Failed To Upload Product");

  res
    .status(201)
    .json(new ApiResponse(201, product, "Product Created Successfully"));
});
