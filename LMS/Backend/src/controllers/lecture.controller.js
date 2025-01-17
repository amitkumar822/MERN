import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { AsyncHandler } from "../../utils/AsyncHandler.js";
import {
  deleteMediaFromCloudinary,
  uploadMedia,
} from "../../utils/cloudinary.js";
import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";

export const createLecture = AsyncHandler(async (req, res) => {
  const { lectureTitle } = req.body;
  const { courseId } = req.params;

  if(!lectureTitle || !courseId) {
    throw new ApiError(400, "Lecture title and course ID are required");
  }

  // create a new lecture
  const lecture = await Lecture.create({ lectureTitle });

  // add the lecture to the course
  await Course.findByIdAndUpdate(courseId, { $push: { lectures: lecture._id } });

  res.status(201).json(new ApiResponse(201, lecture, "Lecture created successfully"));
});

export const getCourseLectureById = AsyncHandler(async (req, res) => {
  const { courseId } = req.params;

  const course = await Course.findById(courseId).populate("lectures").lean();

  if (!course || course.length === 0) {
    throw new ApiError(404, "Course not found");
  }

  res.status(200).json(new ApiResponse(200, course.lectures, "Lecture fetch successfully"));
})
