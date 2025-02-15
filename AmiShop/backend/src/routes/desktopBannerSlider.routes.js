import { Router } from "express";
import { upload } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/userAuth.js";
import { isAdminAuth } from "../middlewares/adminAuth.js";
import { deleteDesktopBanner, desktopBannerUpload, getAllDesktopBanners, getDesktopBannerById } from "../controllers/desktopBannerSlider.controller.js";

// Define routes here
const router = Router();

router.post(
  "/upload",
  isAuthenticated, // Only authenticated users can upload banners
  isAdminAuth, // Only admin users can upload banners
  upload.single("bannerImg"),
  desktopBannerUpload
);
router.get("/get-banner", getAllDesktopBanners);
router.delete("/delete/:bannerId", deleteDesktopBanner);

//TODO: Testing owner (populate functionality)
router.get("/get-banner-by-id/:bannerId", getDesktopBannerById);

export default router;
