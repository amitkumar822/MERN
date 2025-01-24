import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { generateExcel } from "../helpers/generateExcel.js";
import { generatePDF } from "../helpers/generatePDF.js";
import Attendance from "../models/attendance.model.js";

export const createAttendance = asyncHandler(async (req, res) => {
  const { month, day, year, status } = req.body;

  const { studentId } = req.params;

  if (!studentId || !month || !day || !year) {
    throw new ApiError(400, "All fields are required");
  }

  const existingAttendance = await Attendance.findOne({
    studentId,
    month,
    day,
    year,
    status,
  });

  if (existingAttendance) {
    existingAttendance.status = !existingAttendance.status;
    await existingAttendance.save();

    return res
      .status(204)
      .json(
        new ApiResponse(
          204,
          existingAttendance,
          "Attendance updated successfully"
        )
      );
  } else {
    const attendance = await Attendance.create({
      studentId,
      month,
      day,
      year,
      status,
    });
    res
      .status(201)
      .json(
        new ApiResponse(201, attendance, "Attendance Created Successfully")
      );
  }
});

export const getAllAttendance = asyncHandler(async (req, res) => {
  const allAttendance = await Attendance.find()
    .populate({
      path: "studentId",
      select: "fullName fatherName motherName className",
    })
    .lean();

  if (!allAttendance || allAttendance?.length === 0) {
    throw new ApiError(404, "No attendance records found");
  }

  //TODO: Generate PDF and Excel files
  // generatePDF(allAttendance);
  // await generateExcel(allAttendance);

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        allAttendance,
        "Attendance records fetched successfully"
      )
    );
});

export const getAttendanceDayMonthYearWise = asyncHandler(async (req, res) => {
  const { month, day, year } = req.body;

  const query = {};
  if (month !== undefined) query.month = month;
  if (day !== undefined) query.day = day;
  if (year !== undefined) query.year = year;

  // Fetch attendance records matching the query
  const attendance = await Attendance.find(query)
    .populate({
      path: "studentId",
      select: "fullName fatherName motherName className",
    })
    .lean();

  if (!attendance) {
    throw new ApiError(404, "No attendance record found for this day");
  }
  res.json(
    new ApiResponse(200, attendance, "Attendance record fetched successfully")
  );
});
