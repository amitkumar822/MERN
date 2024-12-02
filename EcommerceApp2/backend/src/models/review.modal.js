import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema(
  {
    rating: {
      type: Number,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    photo: {
      public_id: String,
      url: String,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Review = mongoose.model("Review", reviewSchema);
