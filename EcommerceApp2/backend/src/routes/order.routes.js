import express from "express";
import {
  cancelOrder,
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
router.post("/cancel-order",isAuthenticated, cancelOrder)

export default router;
