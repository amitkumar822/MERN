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
    const { courseTitle, category} = req.body;
    if(!courseTitle || !category) {
        throw new ApiError(400, 'Course title and category are required');
    }

    const newCourse = new Course({
        courseTitle,
        category,
        creator: userId
    })
    const course = await newCourse.save();
    res.status(201).json(new ApiResponse(201, course, 'Course created successfully'));
})