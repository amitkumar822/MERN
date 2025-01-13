import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadMedia = async (path) => {
  try {
    const result = await cloudinary.uploader.upload(path, {
      resource_type: "auto",
    });

    return result;
  } catch (error) {
    console.error("UploadOnCloudinary Error: \n",error);
  }
};

export const deleteMediaFromCloudinary = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.error("Delete Media From Cloudinary Error: \n",error);
    }
} 

export const deleteVideoFromCloudinary = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId, {
            resource_type: "video"
        })
    } catch (error) {
        console.error("Delete Video From Cloudinary Error: \n",error);
    }
}