import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import Order from "../models/order.model.js";

export const shippingAddress = asyncHandler(async (req, res) => {
  const { mobile, country, state, city, pincode, address, email, name } =
    req.body;
  // const userId = req.user.userId;

  if (
    !mobile ||
    !country ||
    !state ||
    !city ||
    !pincode ||
    !address ||
    !email ||
    !name
  ) {
    throw new ApiError("All fields are required", 400);
  }

  const shippingAddressCreated = await Order.create({
    mobile,
    country,
    state,
    city,
    pincode,
    address,
    email,
    name,
    // userId,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { address: shippingAddressCreated },
        "Shipping Address created successfully"
      )
    );
});
