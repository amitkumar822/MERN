import { Message } from "../models/message.model.js";
import ApiErrorHandler from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const sendMessage = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, phone, message } = req.body;

  if (!firstName || !lastName || !email || !phone || !message) {
    return next(new ApiErrorHandler("All fields are required", 400));
  }

  const newMessage = new Message({
    firstName,
    lastName,
    email,
    phone,
    message,
  });
  await newMessage.save();
  res.status(201).json({ message: "Message sent successfully" });
});
