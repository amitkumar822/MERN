import express, { Router } from "express";
import { upload } from "../middlewares/multer.js";
import {
  deleteReview,
  dislikesReview,
  getReview,
  getTopRatedReviews,
  likesReview,
  UpdateOrEditReview,
  writeReview,
} from "../controllers/review.controller.js";
import { isAuthenticated } from "../middlewares/userAuth.js";
import { isAdminAuth } from "../middlewares/adminAuth.js";

const router = new Router();

router.post(
  "/write-reviews/:productId",
  upload.single("photo"),
  isAuthenticated,
  writeReview
);
router.get("/get-review/:productId", getReview);
router.post("/likes/:reviewId", isAuthenticated, likesReview);
router.post("/dislikes/:reviewId", isAuthenticated, dislikesReview);
router.put("/update/:reviewId", isAuthenticated, UpdateOrEditReview);
router.delete("/delete/:reviewId", isAuthenticated, deleteReview);

// TODO: This route current not used
router.get("/get-top-rated-reviews/:productId", getTopRatedReviews);

export default router;
