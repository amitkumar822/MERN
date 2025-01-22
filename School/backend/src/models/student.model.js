import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [3, "Full name should be at least 3 characters"],
      maxlength: [50, "Full name should not exceed 50 characters"],
    },
    fatherName: {
      type: String,
      required: [true, "Father name is required"],
      trim: true,
      minlength: [3, "Father name should be at least 3 characters"],
      maxlength: [50, "Father name should not exceed 50 characters"],
    },
    motherName: {
      type: String,
      required: [true, "Mother name is required"],
      trim: true,
      minlength: [3, "Mother name should be at least 3 characters"],
      maxlength: [50, "Mother name should not exceed 50 characters"],
    },
    className: {
      type: String,
      required: [true, "Class is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [/^\d{10}$/, "Phone number must be a 10-digit number"],
    },
    dateOfBirth: {
      type: String,
      required: [true, "Date of birth is required"],
    },
    gender: {
      type: String,
      enum: {
        values: ["Male", "Female"],
        message: "Gender must be either 'Male', 'Female'",
      },
      required: [true, "Gender is required"],
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
    // rollNumber: {
    //   type: Number,
    //   required: [true, "Roll number is required"],
    //   unique: true,
    //   min: [1, "Roll number must be a positive integer"],
    // },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;
