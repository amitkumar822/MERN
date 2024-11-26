import express from "express";
import { shippingAddress } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/shipping-address", shippingAddress);

export default router;
