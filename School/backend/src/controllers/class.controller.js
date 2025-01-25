import mongoose from "mongoose";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { classValidate } from "../helpers/classValidate.js";
import Class from "../models/class.model.js";
import { validDays } from "../helpers/validDays.js";

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
  const classObj = await Class.findById(classId)
    .populate({
      path: "studentsId",
      select: "fullName fatherName motherName email",
    })
    .lean();
  if (!classObj) {
    throw new ApiError(404, "Class not found");
  }

  return res.json(new ApiResponse(200, classObj, "Class fetched successfully"));
});

export const addStudentFromClassWise = asyncHandler(async (req, res) => {
  const { studentsId } = req.body;
  const { classId } = req.params;

  if (
    !mongoose.Types.ObjectId.isValid(classId) ||
    !Array?.isArray(studentsId) ||
    studentsId?.some((id) => !mongoose.Types.ObjectId.isValid(id))
  ) {
    throw new ApiError(400, "Invalid class or student ID");
  }

  const classObj = await Class.findById(classId, { studentsId: 1 }).lean();
  if (!classObj) {
    throw new ApiError(404, "Class not found");
  }

  const uniqueStudentsId = [...new Set(studentsId)];
  const existingStudentsId = new Set(
    classObj?.studentsId?.map((id) => id?.toString())
  );
  const newStudentsId = uniqueStudentsId.filter(
    (id) => !existingStudentsId.has(id)
  );

  if (newStudentsId.length === 0) {
    throw new ApiError(400, "Similar students");
  }

  const updatedClass = await Class.findByIdAndUpdate(
    classId,
    { $addToSet: { studentsId: { $each: newStudentsId } } },
    { new: true, projection: { studentsId } }
  ).lean();

  return res.json(
    new ApiResponse(200, updatedClass, "Students added to class successfully")
  );
});

export const removeStudentFromClassWise = asyncHandler(async (req, res) => {
  const { classId } = req.params;
  const { studentId } = req.body;
  if (
    !mongoose.Types.ObjectId.isValid(classId) ||
    !mongoose.Types.ObjectId.isValid(studentId)
  ) {
    throw new ApiError(400, "Invalid class or student ID");
  }

  const updatedClass = await Class.findByIdAndUpdate(
    classId,
    { $pull: { studentsId: studentId } },
    { new: true }
  ).lean();

  return res.json(
    new ApiResponse(
      200,
      updatedClass,
      "Student removed from class successfully"
    )
  );
});

export const addSubjectsFromClassWise = asyncHandler(async (req, res) => {
  const { classId } = req.params;
  const { subjects } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(classId) ||
    !Array.isArray(subjects) ||
    subjects.length === 0
  ) {
    throw new ApiError(400, "Invalid class ID or subjects array is required");
  }

  const classObj = await Class.findById(classId, { subjects: 1 }).lean();

  if (!classObj) {
    throw new ApiError(404, "Class not found");
  }

  // Use a Set to remove duplicates in the provided subjects array
  const uniqueSubjects = [...new Set(subjects)];

  // Use a Set for efficient comparison with existing subjects
  const existingSubjects = new Set(classObj.subjects || []);
  const newSubjects = uniqueSubjects.filter(
    (subject) => !existingSubjects.has(subject)
  );

  if (newSubjects.length === 0) {
    throw new ApiError(400, "All provided subjects already exist in the class");
  }

  // Add new subjects to the class in the database
  const updatedClass = await Class.findByIdAndUpdate(
    classId,
    { $addToSet: { subjects: { $each: newSubjects } } }, // Use $addToSet to avoid duplicates
    { new: true, projection: { subjects: 1 } } // Return only the updated "subjects" field
  ).lean();

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedClass.subjects,
        "Successfully added new subjects to the class"
      )
    );
});

export const removeSubjectsFromClassWise = asyncHandler(async (req, res) => {
  const { classId } = req.params;
  const { subject } = req.body;

  if (!mongoose.Types.ObjectId.isValid(classId, { subjects: 1 }) || !subject) {
    throw new ApiError(400, "Invalid class id or subject is required");
  }

  const updatedClass = await Class.findByIdAndUpdate(
    classId,
    {
      $pull: { subjects: subject },
    },
    { new: true, projection: { subjects: 1 } }
  ).lean();

  res
    .status(200)
    .json(new ApiResponse(200, updatedClass, "Successfully subjects removed"));
});

// export const addTimeTableFromClassWise = asyncHandler(async (req, res) => {
//   const { classId } = req.params;
//   const { day, subject, startTime, endTime, teacherId } = req.body;

