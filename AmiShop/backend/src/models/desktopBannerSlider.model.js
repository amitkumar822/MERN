import mongoose, { Schema } from "mongoose";

const desktopBannerSliderSchema = new Schema(
  {
    category: {
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

export const DeskTopBannerSlider = mongoose.model(
  "DeskTopBannerSlider",
  desktopBannerSliderSchema
);
