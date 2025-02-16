import mongoose, { Schema } from "mongoose";

const topBrandSchema = new Schema(
  {
    brandName: {
      type: String,
      required: true,
    },
    bannerImg: {
      public_id: String,
      url: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const TopBrand = mongoose.model("TopBrand", topBrandSchema);