//   // Validate inputs
//   if (
//     !mongoose.Types.ObjectId.isValid(classId) ||
//     !mongoose.Types.ObjectId.isValid(teacherId) ||
//     !day ||
//     !subject ||
//     !startTime ||
//     !endTime
//   ) {
//     throw new ApiError(
//       400,
//       "Invalid class/teacher ID or missing required fields"
//     );
//   }

//   if (!validDays.includes(day)) {
//     throw new ApiError(
//       400,
//       `Invalid day. Valid days are: ${validDays.join(", ")}`
//     );
//   }

//   // Check if the daySlot for the given day already exists in the timeTable
//   const classObj = await Class.findById(classId, { timeTable: 1 }).lean();
//   if (!classObj) {
//     throw new ApiError(404, "Class not found");
//   }
  
//   let timeTable = classObj.timeTable || [];
//   let daySlot = timeTable.find((slot) => slot.day === day);
  

//   if (!daySlot) {
//     // Add a new daySlot if it doesn't exist
//     daySlot = { day, periods: [] };
//     timeTable.push(daySlot);
//   }

//   // Check for conflicting periods within the same daySlot
//   const isSlotConflict = daySlot.periods.some(
//     (period) =>
//       period.startTime === startTime &&
//       period.endTime === endTime &&
//       period.subject === subject
//   );
  

//   if (isSlotConflict) {
//     throw new ApiError(
//       409,
//       `Time slot for ${day}, ${startTime} - ${endTime} already exists`
//     );
//   }

//   // Add the new period to the day's periods array
//   const newPeriod = {
//     subject,
//     startTime,
//     endTime,
//     teacherId,
//   };

//   // Use findByIdAndUpdate to update only the timeTable field
//   const updatedClass = await Class.findByIdAndUpdate(
//     classId,
//     {
//       $push: {
//         "timeTable.$[daySlot].periods": newPeriod,
//       },
//     },
//     {
//       arrayFilters: [{ "daySlot.day": day }], // Filter for the specific daySlot
//       new: true, // Return the updated document
//       upsert: false, // Do not create the document if it doesn't exist
//     }
//   ).select({ timeTable: 1 }); // Only return the timeTable field

//   if (!updatedClass) {
//     throw new ApiError(404, "Class not found or unable to update");
//   }

//   res
//     .status(200)
//     .json(
//       new ApiResponse(
//         200,
//         updatedClass, // Return only the updated timeTable
//         "Successfully added time slot to class"
//       )
//     );
// });

export const addTimeTableFromClassWise = asyncHandler(async (req, res) => {
  const { classId } = req.params;
  const { day, subject, startTime, endTime, teacherId } = req.body;

  // Validate inputs
  if (
    !mongoose.Types.ObjectId.isValid(classId) ||
    !mongoose.Types.ObjectId.isValid(teacherId) ||
    !day ||
    !subject ||
    !startTime ||
    !endTime
  ) {
    throw new ApiError(
      400,
      "Invalid class/teacher ID or missing required fields"
    );
  }

  if (!validDays.includes(day)) {
    throw new ApiError(
      400,
      `Invalid day. Valid days are: ${validDays.join(", ")}`
    );
  }

  // Check if the class exists
  const classObj = await Class.findById(classId, { timeTable: 1 }).lean();
  if (!classObj) {
    throw new ApiError(404, "Class not found");
  }

  // Check if the `daySlot` for the given day exists
  let timeTable = classObj.timeTable || [];
  let daySlot = timeTable.find((slot) => slot.day === day);

  if (daySlot) {
    // Check for conflicts within the existing `daySlot`
    const isSlotConflict = daySlot.periods.some(
      (period) =>
        period.startTime === startTime &&
        period.endTime === endTime &&
        period.subject === subject
    );

    if (isSlotConflict) {
      throw new ApiError(
        409,
        `Time slot for ${day}, ${startTime} - ${endTime} already exists`
      );
    }

    // Update the `daySlot` by adding a new period
    await Class.findOneAndUpdate(
      { _id: classId, "timeTable.day": day },
      {
        $push: {
          "timeTable.$.periods": {
            subject,
            startTime,
            endTime,
            teacherId,
          },
        },
      },
      { new: true }
    );
  } else {
    // Create a new `daySlot` if it doesn't exist
    const newDaySlot = {
      day,
      periods: [
        {
          subject,
          startTime,
          endTime,
          teacherId,
        },
      ],
    };

    await Class.findByIdAndUpdate(
      classId,
      {
        $push: {
          timeTable: newDaySlot,
        },
      },
      { new: true }
    );
  }

  // Fetch the updated `timeTable`
  const updatedClass = await Class.findById(classId, { timeTable: 1 }).lean();

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedClass.timeTable,
        "Successfully added time slot to class"
      )
    );
});
