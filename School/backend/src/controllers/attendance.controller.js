import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import Attendance from "../models/attendance.model.js";

export const createAttendance = asyncHandler(async (req, res) => {
  const { month, day, year, status, studentId, classId } = req.body;

  if (!studentId || !month || !day || !year || !classId) {
    throw new ApiError(400, "All fields are required");
  }

  const existingAttendance = await Attendance.findOne({
    studentId,
    month,
    day,
    year,
    status,
    classId,
  });

  if (existingAttendance) {
    existingAttendance.status = status;
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
      classId,
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

// import { ApiError } from "../../utils/ApiError.js";
// import { ApiResponse } from "../../utils/ApiResponse.js";
// import { asyncHandler } from "../../utils/asyncHandler.js";
// import Attendance from "../models/attendance.model.js";

// /**
//  * Create or Update Attendance (Batch Supported)
//  */
// export const createOrUpdateAttendance = asyncHandler(async (req, res) => {
//   const { date, classId, records } = req.body;

//   if (!date || !classId || !records || !Array.isArray(records)) {
//     throw new ApiError(400, "Date, Class ID, and records array are required.");
//   }

//   const parsedDate = new Date(date);
//   if (isNaN(parsedDate.getTime())) {
//     throw new ApiError(400, "Invalid date format.");
//   }

//   // Upsert attendance for each student in the records
//   const operations = records.map((record) => ({
//     updateOne: {
//       filter: { classId, date: parsedDate, "records.studentId": record.studentId },
//       update: {
//         $set: {
//           "records.$.status": record.status,
//           "records.$.remarks": record.remarks || null,
//         },
//       },
//       upsert: true, // If no record exists, create it
//     },
//   }));

//   // Execute bulk operations
//   await Attendance.bulkWrite(operations);

//   res
//     .status(200)
//     .json(new ApiResponse(200, null, "Attendance records processed successfully."));
// });

// /**
//  * Get All Attendance for a Specific Date and Class
//  */
// export const getAttendanceByDateAndClass = asyncHandler(async (req, res) => {
//   const { date, classId } = req.query;

//   if (!date || !classId) {
//     throw new ApiError(400, "Date and Class ID are required.");
//   }

//   const parsedDate = new Date(date);
//   if (isNaN(parsedDate.getTime())) {
//     throw new ApiError(400, "Invalid date format.");
//   }

//   const attendance = await Attendance.findOne({ classId, date: parsedDate })
//     .populate({
//       path: "records.studentId",
//       select: "fullName fatherName motherName className",
//     })
//     .lean();

//   if (!attendance) {
//     throw new ApiError(404, "No attendance records found for the specified date and class.");
//   }

//   res
//     .status(200)
//     .json(new ApiResponse(200, attendance, "Attendance records fetched successfully."));
// });

// /**
//  * Get Attendance for a Specific Student by Date Range
//  */
// export const getStudentAttendanceByDateRange = asyncHandler(async (req, res) => {
//   const { studentId, startDate, endDate } = req.query;

//   if (!studentId || !startDate || !endDate) {
//     throw new ApiError(400, "Student ID, Start Date, and End Date are required.");
//   }

//   const start = new Date(startDate);
//   const end = new Date(endDate);
//   if (isNaN(start.getTime()) || isNaN(end.getTime())) {
//     throw new ApiError(400, "Invalid date format.");
//   }

//   const attendance = await Attendance.find({
//     date: { $gte: start, $lte: end },
//     "records.studentId": studentId,
//   })
//     .select("date records.$") // Only fetch the specific student's record
//     .lean();

//   if (!attendance || attendance.length === 0) {
//     throw new ApiError(404, "No attendance records found for the specified student and date range.");
//   }

//   res
//     .status(200)
//     .json(
//       new ApiResponse(
//         200,
//         attendance,
//         "Attendance records fetched successfully for the specified student."
//       )
//     );
// });
