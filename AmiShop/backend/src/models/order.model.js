import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    productId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    quantity: [
      {
        type: Number,
        min: [1, "Quantity must be greater than 0"],
      },
    ],
    amount: {
      type: Number,
      min: [0, "Amount must be greater than 0"],
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
    status: {
      type: String,
      enum: [
        "refunded",
        "pending",
        "confirmed",
        "canceled",
        "shipped",
        "delivered",
      ],
      default: "pending",
    },
    mobile: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    pincode: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please Enter A Valid Email",
      ],
    },
    name: {
      type: String,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    paymentMethod: {
      type: String,
      enum: ["cod", "online"],
      default: "cod",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
