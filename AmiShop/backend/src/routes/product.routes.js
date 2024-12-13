import { Router } from "express";
import {
  bestSellingProduct,
  deleteOnlyCloudinaryImage,
  deletePhotoOnCloudinary,
  deleteProduct,
  filterProduct,
  getAllProducts,
  getCategoryByProducts,
  getCategoryNameWiseProducts,
  getProductDetailsByProductId,
  likeProduct,
  searchProduct,
  updateProduct,
  uploadProduct,
} from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/userAuth.js";
import { isAdminAuth } from "../middlewares/adminAuth.js";

const router = Router();

// Define routes here
router.route("/upload").post(
  isAuthenticated,
  isAdminAuth,
  upload.fields([
    {
      name: "productImage",
      maxCount: 5,
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max limit
    },
  ]),
  uploadProduct
);
router.route("/delete/:id").delete(isAuthenticated, isAdminAuth, deleteProduct);
router.route("/get-products").get(getAllProducts);
router.route("/update/:id").post(
  isAuthenticated,
  isAdminAuth,
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
router.route("/get-category-product").get(getCategoryByProducts);
router.route("/get-category-namewise-product").post(getCategoryNameWiseProducts);
router.route("/getproduct-details-byid/:productId").get(getProductDetailsByProductId);

router.route("/search").get(searchProduct);
router.route("/filter").post(filterProduct);
router.route("/like/:productId").post(isAuthenticated, likeProduct);

// only delete products image on cloudinary for testing purposes
router.delete("/delete-image-cloudinary/:publicId", deleteOnlyCloudinaryImage);

//********** Main Screen API **********
router.route("/best-selling-product").get(bestSellingProduct);

export default router;

