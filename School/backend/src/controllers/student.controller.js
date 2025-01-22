import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import Student from "../models/student.model.js";

export const addStudent = asyncHandler(async (req, res) => {
  const {
    fullName,
    fatherName,
    motherName,
    email,
    phoneNumber,
    dateOfBirth,
    gender,
    street,
    city,
    state,
    zipCode,
    className,
  } = req.body;

  if (
    !fullName ||
    !fatherName ||
    !motherName ||
    !email ||
    !phoneNumber ||
    !dateOfBirth ||
    !gender ||
    !city ||
    !state ||
    !zipCode ||
    !className
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existingStudent = await Student.findOne({ email }).lean();
  if (existingStudent) {
    throw new ApiError(409, "Student with the same email already exists");
  }

  const newStudent = new Student({
    fullName,
    fatherName,
    motherName,
    email,
    phoneNumber,
    dateOfBirth,
    gender,
    address: {
      street,
      city,
      state,
      zipCode,
    },
    className,
  });
  const students = await newStudent.save();

  res
    .status(201)
    .json(new ApiResponse(201, students, "Student created successfully"));
});

export const getAllStudents = asyncHandler(async (_, res) => {
  const students = await Student.find()
    .sort({
      createdAt: -1,
    })
    .lean();

  if (!students || students?.length === 0) {
    throw new ApiError("No students found", 404);
  }

  res.status(200).json(new ApiResponse(200, students, "Students fetched successfully"));
});
