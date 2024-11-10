import { Router } from "express";
import { uploadProduct } from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.js";

const router = Router();

// Define routes here
router.route("/upload").post(
  upload.fields([
    {
      name: "productImage",
      maxCount: 10,
      limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max limit
    },
  ]),
  uploadProduct
);

export default router;
