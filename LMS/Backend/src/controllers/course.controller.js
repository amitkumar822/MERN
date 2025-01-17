import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { AsyncHandler } from "../../utils/AsyncHandler.js";
import {
  deleteMediaFromCloudinary,
  uploadMedia,
} from "../../utils/cloudinary.js";
import { Course } from "../models/course.model.js";

export const createCourse = AsyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { courseTitle, category } = req.body;
  if (!courseTitle || !category) {
    throw new ApiError(400, "Course title and category are required");
  }

  const newCourse = new Course({
    courseTitle,
    category,
    creator: userId,
  });
  const course = await newCourse.save();
  res
    .status(201)
    .json(new ApiResponse(201, course, "Course created successfully"));
});

export const getAllCourses = AsyncHandler(async (req, res) => {
  const { userId } = req.user;

  const courses = await Course.find({ creator: userId })
    .sort({ createdAt: -1 })
    .lean();

  if (!courses || courses.length === 0) {
    throw new ApiError(404, "No any course found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, courses, "Courses get successfully"));
});

export const getCourseById = AsyncHandler(async (req, res) => {
  const { courseId } = req.params;

  const course = await Course.findById(courseId).lean().exec();

  if (!course) {
    throw new ApiError(404, "Course not found");
  }
  res.status(200).json(new ApiResponse(200, course, " "));
});

export const editCourse = AsyncHandler(async (req, res) => {
  const { courseId } = req.params;

  const {
    courseTitle,
    subTitle,
    description,
    category,
    courseLevel,
    coursePrice,
  } = req.body;
  const courseThumbnail = req.file;  

  const course = await Course.findById(courseId).lean();
  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  let newCourseThumbnail = course?.courseThumbnail;
  if (courseThumbnail) {
    if (course?.courseThumbnail?.public_id) {
      await deleteMediaFromCloudinary(course?.courseThumbnail.public_id);
    }

    const result = await uploadMedia(courseThumbnail.path);
    if (result === null) {
      throw new ApiError(400, "Failed to upload thumbnail!");
    }
    newCourseThumbnail = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  const updatedData = {
    ...(courseTitle && { courseTitle }),
    ...(subTitle && { subTitle }),
    ...(description && { description }),
    ...(category && { category }),
    ...(courseLevel && { courseLevel }),
    ...(coursePrice && { coursePrice }),
    courseThumbnail: newCourseThumbnail
  };

  const updatedCourse = await Course.findByIdAndUpdate(
    courseId,
    { $set: updatedData },
    { new: true, lean: true },
  ).lean();
  
  res
    .status(200)
    .json(new ApiResponse(200, updatedCourse, "Course updated successfully"));
});
