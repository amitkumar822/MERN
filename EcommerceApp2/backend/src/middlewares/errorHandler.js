import { ApiError } from "../../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
  // Check if the error is an instance of ApiError
  if (err instanceof ApiError) {
    res.status(err.statusCode || 500).json({
      success: err.success,
      statusCode: err.statusCode,
      message: err.message,
      errors: err.errors,
    });
  } else {
    // Handle other errors not thrown with ApiError
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal Server Error",
      errors: [err.message],
    });
  }
};

export default errorHandler;
