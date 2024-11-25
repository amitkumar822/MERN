import express from "express";
import {
  createOrder,
  verifyPayment,
} from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/checkout", createOrder);
router.post("/payment-verification", verifyPayment);

export default router;
