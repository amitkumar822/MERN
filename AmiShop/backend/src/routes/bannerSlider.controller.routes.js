import { Router } from "express";
import {
  bannerUpload,
  deleteBanner,
  getAllBanners,
  getBannerById,
} from "../controllers/bannerSlider.controller.js";
import { upload } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/userAuth.js";
import { isAdminAuth } from "../middlewares/adminAuth.js";

// Define routes here
const router = Router();

router.post(
  "/upload",
  isAuthenticated, // Only authenticated users can upload banners
  isAdminAuth, // Only admin users can upload banners
  upload.single("bannerImg"),
  bannerUpload
);
router.get("/get-banner", getAllBanners);
router.delete("/delete/:bannerId", deleteBanner);

//TODO: Testing owner (populate functionality)
router.get("/get-banner-by-id/:bannerId", getBannerById);

export default router;
