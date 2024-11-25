import crypto from "crypto";
import Order from "../models/order.model.js";
import { razorpayInstance } from "../../utils/razorpay.js";

export const createOrder = async (req, res) => {
  const { productName, amount } = req.body;

  try {
    if (!productName || !amount) {
      return res
        .status(400)
        .json({ msg: "Product name and amount are required" });
    }

    const order = await razorpayInstance.orders.create({
      amount: Number(amount * 100),
      currency: "INR",
    });

    await Order.create({
      order_id: order.id,
      productName,
      amount,
    });

    res.status(200).json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

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
      res.redirect(
        `http://localhost:5173/success?payment_id=${razorpay_payment_id}`
      );
    } else {
      res.redirect("http://localhost:5173/failed");
    }
  } catch (error) {
    console.error("Error during payment verification:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
