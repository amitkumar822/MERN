import cloudinary from "cloudinary";

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to delete an image from Cloudinary
export const deleteFromCloudinary = async (publicId) => {
  const response = await cloudinary.uploader.destroy(publicId);

  if (response.result === "ok") {
    return true;
  }
  return false; // Return false if the image was not found
};
