import { config } from "dotenv";
config({ path: ".env" });
import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  if (!localFilePath) return null;

  try {
    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // Try to delete the local file after successful upload
    await fs.unlink(localFilePath);
    console.log(`Successfully deleted local file at ${localFilePath}`);
    return response;

  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);

    // Try to delete the local file even if the upload fails
    try {
      await fs.unlink(localFilePath);
      console.log(`Successfully deleted local file at ${localFilePath} after upload error`);
    } catch (deleteError) {
      console.error(`Failed to delete local file at ${localFilePath}:`, deleteError);
    }

    return null;
  }
};

export { uploadOnCloudinary };











// import { config } from "dotenv";
// config({ path: ".env" });
// import { v2 as cloudinary } from "cloudinary";
// import fs from "fs";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const uploadOnCloudinary = async (localFilePath) => {
//   try {
//     if (!localFilePath) return null;
//     // upload the file on the cloudinary server
//     const response = await cloudinary.uploader.upload(localFilePath, {
//       resource_type: "auto",
//     });

//     fs.unlinkSync(localFilePath);
//     return response;
//   } catch (error) {
//     console.log("Error uploading file: ", error);
//     fs.unlinkSync(localFilePath);
//     return null;
//   }
// };

// export { uploadOnCloudinary };
