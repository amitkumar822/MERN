import { Blog } from "../models/blog.model.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const createBlog = async (req, res) => {
  try {
    // if (!req.files || Object.keys(req.files).length === 0) {
    //   return res.status(400).json({ message: "Blog image must be required" });
    // }

    // const { blogImage } = req.files;

    // const allowedFormates = ["image/jpeg", "image/png", "image/webp"];

    // if (!allowedFormates.includes(blogImage.mimetype)) {
    //   return res.status(400).json({
    //     message: "Invalid photo format, Only jpeg, png and webp are allowed",
    //   });
    // }

    const { title, category, about } = req.body;

    if ([title, category, about].some((field) => field?.trim() === "")) {
      return res
        .status(400)
        .json({ message: "title, category and about fields must be required" });
    }

    const adminName = req?.user?.name;
    const adminPhoto = req?.user?.photo;
    const createdBy = req?.user?._id;

    // upload photo on cloudinary server
    // const cloudinaryResponse = await uploadOnCloudinary(blogImage.tempFilePath);

    const blogDate = {
      title,
      about,
      category,
      adminName,
      adminPhoto,
      createdBy,
      //   blogImage: {
      //     public_id: cloudinaryResponse?.public_id,
      //     url: cloudinaryResponse?.url,
      //   },
    };
    const blog = await Blog.create(blogDate);

    res.status(201).json({ message: "Blog created successfully", blog });
  } catch (error) {
    console.log("User register Error: ", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blogDeleted = await Blog.findByIdAndDelete(id);

    if (blogDeleted) {
      return res.status(200).json({ message: "Blog deleted successfully" });
    } else {
      return res.status(404).json({ message: "Blog not found" });
    }
  } catch (error) {
    console.log("Delete blog Error: ", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const allBlogs = await Blog.find();
    if(allBlogs.length === 0) {
      return res.status(404).json({message: "Blog not created"})
    }
    res.status(200).json({ message: "All blogs fetched successfully", blogs: allBlogs });
  } catch (error) {
    console.log("Get all blogs Error: ", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}