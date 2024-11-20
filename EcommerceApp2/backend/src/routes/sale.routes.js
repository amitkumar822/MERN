import express from "express";
import { getSaleTimer } from "../controllers/sale.controller.js";

const router = express.Router();

router.get("/sale-timer", getSaleTimer);

export default router;
