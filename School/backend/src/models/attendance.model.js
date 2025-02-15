import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: [true, "Attendance date is required"],
      index: true, // Helps to efficiently query by date
    },
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: [true, "Class ID is required"],
      index: true, // Optimize queries by class
    },
    records: [
      {
        studentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student",
          required: [true, "Student ID is required"],
        },
        status: {
          type: String,
          enum: ["Present", "Absent", "Late", "Excused"],
          required: [true, "Attendance status is required"],
        },
        remarks: {
          type: String,
          trim: true,
          max: [250, "Remarks should not exceed 250 characters"],
        },
      },
    ],
  },
  { timestamps: true }
);

// Ensure compound index for optimal query performance
attendanceSchema.index({ classId: 1, date: 1 });

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;





// import mongoose from 'mongoose';

// const attendanceSchema = new mongoose.Schema(
//   {
//     studentsId: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Student",
//       },
//     ],
//     classId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Class',
//       required: [true, "Class ID is required"],
//     },
//     month: {
//       type: Number,
//       required: [true, "Month is required"],
//       min: [1, "Month must be between 1 and 12"],
//       max: [12, "Month must be between 1 and 12"],
//     },
//     day: {
//       type: Number,
//       required: [true, "Day is required"],
//       min: [1, "Day must be between 1 and 31"],
//       max: [31, "Day must be between 1 and 31"],
//     },
//     year: {
//       type: Number,
//       required: [true, "Year is required"],
//       min: [1900, "Year must be realistic"],
//       max: [3000, "Year must be realistic"],
//     },
//     status: {
//       type: Boolean,
//       required: [true, "Attendance status is required"],
//       default: false,
//     },
//     // status: {
//     //   type: String,
//     //   enum: {
//     //     values: ['Present', 'Absent', 'Late', 'Excused'],
//     //     message: "Status must be either 'Present', 'Absent', 'Late', or 'Excused'",
//     //   },
//     //   required: [true, "Attendance status is required"],
//     // },
//     // remarks: {
//     //   type: String,
//     //   trim: true,
//     //   maxlength: [250, "Remarks should not exceed 250 characters"],
//     // },
//   },
//   { timestamps: true }
// );

// const Attendance = mongoose.model('Attendance', attendanceSchema);

// export default Attendance;
