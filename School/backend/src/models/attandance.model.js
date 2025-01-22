import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: [true, "Student ID is required"],
    },
    month: {
      type: Number,
      required: [true, "Month is required"],
      min: [1, "Month must be between 1 and 12"],
      max: [12, "Month must be between 1 and 12"],
    },
    day: {
      type: Number,
      required: [true, "Day is required"],
      min: [1, "Day must be between 1 and 31"],
      max: [31, "Day must be between 1 and 31"],
    },
    year: {
      type: Number,
      required: [true, "Year is required"],
      min: [1900, "Year must be realistic"],
      max: [3000, "Year must be realistic"],
    },
    
    // date: {
    //   type: Date,
    //   required: [true, "Date is required"],
    // },
    status: {
      type: Boolean,
      required: [true, "Attendance status is required"],
      default: false,
    },
    // status: {
    //   type: String,
    //   enum: {
    //     values: ['Present', 'Absent', 'Late', 'Excused'],
    //     message: "Status must be either 'Present', 'Absent', 'Late', or 'Excused'",
    //   },
    //   required: [true, "Attendance status is required"],
    // },
    // remarks: {
    //   type: String,
    //   trim: true,
    //   maxlength: [250, "Remarks should not exceed 250 characters"],
    // },
  },
  { timestamps: true }
);

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;
