import express, { Router } from "express";
import { upload } from "../middlewares/multer.js";
import {
  deleteReview,
  dislikesReview,
  getAllReview,
  getSingleReview,
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
router.get("/get-review/:productId", getAllReview);
router.post("/likes/:reviewId", isAuthenticated, likesReview);
router.post("/dislikes/:reviewId", isAuthenticated, dislikesReview);
router.put(
  "/update/:reviewId",
  upload.single("photo"),
  isAuthenticated,
  UpdateOrEditReview
);
router.get("/get-single-review/:reviewId", isAuthenticated, getSingleReview);
router.delete("/delete/:reviewId", isAuthenticated, deleteReview);

export default router;
