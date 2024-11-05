import { User } from "../models/user.model.js";
import ApiErrorHandler from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { generateToken } from "../utils/JwtToken.js";

export const patientRegister = asyncHandler(async (req, res, next) => {
  // docAvatar, doctorDepartment
  const { firstName, lastName, email, phone, dob, gender, password, role } =
    req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !gender ||
    !password ||
    !role
  ) {
    return next(new ApiErrorHandler("All fields must be required", 400));
  }

  let user = await User.findOne({ email });
  if (user) {
    return next(
      new ApiErrorHandler(
        `User All ready registered with this ${email} email`,
        400
      )
    );
  }

  user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
    role,
  });

  generateToken(user, "Patient Register Successfully!", 200, res);
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return next(new ApiErrorHandler("All fields must be required", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ApiErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new ApiErrorHandler("Invalid email or password", 401));
  }

  if (role !== user.role) {
    return next(new ApiErrorHandler(`Given role ${role} not found`, 400));
  }

  generateToken(user, "Login Successfully!", 200, res);
});

export const addNewAdmin = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, phone, dob, gender, password } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !gender ||
    !password
  ) {
    return next(new ApiErrorHandler("All fields must be required", 400));
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ApiErrorHandler(
        `User All ready registered with this ${email} email`,
        400
      )
    );
  }

  const admin = await User.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
    role: "Admin",
  });

  res.status(200).json({
    success: true,
    message: "New Admin registered successfully!",
  });
});

export const getUserDetails = asyncHandler(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

export const logoutAdmin = asyncHandler(async (req, res, next) => {
  res
    .status(200)
    .cookie("adminToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "User Logout successfully!",
    });
});

export const logoutPatient = asyncHandler(async (req, res, next) => {
  res
    .status(200)
    .cookie("patientToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "User Logout successfully!",
    });
});

export const addNewDoctor = asyncHandler(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ApiErrorHandler("Doctor Avatar Must Be Required!", 400));
  }

  const { docAvatar } = req.files;
  const allowedFormats = ["image/jpeg", "image/png", "image/webp"];

  if (!allowedFormats.includes(docAvatar.mimetype)) {
    return next(
      new ApiErrorHandler(
        "File Suppoart Only This PNG, JPEG and WEBP Format",
        400
      )
    );
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
    doctorDepartment,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !gender ||
    !password ||
    !doctorDepartment
  ) {
    return next(new ApiErrorHandler("All fields must be required", 400));
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ApiErrorHandler(
        `${isRegistered.role} already registered with this email!`,
        400
      )
    );
  }
  // upload docAvatar on cloudinary
  const cloudinaryResponse = await uploadOnCloudinary(docAvatar.tempFilePath);
  console.log("FilePath cont: ",cloudinaryResponse)

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    return next(
      new ApiErrorHandler("Faield To Upload DocAvatar, Try Again!", 400)
    );
  }

  const doctor = await User.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
    doctorDepartment,
    role: "Doctor",
    docAvatar: {
      public_id: cloudinaryResponse?.public_id,
      url: cloudinaryResponse?.url,
    },
  });

  res.status(200).json({
    success: true,
    message: "New Doctor registered successfully!",
    doctor,
  });
});

export const getAllDoctors = asyncHandler(async (req, res, next) => {
  const doctors = await User.find({ role: "Doctor" });
  res.status(200).json({
    success: true,
    doctors,
  });
});

export const deleteDoctor = asyncHandler(async (req, res, next) => {});
