import express, { Router } from "express";
import { getReview, writeReview } from "../controllers/review.controller.js";
import { isAuthenticated } from "../middlewares/userAuth.js";
import { isAdminAuth } from "../middlewares/adminAuth.js";

const router = new Router();

router.post("/write-reviews", isAuthenticated, writeReview);
router.get("/get-review/:productId", getReview);

export default router;
