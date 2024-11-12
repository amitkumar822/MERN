import { Router } from "express";
import { bannerUpload, getAllBanners } from "../controllers/bannerSlider.controller.js";
import { upload } from "../middlewares/multer.js";

const router = Router();

router.post(
  "/upload",
  upload.fields([
    {
      name: "bannerImg",
      maxCount: 5,
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max limit for each banner image
    },
  ]),
  bannerUpload
);
router.get("/get-banner", getAllBanners)

export default router;
