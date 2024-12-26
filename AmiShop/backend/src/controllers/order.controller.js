import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import crypto from "crypto";
import Order from "../models/order.model.js";
import { razorpayInstance } from "../../utils/razorpay.js";
import { AddToCart } from "../models/addToCart.modal.js";
import mongoose from "mongoose";

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
  const userId = req?.user?.userId;

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

      return res.redirect(
        `http://localhost:5173/success?payment_id=${razorpay_payment_id}`
      );
    } else {
      const order = await Order.findOne({ order_id: razorpay_order_id });
      await Order.findByIdAndDelete(order._id);
      return res.redirect("http://localhost:5173/failed");
    }
  } catch (error) {
    const order = await Order.findOne({ order_id: razorpay_order_id });
    await Order.findByIdAndDelete(order._id);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const getRazorpayKey = asyncHandler(async (req, res) => {
  const RazorPayKey = process.env.razorpay_key_id;
  return res
    .status(200)
    .json(new ApiResponse(200, RazorPayKey, "Success Get Razor Pay Key"));
});

export const cancelOrder = asyncHandler(async (req, res) => {
  const userId = req?.user?.userId;
  const { orderId } = req.body;

  if (!orderId) {
    throw new ApiError(400, "Order ID is required for cancellation");
  }

  // Find the order in the database
  const order = await Order.findOne({ order_id: orderId, userId });

  if (!order) {
    throw new ApiError(404, "Order not found or does not belong to the user");
  }

  // Check if the order is already refunded or ineligible for cancellation
  if (order.status === "refunded") {
    throw new ApiError(400, "Order is already refunded or canceled");
  }

  try {
    // Initiate a refund via Razorpay
    const refund = await razorpayInstance.payments.refund(
      order.razorpay_payment_id,
      {
        amount: order.amount * 100, // Refund amount in paisa
      }
    );

    // Update the order status in the database
    order.status = "refunded";
    order.refund_id = refund.id;
    order.refund_status = refund.status; // e.g., "processed", "failed"
    await order.save();

    res
      .status(200)
      .json(
        new ApiResponse(200, refund, "Order successfully canceled and refunded")
      );
  } catch (error) {
    console.log("Error: ", error);
    throw new ApiError(
      500,
      error.message || "Failed to process the refund with Razorpay"
    );
  }
});

//======👆End Payment Controller👆=============

export const getAllUserConfirmedOrder = asyncHandler(async (req, res) => {
  const userId = req.user.userId;

  const order = await Order.find({ userId })
    .populate("productId")
    .sort({ _id: -1 });

  if (!order) throw new ApiError(404, "Order not found");

  res.status(200).json(new ApiResponse(200, order, "Order Get Successfully"));
});

//************ Admin Controller***************** */
export const getAllAdminPlacedOrder = asyncHandler(async (req, res) => {
  const order = await Order.find({ status: { $ne: "refunded" } })
    .populate("productId")
    .sort({ _id: -1 });

  if (!order) throw new ApiError(404, "Order not found");

  res.status(200).json(new ApiResponse(200, order, "Order Get Successfully"));
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderId, status } = req.body;
  console.log(orderId, status);

  if (!mongoose.Types.ObjectId.isValid(orderId))
    throw new ApiError(404, "Invalid Order ID");
  if (!status) throw new ApiError(400, "Status is required");

  const order = await Order.findByIdAndUpdate(
    orderId,
    { status },
    { new: true, runValidators: true }
  );

  if (!order)
    throw new ApiError(404, "Order not found or does not belong to the admin");

  res
    .status(200)
    .json(new ApiResponse(200, order, "Order Status Updated Successfully"));
});
