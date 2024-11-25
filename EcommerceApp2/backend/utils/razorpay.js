import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();

export const razorpayInstance = new Razorpay({
  key_id: process.env.razorpay_key_id,
  key_secret: process.env.razorpay_key_secret,
});
