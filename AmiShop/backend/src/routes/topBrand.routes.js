import { Router } from "express";
import { upload } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/userAuth.js";
import { isAdminAuth } from "../middlewares/adminAuth.js";
import {
  deleteTopBrand,
  getAllTopBrand,
  topBrandUpload,
} from "../controllers/topBrand.controller.js";

// Define routes here
const router = Router();

router.post(
  "/upload",
  isAuthenticated, // Only authenticated users can upload banners
  isAdminAuth, // Only admin users can upload banners
  upload.single("bannerImg"),
  topBrandUpload
);
router.get("/get-top-brand", getAllTopBrand);
router.delete("/delete/:bannerId", deleteTopBrand);

export default router;
