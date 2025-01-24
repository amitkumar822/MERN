import mongoose from "mongoose";
import { classValidate } from "../helpers/classValidate.js";

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
        // required: [true, "At least one student is required"],
      },
    ],
    timeTable: [
      {
        day: {
          type: String,
          // required: [true, "Day is required"],
          enum: {
            values: [
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
            message:
              "Please enter a valid days Sunday or Monday or Tuesday or Wednesday or Thursday or Friday or Saturday",
          },
        },
        periods: [
          {
            subject: {
              type: String,
              trim: true,
              // required: [true, "Subject is required"],
            },
            startTime: {
              type: String,
              // required: [true, "Start time is required"],
            },
            endTime: {
              type: String,
              // required: [true, "End time is required"],
            },
            teacherId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Teacher",
              // required: [true, "Teacher is required"],
            },
          },
        ],
      },
    ],
    subjects: [
      {
        type: String,
        trim: true,
        // required: [true, "Subject list is required"],
      },
    ],
    roomNumber: {
      type: String,
      // required: [true, "Room number is required"],
    },
    capacity: {
      type: Number,
      // required: [true, "Capacity is required"],
      min: [1, "Capacity must be at least 1"],
    },
    academicYear: {
      type: String,
      // required: [true, "Academic year is required"],
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
