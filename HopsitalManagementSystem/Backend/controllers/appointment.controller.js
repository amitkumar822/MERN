import { Appointment } from "../models/appointment.model.js";
import { User } from "../models/user.model.js";
import ApiErrorHandler from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const appointment = asyncHandler(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    appointment_date,
    department,
    doctor_first_name,
    doctor_last_name,
    hashVisted,
    address,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !gender ||
    !appointment_date ||
    !department ||
    !doctor_first_name ||
    !doctor_last_name ||
    !hashVisted ||
    !address
  ) {
    return next(new ApiErrorHandler("All fields must be required!", 400));
  }

  const isConfict = await User.find({
    firstName: doctor_first_name,
    lastName: doctor_last_name,
    role: "Doctor",
    doctorDepartment: department,
  });

  if (isConfict.length === 0) {
    return next(new ApiErrorHandler("Doctor not found!", 404));
  }

  if (isConfict.length > 1) {
    return next(
      new ApiErrorHandler(
        "Doctor Confict! Please Contact Through Email or Phone",
        404
      )
    );
  }

  const doctorId = isConfict[0]._id;
  const patientId = req.user._id;

  const appointment = await Appointment.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    appointment_date,
    department,
    doctor: {
      firstName: doctor_first_name,
      lastName: doctor_last_name,
    },
    hashVisted,
    address,
    doctorId,
    patientId,
  });

  res.status(200).json({
    success: true,
    message: "Appointment send successfylly!",
    appointment,
  });
});

export const getAllAppointments = asyncHandler(async (req, res, next) => {
  const appointment = await Appointment.find();
  res.status(200).json({ success: true, appointment });
});

export const updateAppointmentStatus = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  let appointment = await Appointment.findById(id);
  if (!appointment) {
    return next(new ApiErrorHandler("Appointment not found!", 404));
  }

  appointment = await Appointment.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "Appointment Status Updated Successfully!",
    appointment,
  });
});

export const deleteAppointment = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  let appointment = await Appointment.findById(id);
  if (!appointment) {
    return next(new ApiErrorHandler("Appointment not found!", 404));
  }

  await Appointment.findByIdAndDelete(id);

  res
    .status(200)
    .json({ success: true, message: "Appointment Deleted Successfylly!" });
});
