import express from "express";
import {
  cancelOrder,
  createOrder,
  getAllAdminPlacedOrder,
  getAllUserConfirmedOrder,
  getRazorpayKey,
  updateOrderStatus,
  verifyPayment,
} from "../controllers/order.controller.js";
import { isAuthenticated } from "../middlewares/userAuth.js";
import { isAdminAuth } from "../middlewares/adminAuth.js";

const router = express.Router();

//! Payment Router 
router.post("/checkout",isAuthenticated, createOrder);
router.post("/payment-verification",isAuthenticated, verifyPayment);
router.get("/razorpay-key",isAuthenticated, getRazorpayKey);

//******* Order Router ****************
router.get("/get-all-confirmed-order",isAuthenticated, getAllUserConfirmedOrder);
router.post("/cancel-order",isAuthenticated, cancelOrder);

//***********ADMIN Router*********************
router.get("/get-admin-all-order",isAuthenticated, isAdminAuth, getAllAdminPlacedOrder);
router.post("/update-status",isAuthenticated, isAdminAuth, updateOrderStatus);

export default router;