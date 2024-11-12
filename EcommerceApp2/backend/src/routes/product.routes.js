import { Router } from "express";
import {
  deleteOnlyCloudinaryImage,
  deletePhotoOnCloudinary,
  deleteProduct,
  getAllProducts,
  getCategoryByProducts,
  updateProduct,
  uploadProduct,
} from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.js";

const router = Router();

// Define routes here
router.route("/upload").post(
  upload.fields([
    {
      name: "productImage",
      maxCount: 5,
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max limit
    },
  ]),
  uploadProduct
);
router.route("/delete/:id").delete(deleteProduct);
router.route("/get-products").get(getAllProducts);
router.route("/update/:id").post(
  upload.fields([
    {
      name: "productImage",
      maxCount: 5,
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max limit
    },
  ]),
  updateProduct
);
router
  .route("/delete-product-img/:productId/image/:publicId")
  .delete(deletePhotoOnCloudinary);
router.route("/get-category-product").get(getCategoryByProducts)


// only delete products image on cloudinary for testing purposes
router.delete("/delete-image-cloudinary/:publicId", deleteOnlyCloudinaryImage)
export default router;
