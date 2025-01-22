import mongoose from "mongoose";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import Teacher from "../models/teacher.model.js";
import { validDays } from "../helpers/validDays.js";

export const addTeacher = asyncHandler(async (req, res) => {
  const {
    fullName,
    email,
    phoneNumber,
    subjects,
    joiningDate,
    qualifications,
    experience,
    street,
    city,
    state,
    zipCode,
  } = req.body;

  if (
    !fullName ||
    !email ||
    !phoneNumber ||
    !subjects ||
    !joiningDate ||
    !qualifications ||
    !experience ||
    !city ||
    !state ||
    !zipCode
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existingTeacher = await Teacher.find({ email }).lean();
  if (existingTeacher.length > 0) {
    throw new ApiError(409, "Teacher with the same email already exists");
  }

  const newTeacher = await Teacher.create({
    fullName,
    email,
    phoneNumber,
    subjects,
    joiningDate,
    qualifications,
    experience,
    address: {
      street,
      city,
      state,
      zipCode,
    },
  });

  res
    .status(201)
    .json(new ApiResponse(201, newTeacher, "Teacher added successfully"));
});

export const getAllTeachers = asyncHandler(async (_, res) => {
  const teachers = await Teacher.find().lean();

  if (!teachers || teachers.length === 0) {
    throw new ApiError(404, "No teachers found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, teachers, "Teachers fetched successfully"));
});

export const getTeacherById = asyncHandler(async (req, res) => {
  const { teacherId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(teacherId)) {
    throw new ApiError(400, "Invalid Teacher ID!");
  }

  const teacher = await Teacher.findById(teacherId).lean();

  if (!teacher) {
    throw new ApiError(404, "Teacher not found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, teacher, "Teacher fetched successfully"));
});

export const addTimeTablesTeacher = asyncHandler(async (req, res) => {
  const { day, subject, startTime, endTime, roomNumber, className, section } =
    req.body;
  const { teacherId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(teacherId)) {
    throw new ApiError(400, "Invalid Teacher ID!");
  }

  if (
    !day ||
    !subject ||
    !startTime ||
    !endTime ||
    !roomNumber ||
    !className ||
    !section
  ) {
    throw new ApiError(400, "All fields are required");
  }

  if (!validDays.includes(day)) {
    throw new ApiError(
      400,
      `Invalid day. Please enter a valid day: ${validDays.join(", ")}`
    );
  }

  const teacher = await Teacher.findById(teacherId);
  if (!teacher) {
    throw new ApiError(404, "Teacher not found");
  }

  if (!teacher.subjects.includes(subject)) {
    throw new ApiError(400, `Teacher does not teach ${subject}`);
  }

  const periodExists = teacher.timeTable.some((t) => {
    return (
      t.day === day &&
      t.periods.some(
        (p) =>
          p.startTime === startTime &&
          p.endTime === endTime &&
          p.className === className &&
          p.section === section
      )
    );
  });

  if (periodExists) {
    throw new ApiError(
      400,
      "Duplicate timetable entry for the same day, time, class, and section."
    );
  }

  const period = {
    subject,
    startTime,
    endTime,
    roomNumber,
    className,
    section,
  };

  // Check if the day already exists in the timetable
  const dayIndex = teacher.timeTable.findIndex((t) => t.day === day);
  if (dayIndex !== -1) {
    // If the day exists, push the new period to the existing day's periods array
    teacher.timeTable[dayIndex].periods.push(period);
  } else {
    // If the day does not exist, add a new entry for the day with the period
    teacher.timeTable.push({ day, periods: [period] });
  }

  await teacher.save();

  res.status(200).json({
    success: true,
    message: "Timetable updated successfully",
    teacher,
  });
});

export const deleteTimeTablePeriod = asyncHandler(async (req, res) => {
  const { teacherId } = req.params;
  const { day, periodId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(teacherId)) {
    throw new ApiError(400, "Invalid Teacher ID!");
  }

  const teacher = await Teacher.findById(teacherId);
  if (!teacher) {
    throw new ApiError(404, "Teacher not found");
  }

  const dayIndex = teacher.timeTable.findIndex((t) => t.day === day);
  if (dayIndex === -1) {
    throw new ApiError(404, "Day not found in timetable");
  }

  const periodIndex = teacher.timeTable[dayIndex].periods.findIndex(
    (p) => p._id.toString() === periodId
  );

  if (periodIndex === -1) {
    throw new ApiError(404, "Period not found in timetable");
  }

  teacher.timeTable[dayIndex].periods.splice(periodIndex, 1);

  if (teacher.timeTable[dayIndex].periods.length === 0) {
    teacher.timeTable.splice(dayIndex, 1);
  }

  await teacher.save();

  res.status(200).json({
    success: true,
    message: "Period deleted successfully",
    teacher,
  });
});

export const updateTimeTablePeriod = asyncHandler(async (req, res) => {
  const { teacherId } = req.params;
  const {
    day,
    periodId,
    subject,
    startTime,
    endTime,
    roomNumber,
    className,
    section,
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(teacherId)) {
    throw new ApiError(400, "Invalid Teacher ID!");
  }

  if (
    !day
  ) {
    throw new ApiError(400, "Day must be required");
  }

  const teacher = await Teacher.findById(teacherId);
  if (!teacher) {
    throw new ApiError(404, "Teacher not found");
  }

  const dayIndex = teacher.timeTable.findIndex((t) => t.day === day);
  if (dayIndex === -1) {
    throw new ApiError(404, "Day not found in timetable");
  }

  const periodIndex = teacher.timeTable[dayIndex].periods.findIndex(
    (p) => p._id.toString() === periodId
  );
  if (periodIndex === -1) {
    throw new ApiError(404, "Period not found in timetable");
  }

  const existingPeriod = teacher.timeTable[dayIndex].periods[periodIndex];

  teacher.timeTable[dayIndex].periods[periodIndex] = {
    ...existingPeriod,
    subject: subject || existingPeriod.subject,
    startTime: startTime || existingPeriod.startTime,
    endTime: endTime || existingPeriod.endTime,
    roomNumber: roomNumber || existingPeriod.roomNumber,
    className: className || existingPeriod.className,
    section: section || existingPeriod.section,
  };

  await teacher.save();

  res
    .status(200)
    .json(new ApiResponse(200, teacher, "Period updated successfully"));
});
