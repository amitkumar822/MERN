import mongoose from "mongoose";
import { Product } from "../models/product.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
import { deleteFromCloudinary } from "../../utils/deleteFromCloudinary.js";

export const uploadProduct = asyncHandler(async (req, res) => {
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
    if (cloudinaryResponse === null)
      throw new ApiError(400, "Faild To Upload Product Images");
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

export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(404, "Invalid Product ID!");
  }

  const product = await Product.findById(id);
  if (!product) throw new ApiError(404, "Product Not Found!");

  // Delete each image from Cloudinary using its public_id
  for (const image of product.productImage) {
    if (image.public_id) {
      await deleteFromCloudinary(image.public_id);
    }
  }

  // Remove the product from the database
  await Product.findByIdAndDelete(id);
  res
    .status(200)
    .json(new ApiResponse(200, null, "Product Deleted Successfully"));
});

export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();

  if (products.length === 0)
    throw new ApiError(404, "No Any Product In Database!");
  res.status(200).json(new ApiResponse(200, products, "Products"));
});
