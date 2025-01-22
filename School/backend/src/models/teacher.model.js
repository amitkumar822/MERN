import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Teacher name is required"],
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
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    unique: true,
    match: [
      /^[6-9]\d{9}$/,
      "Please enter a valid 10 digit phone number",
    ],
  },
  subjects: [
    {
      type: String,
      required: [true, "At least one subject is required"],
    },
  ],
  joiningDate: {
    type: Date,
    required: [true, "Joining date is required"],
  },
  qualifications: {
    type: String,
  },
  experience: {
    type: Number,
    required: [true, "Experience is required"],
  },
});

const Teacher = mongoose.model("Teacher", teacherSchema);
export default Teacher;
