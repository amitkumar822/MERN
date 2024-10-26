import express, { Router } from "express";
import { deleteUser, getAdmin,
     getMyProfile, 
     loginUser, 
     logoutUser, 
     registerUser 
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/authUser.js";

const router = Router();

// routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(isAuthenticated, logoutUser);
router.route("/get-my-profile").get(isAuthenticated, getMyProfile);
router.route("/get-admin").get(getAdmin);
router.route("/user-delete/:id").delete(isAuthenticated, deleteUser);

export default router;
