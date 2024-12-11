import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price must be greater than 0"],
    },
    sellingPrice: {
      type: Number,
      required: true,
      min: [0, "Selling price must be greater than 0"],
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    productImage: [
      {
        public_id: String,
        url: String,
        //   required: true,
      },
    ],
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity must be greater than 1"],
    },
    discountPercentage: {
      type: Number,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    ram: {
      type: String,
      trim: true,
    },
    ssd: {
      type: String,
      trim: true,
    },
    processorType: {
      type: String,
      trim: true,
    },
    processorSpeed: {
      type: String,
      trim: true,
    },
    displaySize: {
      type: String,
      trim: true,
    },
    displayType: {
      type: String,
      trim: true,
    },
    displayResolution: {
      type: String,
      trim: true,
    },
    operatingSystem: {
      type: String,
      trim: true,
    },
    primaryCamera: {
      type: String,
      trim: true,
    },
    secondaryCamera: {
      type: String,
      trim: true,
    },
    batteryCapacity: {
      type: String,
      trim: true,
    },
    inTheBox: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
