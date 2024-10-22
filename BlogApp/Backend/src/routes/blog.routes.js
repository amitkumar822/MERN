import express, { Router } from "express";
import { createBlog } from "../controllers/blog.controller.js";
import { isAdmin, isAuthenticated } from "../middlewares/authUser.js";
import { deleteBlog } from "../controllers/blog.controller.js";
import { getAllBlogs } from "../controllers/blog.controller.js";

const router = Router();

// routes
router.route("/create").post(isAuthenticated, isAdmin("admin"), createBlog);
router.route("/delete/:id").delete(isAuthenticated, isAdmin("admin"), deleteBlog);
router.route("/get-all-blogs").get(isAuthenticated, getAllBlogs)

export default router;
