import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUserDetails,
  logOut,
  getAllUsers,
  updateUser,
  deleteUser,
  addToCart,
  countAddToCart,
  addToCartViewProduct,
  deleteAddToCartProduct,
  updateIncreaseDescreaseAddToCartProduct,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/userAuth.js";
import { upload } from "../middlewares/multer.js";
import { isAdminAuth } from "../middlewares/adminAuth.js";

const router = Router();

router.post(
  "/register",
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
      // limits: { fileSize: 10 * 1024 * 1024 },
    },
  ]),
  registerUser
);
router.post("/login", loginUser);
router.post("/logout", isAuthenticated, logOut);

// Admin Panel routes
router.get("/get-user-details", isAuthenticated, getUserDetails);
router.get("/get-all-users", isAuthenticated, getAllUsers);
router.post("/update-user-details/:id", isAdminAuth, isAuthenticated, updateUser);
router.delete("/delete-user/:id", isAdminAuth, isAuthenticated, deleteUser);

// Add To Cart
router.post("/addtocart", isAuthenticated, addToCart);
router.get("/getaddtocart", isAuthenticated, countAddToCart);
router.get("/view-addtocart", isAuthenticated, addToCartViewProduct);
router.post("/update-addtocart", isAuthenticated, updateIncreaseDescreaseAddToCartProduct);
router.post("/delete-addtocart", isAuthenticated, deleteAddToCartProduct);


export default router;
