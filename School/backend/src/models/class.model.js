import mongoose from "mongoose";
import { classValidate } from "../helpers/classValidate.js";
import { validDays } from "../helpers/validDays.js";

const classSchema = new mongoose.Schema(
  {
    className: {
      type: String,
      required: [true, "Class name is required"],
      trim: true,
      enum: {
        values: classValidate,
        message: `Please specify a class name from ${classValidate}`,
      }
    },
    studentsId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    timeTable: [
      {
        day: {
          type: String,
          enum: {
            values: validDays,
            message:
              `Invalid day. Please enter a valid day: ${validDays.join(", ")}`,
          },
        },
        periods: [
          {
            subject: {
              type: String,
              trim: true,
            },
            startTime: {
              type: String,
            },
            endTime: {
              type: String,
            },
            teacherId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Teacher",
            },
          },
        ],
      },
    ],
    //~ Below all remaining work. 
    subjects: [
      {
        type: String,
        trim: true,
      },
    ],
    roomNumber: {
      type: String,
    },
    capacity: {
      type: Number,
      min: [1, "Capacity must be at least 1"],
    },
    academicYear: {
      type: String,
    },
    sections: {
      type: String,
      trim: true,
      enum: {
        values: ["A", "B", "C", "D"],
        message: "Invalid section",
      },
    }
  },
  { timestamps: true }
);

const Class = mongoose.model("Class", classSchema);
export default Class;
