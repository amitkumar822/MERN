import express from "express";
import {
  createOrder,
  getRazorpayKey,
  verifyPayment,
} from "../controllers/payment.controller.js";
import { isAuthenticated } from "../middlewares/userAuth.js";

const router = express.Router();

router.post("/checkout",isAuthenticated, createOrder);
router.post("/payment-verification",isAuthenticated, verifyPayment);
router.get("/razorpay-key",isAuthenticated, getRazorpayKey);

export default router;
