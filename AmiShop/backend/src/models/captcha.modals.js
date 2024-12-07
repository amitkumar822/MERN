import mongoose, { Schema } from "mongoose";

const captchaSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

// Automatically delete expired CAPTCHA codes
captchaSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Captcha = mongoose.model("Captcha", captchaSchema);
