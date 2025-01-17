import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema(
  {
    lectureTitle: {
      type: String,
      required: true,
      trim: true,
    },
    videoUrl: {
      public_id: String,
      url: String,
    },
    // publicId: { type: String },
    isPreviewFree: { 
        type: Boolean,
        default: false, 
    },
  },
  { timestamps: true }
);

export const Lecture = mongoose.model("Lecture", lectureSchema);
