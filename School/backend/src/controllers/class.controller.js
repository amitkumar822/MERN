import mongoose from "mongoose";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { classValidate } from "../helpers/classValidate.js";
import Class from "../models/class.model.js";

export const createClass = asyncHandler(async (req, res) => {
  const { className } = req.body;

  if (!className) {
    throw new ApiError(400, "Class name is required");
  }

  if (!classValidate.includes(className)) {
    throw new ApiError(
      400,
      `Invalid className. Please enter a valid className: ${classValidate.join(
        ", "
      )}`
    );
  }

  const existingClass = await Class.findOne({ className });
  if (existingClass) {
    throw new ApiError(
      409,
      `Class with the same name ${className} already exists`
    );
  }

  const newClass = new Class({ className });
  await newClass.save();

  return res
    .status(201)
    .json(new ApiResponse(201, newClass, "Class created successfully"));
});

export const getAllClasses = asyncHandler(async (_, res) => {
  const classes = await Class.find()
    .sort({ createdAt: -1 })
    .populate({
      path: "studentsId",
      select: "fullName fatherName motherName email",
    })
    .lean();

  if (!classes || classes.length === 0) {
    throw new ApiError(404, "No classes found");
  }

  return res.json(
    new ApiResponse(200, classes, "All classes fetched successfully")
  );
});

export const getClassById = asyncHandler(async (req, res) => {
  const { classId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(classId)) {
    throw new ApiError(400, "Invalid class ID");
  }
  const classObj = await Class.findById(classId).lean();
  if (!classObj) {
    throw new ApiError(404, "Class not found");
  }

  return res.json(new ApiResponse(200, classObj, "Class fetched successfully"));
});

export const addStudentInClassWise = asyncHandler(async (req, res) => {
  const { classId, studentsId } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(classId) ||
    !Array?.isArray(studentsId) ||
    studentsId?.some((id) => !mongoose.Types.ObjectId.isValid(id))
  ) {
    throw new ApiError(400, "Invalid class or student ID");
  }

  const classObj = await Class.findById(classId).lean();
  if (!classObj) {
    throw new ApiError(404, "Class not found");
  }

  const uniqueStudentsId = [...new Set(studentsId)];
  const existingStudentsId = new Set(
    classObj.studentsId.map((id) => id.toString())
  );
  const newStudentsId = uniqueStudentsId.filter(
    (id) => !existingStudentsId.has(id)
  );

  if (newStudentsId.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, classObj, "No new students to add"));
  }

  const updatedClass = await Class.findByIdAndUpdate(
    classId,
    { $addToSet: { studentsId: { $each: newStudentsId } } },
    { new: true }
  ).lean();

  return res.json(
    new ApiResponse(200, updatedClass, "Students added to class successfully")
  );
});
