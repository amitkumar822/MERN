import mongoose from "mongoose";
import { Product } from "../models/product.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
import { deleteFromCloudinary } from "../../utils/deleteFromCloudinary.js";
import { AllowedFormatType } from "../../utils/AllowedFormatType.js";

export const uploadProduct = asyncHandler(async (req, res) => {
  // Check if files are provided
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ message: "Product photos must be provided" });
  }

  const productImages = req.files.productImage; // Handle multiple images

  // Validate each file
  for (const image of productImages) {
    if (!AllowedFormatType.includes(image.mimetype)) {
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
    ram,
    ssd,
    processorType,
    processorSpeed,
    displaySize,
    displayType,
    displayResolution,
    operatingSystem,
    primaryCamera,
    secondaryCamera,
    batteryCapacity,
    inTheBox,
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

  // Calculate discounted price percentage
  const calculateDiscountedPercentage = () => {
    const discountedPrice = price - sellingPrice;
    const discountedPercentage = (discountedPrice / price) * 100;
    return discountedPercentage.toFixed(2);
  };

  // Calculate discounted price percentage
  const discountPercentage = (((price - sellingPrice) / price) * 100).toFixed(
    2
  );

  // Create the product with all uploaded images
  const product = await Product.create({
    productName,
    description,
    price,
    sellingPrice,
    brand,
    category,
    quantity,
    discountPercentage,
    owner: req.user.userId,
    productImage: uploadedImages, // Save array of uploaded images
    ram,
    ssd,
    processorType,
    processorSpeed,
    displaySize,
    displayType,
    displayResolution,
    operatingSystem,
    primaryCamera,
    secondaryCamera,
    batteryCapacity,
    inTheBox,
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

export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(404, "Invalid Product ID!");
  }

  // Check if new product images are provided
  let newImages = [];
  if (req.files && req.files.productImage) {
    for (let file of req.files.productImage) {
      // Check the mimetype for valid image formats
      if (!AllowedFormatType.includes(file.mimetype)) {
        throw new ApiError(
          400,
          `Invalid file format for ${file.originalname}. Only JPEG, PNG, and WEBP are allowed.`
        );
      }

      // Upload the file if the type is valid
      const uploadResult = await uploadOnCloudinary(file.path);
      if (uploadResult) {
        newImages.push({
          public_id: uploadResult.public_id,
          url: uploadResult.secure_url,
        });
      }
    }
  }

  // Find the product and update it
  const updatedProduct = await Product.findById(id);
  if (!updatedProduct) throw new ApiError(404, "Failed to Find Product!");

  // Append new images without removing old ones
  if (newImages.length > 0) {
    updatedProduct.productImage.push(...newImages);
  }

  // Update other product fields if provided in req.body
  Object.keys(req.body).forEach((key) => {
    updatedProduct[key] = req.body[key];
  });

  const calculateDiscountPercentage = () => {
    const discountAmount = updatedProduct.price - updatedProduct.sellingPrice;
    const discountPercentage = (discountAmount / updatedProduct.price) * 100;
    return discountPercentage.toFixed(2);
  };
  updatedProduct.discountPercentage = calculateDiscountPercentage();

  await updatedProduct.save();

  res
    .status(200)
    .json(new ApiResponse(200, updatedProduct, "Product Updated Successfully"));
});

export const deletePhotoOnCloudinary = asyncHandler(async (req, res) => {
  const { publicId, productId } = req.params;

  if (!publicId && !productId) {
    throw new ApiError(400, "Missing required parameters");
  }

  // 1. Delete image from Cloudinary
  const response = await deleteFromCloudinary(publicId);
  if (response !== true)
    throw new ApiError(400, "Failed to delete image from Cloudinary");

  // 2. Update the MongoDB document to remove the image with matching public_id
  const product = await Product.findByIdAndUpdate(
    productId,
    { $pull: { productImage: { public_id: publicId } } }, // Remove image with matching public_id
    { new: true }
  );

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        product,
        "Image deleted and product updated successfully"
      )
    );
});

//! Website top category list controller, so products get by category
export const getCategoryByProducts = asyncHandler(async (req, res) => {
  const categoryProducts = await Product.distinct("category");

  if (categoryProducts.length === 0) {
    throw new ApiError(404, "No products found in the database!");
  }

  // array to store one product from each category
  const productByCategory = [];
  for (const category of categoryProducts) {
    const product = await Product.findOne({ category });
    if (product) productByCategory.push(product);
  }
  res.status(200).json(new ApiResponse(200, productByCategory, "Products"));
});

export const getCategoryNameWiseProducts = asyncHandler(async (req, res) => {
  const { category } = req?.body || req?.query;

  if (!category) {
    throw new ApiError(400, "Missing required parameters");
  }
  const product = await Product.find({ category });
  if (!product) {
    throw new ApiError(
      404,
      "No products found in the database for this category!"
    );
  }
  res.status(200).json(new ApiResponse(200, product, "Products"));
});

export const getProductDetails = asyncHandler(async (req, res) => {
  const { productId } = req?.params;

  if (!mongoose.Types.ObjectId.isValid(productId))
    throw new ApiError(400, "Invalid Product Id");

  const product = await Product.findById(productId);
  if (!product) throw new ApiError(404, "Product Not Found!");

  res
    .status(200)
    .json(new ApiResponse(200, product, "Product Details Get Successfully"));
});

export const searchProduct = asyncHandler(async (req, res) => {
  const query = req?.query?.q;

  const regex = new RegExp(query, "i", "g");

  const product = await Product.find({
    $or: [{ productName: regex }, { category: regex }],
  });

  // if (!product) throw new ApiError(404, "No products found matching your search query!");
  res
    .status(200)
    .json(new ApiResponse(200, product, "Products Search Successfully"));
});

export const filterProduct = asyncHandler(async (req, res) => {
  const categoryList = req?.body?.category || [];

  // console.log("Filter Product: " + categoryList);

  // if (categoryList.length === undefined || category.length === 0) {
  //   throw new ApiError(400, "Missing Required Parameters");
  // }

  const product = await Product.find({
    category: {
      $in: categoryList,
    },
  });

  if (!product) {
    throw new ApiError(
      404,
      "No products found in the database for these categories!"
    );
  }

  res
    .status(200)
    .json(new ApiResponse(200, product, "Products Filter Successfully"));
});

// Testing purposes only
export const deleteOnlyCloudinaryImage = asyncHandler(async (req, res) => {
  const { publicId } = req.params;
  if (!publicId) {
    throw new ApiError(400, "Missing required parameters");
  }
  // 1. Delete image from Cloudinary
  const response = await deleteFromCloudinary(publicId);
  if (response !== true)
    throw new ApiError(400, "Failed to delete image from Cloudinary");

  res
    .status(200)
    .json(new ApiResponse(200, null, "Image deleted successfully"));
});
