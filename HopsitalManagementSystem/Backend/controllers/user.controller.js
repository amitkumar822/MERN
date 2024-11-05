import { User } from "../models/user.model.js";
import ApiErrorHandler from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateToken } from "../utils/JwtToken.js";

export const patientRegister = asyncHandler( async (req, res, next) => {
    // docAvatar, doctorDepartment
    const { firstName, lastName, email, phone, dob, gender, password, role } = req.body;

    if([firstName, lastName, email, phone, dob, gender, password, role].some((field) => field==="")){
        return next(new ApiErrorHandler("All fields must be required", 400));
    }

    let user = await User.findOne({ email });
    if(user) {
        return next(new ApiErrorHandler(`User All ready registered with this ${email} email`, 400));
    }

    user = await User.create({ firstName, lastName, email, phone, dob, gender, password, role });

    generateToken(user, "Patient Register Successfully!", 200, res);
});

export const login = asyncHandler( async (req, res, next) => {
    const { email, password, role } = req.body;
    
    if(!email || !password || !role){
        return next(new ApiErrorHandler("All fields must be required", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    if(!user){
        return next(new ApiErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatch = await user.comparePassword(password);
    if(!isPasswordMatch){
        return next(new ApiErrorHandler("Invalid email or password", 401));
    }

    if(role !== user.role) {
        return next(new ApiErrorHandler(`Given role ${role} not found`, 400));
    }

    generateToken(user, "Login Successfully!", 200, res);
});