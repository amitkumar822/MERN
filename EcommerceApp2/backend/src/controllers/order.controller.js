import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import crypto from "crypto";
import Order from "../models/order.model.js";
import { razorpayInstance } from "../../utils/razorpay.js";
import { AddToCart } from "../models/addToCart.modal.js";

//====== 👇Payment Controller👇 ======================
export const createOrder = asyncHandler(async (req, res) => {
  const userId = req?.user?.userId;
  const {
    amount,
    mobile,
    country,
    state,
    city,
    pincode,
    address,
    email,
    name,
    productId,
    quantity,
  } = req.body;

  if (
    !amount ||
    !mobile ||
    !country ||
    !state ||
    !city ||
    !pincode ||
    !address ||
    !email ||
    !name ||
    productId.length === 0 ||
    quantity.length === 0
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const order = await razorpayInstance.orders.create({
    amount: Number(amount * 100),
    currency: "INR",
  });

  await Order.create({
    order_id: order.id,
    amount,
    mobile,
    country,
    state,
    city,
    pincode,
    address,
    email,
    name,
    productId,
    quantity,
    userId,
  });

  res
    .status(200)
    .json(new ApiResponse(200, order, "Order Created On RazorPay"));
});

export const verifyPayment = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;

  try {
    const bodyData = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.razorpay_key_secret) // Use HMAC with the secret key
      .update(bodyData)
      .digest("hex");

    const isValid = expectedSignature === razorpay_signature;

    if (isValid) {
      await Order.updateOne(
        { order_id: razorpay_order_id }, // Match the order
        {
          $set: {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
          },
        }
      );

      await AddToCart.deleteMany({ userId });

      res.redirect(
        `http://localhost:5173/success?payment_id=${razorpay_payment_id}`
      );
    } else {
      const order = await Order.findOne({ order_id: razorpay_order_id });
      await Order.findByIdAndDelete(order._id);
      res.redirect("http://localhost:5173/failed");
    }
  } catch (error) {
    const order = await Order.findOne({ order_id: razorpay_order_id });
    await Order.findByIdAndDelete(order._id);

    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const getRazorpayKey = asyncHandler(async (req, res) => {
  const RazorPayKey = process.env.razorpay_key_id;
  return res
    .status(200)
    .json(new ApiResponse(200, RazorPayKey, "Success Get Razor Pay Key"));
});
//======👆End Payment Controller👆=============

export const getAllConfirmedOrder = asyncHandler(async (req, res) => {
  const userId = req.user.userId;

  const order = await Order.find({ userId }).populate("productId");

  if (!order) throw new ApiError(404, "Order not found");

  res.status(200).json(new ApiResponse(200, order, "Order Get Successfully"));
});
