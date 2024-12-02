import express, { Router } from "express";
import {
  dislikesReview,
  getReview,
  likesReview,
  writeReview,
} from "../controllers/review.controller.js";
import { isAuthenticated } from "../middlewares/userAuth.js";
import { isAdminAuth } from "../middlewares/adminAuth.js";

const router = new Router();

router.post("/write-reviews/:productId", isAuthenticated, writeReview);
router.get("/get-review/:productId", getReview);
router.post("/likes/:reviewId", isAuthenticated, likesReview);
router.post("/dislikes/:reviewId", isAuthenticated, dislikesReview);

export default router;
