import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Staff name is required"],
    trim: true,
  },
  email: {
    type: String,
    unique: true,
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
  },
  position: {
    type: String,
    required: [true, "Position is required"],
  },
  joiningDate: {
    type: Date,
    required: [true, "Joining date is required"],
  },
  salary: {
    type: Number,
    required: [true, "Salary is required"],
  },
});

const Staff = mongoose.model("Staff", staffSchema);
export default Staff;