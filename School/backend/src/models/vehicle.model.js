import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  vehicleNumber: {
    type: String,
    required: [true, "Vehicle number is required"],
    unique: true,
  },
  driverName: {
    type: String,
    required: [true, "Driver name is required"],
  },
  driverContact: {
    type: String,
    required: [true, "Driver contact is required"],
  },
  routeDetails: {
    type: String,
    required: [true, "Route details are required"],
  },
  capacity: {
    type: Number,
    required: [true, "Vehicle capacity is required"],
  },
  maintenanceDate: {
    type: Date,
    required: [true, "Maintenance date is required"],
  },
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
export default Vehicle;