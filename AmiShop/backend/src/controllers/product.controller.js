import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { Product } from "../models/product.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
import { deleteFromCloudinary } from "../../utils/deleteFromCloudinary.js";
import { AllowedFormatType } from "../../utils/AllowedFormatType.js";

//! ********** Main Screen API **********
// get products by category like "mouse, mobile, laptop...."
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

// Website top category list controller, so products get by category
export const getCategoryByProducts = asyncHandler(async (_, res) => {
  const categoryProducts = await Product.aggregate([
    { $group: { _id: "$category", product: { $first: "$$ROOT" } } }, // Group by category and pick the first product
    { $replaceRoot: { newRoot: "$product" } }, // Replace the root document with the product object
  ]).limit(20);

  if (!categoryProducts || categoryProducts.length === 0) {
    throw new ApiError(404, "No products found in the database!");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, categoryProducts, "Products fetched successfully")
    );
});

// Best Selling Product Controller
export const bestSellingProduct = asyncHandler(async (_, res) => {
  // Fetch 6 random products
  const product = await Product.aggregate([{ $sample: { size: 6 } }]);
  res.status(200).json(new ApiResponse(200, product, "Best Selling Products"));
});

// get brand wise product
export const getBrandWiseProduct = asyncHandler(async (req, res) => {
  const { brand } = req?.params;
  if (!brand) {
    throw new ApiError(400, "Missing required parameters");
  }

  const product = await Product.find({ brand });
  if (!product) {
    throw new ApiError(
      404,
      "No products found in the database for this brand!"
    );
  }
  res.status(200).json(new ApiResponse(200, product, "Brand Wise Products"));
});

//! *********** Admin Product Controller ***********
// upload product
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

  // // Calculate discounted price percentage
  // const calculateDiscountedPercentage = () => {
  //   const discountedPrice = price - sellingPrice;
  //   const discountedPercentage = (discountedPrice / price) * 100;
  //   return discountedPercentage.toFixed(2);
  // };

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
    brand: brand.toLowerCase(),
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

// delete product
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

// get all products
export const getAllProducts = asyncHandler(async (req, res) => {
  // pagination
  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 40;
  let skip = (page - 1) * limit;

  const products = await Product.find().skip(skip).limit(limit).sort({
    createdAt: -1,
  });

  if (products.length === 0) {
    throw new ApiError(404, "No Any Product In Database!");
  }

  res.status(200).json(new ApiResponse(200, products, "Products"));
});

// update product
export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req?.params;
  const { userId } = req?.user;

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
    updatedProduct[key] =
      key === "brand" ? req.body[key].toLowerCase() : req.body[key];
  });

  const calculateDiscountPercentage = () => {
    const discountAmount = updatedProduct.price - updatedProduct.sellingPrice;
    const discountPercentage = (discountAmount / updatedProduct.price) * 100;
    return discountPercentage.toFixed(2);
  };
  updatedProduct.discountPercentage = calculateDiscountPercentage();
  updatedProduct.owner = userId;

  await updatedProduct.save();

  res
    .status(200)
    .json(new ApiResponse(200, updatedProduct, "Product Updated Successfully"));
});

// delete photo on cloudinary
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

//! *********** Secondery Screen or Page Controller ***********

// get product details wise product id
export const getProductDetailsByProductId = asyncHandler(async (req, res) => {
  // get access token from cookies and check which user is logged in
  let accessToken = req.cookies?.accessToken;
  // check user product like or not so get user id
  let userId = "";
  if (accessToken) {
    const decodedToken = jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_SECRET_KEY
    );
    userId = decodedToken?.userId;
  }

  const { productId } = req?.params;

  if (!mongoose.Types.ObjectId.isValid(productId))
    throw new ApiError(400, "Invalid Product Id");

  const product = await Product.findById(productId);
  if (!product) throw new ApiError(404, "Product Not Found!");

  // check if the user has liked the product
  const isLiked = product.likes?.some((lk) => lk.toString() === userId);

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { product, isLiked },
        "Product Details Get Successfully"
      )
    );
});

// search product
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

// filter product by category
export const filterProduct = asyncHandler(async (req, res) => {
  const { category, price, stock, discount } = req.body;

  const filterQuery = {};

  if (category && category.length > 0) {
    // $in operator find same category document like ["mobile", "mouse"]
    filterQuery.category = { $in: category };
  }

  if (price) {
    const [minPrice, maxPrice] = price.split("-").map(Number);
    // The $gte operator is used to find documents where a field’s value is greater than or equal to a specified value.
    // The $lte operator is used to find documents where a field’s value is less than or equal to a specified value.
    filterQuery.sellingPrice = { $gte: minPrice, $lte: maxPrice };
  }

  if (discount) {
    filterQuery.discountPercentage = { $gte: discount };
  }

  if (stock) {
    filterQuery.stock = { $gte: stock };
  }

  const products = await Product.find(filterQuery);

  if (!products || products.length === 0) {
    throw new ApiError(
      404,
      "No products found in the database for these categories!"
    );
  }

  res
    .status(200)
    .json(new ApiResponse(200, products, "Products Filter Successfully"));
});

// like and dislike product
export const likeProduct = asyncHandler(async (req, res) => {
  const { productId } = req?.params;
  const { userId } = req?.user;

  const product = await Product.findById(productId);
  if (!product) throw new ApiError(404, "Product Not Found!");

  const hasLiked = product.likes?.includes(userId);

  if (hasLiked) {
    // remove like when user already liked the product
    await Product.findByIdAndUpdate(
      productId,
      { $pull: { likes: userId } },
      { new: true }
    );

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Like removed successfully"));
  }

  // add like when user not liked the product
  await Product.findByIdAndUpdate(
    productId,
    { $push: { likes: userId } },
    { new: true }
  );

  res
    .status(200)
    .json(new ApiResponse(200, product, "Product Liked Successfully"));
});

// get best selling all product
export const getBestSellingAllProduct = asyncHandler(async (req, res) => {
  // pagination
  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 40;
  let skip = (page - 1) * limit;

  const product = await Product.find().skip(skip).limit(limit).sort({
    createdAt: -1,
  });

  if (product.length === 0) {
    throw new ApiError(404, "No Any Product In Database!");
  }

  res.status(200).json(new ApiResponse(200, product, "Products"));
});

//! Testing purposes only
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
