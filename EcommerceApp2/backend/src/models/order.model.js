import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
    },
    ammount: {
      type: Number,
    },
    order_id: {
      type: String,
    },
    razorpay_payment_id: {
      type: String,
      default: null,
    },
    razorpay_order_id: {
      type: String,
      default: null,
    },
    razorpay_signature: {
      type: String,
      default: null,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timeseries: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
