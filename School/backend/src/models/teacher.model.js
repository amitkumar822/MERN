import mongoose from "mongoose";
import { classValidate } from "../helpers/classValidate.js";

const teacherSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Teacher full name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address",
    ],
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
    unique: true,
    match: [/^[6-9]\d{9}$/, "Please enter a valid 10 digit phone number"],
  },
  subjects: [
    {
      type: String,
      required: [true, "At least one subject is required"],
    },
  ],
  joiningDate: {
    type: String,
    required: [true, "Joining date is required"],
  },
  qualifications: {
    type: String,
    required: [true, "Qualifications are required"],
  },
  experience: {
    type: String,
    required: [true, "Experience is required"],
  },
  address: {
    street: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    state: {
      type: String,
      required: [true, "State is required"],
      trim: true,
    },
    zipCode: {
      type: String,
      required: [true, "Zip code is required"],
      trim: true,
      match: [/^\d{6}$/, "Zip code must be a 6-digit number"],
    },
  },
  timeTable: [
    {
      day: {
        type: String,
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
          },
          startTime: {
            type: String,
          },
          endTime: {
            type: String,
          },
          className: {
            type: String,
            enum: {
              values: classValidate,
              message: "Invalid class name",
            },
          },
          roomNumber: {
            type: String,
          },
          section: {
            type: String,
            enum: {
              values: ["A", "B", "C", "D"],
              message: "Invalid section",
            },
          }
        },
      ],
    },
  ],
});

const Teacher = mongoose.model("Teacher", teacherSchema);
export default Teacher;
