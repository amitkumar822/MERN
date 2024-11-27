import express from "express";
import {
  createOrder,
  getAllConfirmedOrder,
  getRazorpayKey,
  verifyPayment,
} from "../controllers/order.controller.js";
import { isAuthenticated } from "../middlewares/userAuth.js";

const router = express.Router();

//! Payment Router 
router.post("/checkout",isAuthenticated, createOrder);
router.post("/payment-verification",isAuthenticated, verifyPayment);
router.get("/razorpay-key",isAuthenticated, getRazorpayKey);

//******* Order Router ****************
router.get("/get-all-confirmed-order",isAuthenticated, getAllConfirmedOrder)

export default router;
