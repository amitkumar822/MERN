import express, { Router } from "express";
import { createBlog, deleteBlog, getAllBlogs, getMyBlog, getSingleBlog, updateBlog } from "../controllers/blog.controller.js";
import { isAdmin, isAuthenticated } from "../middlewares/authUser.js";

const router = Router();

// routes
router.route("/create").post(isAuthenticated, isAdmin("admin"), createBlog);
router.route("/delete/:id").delete(isAuthenticated, isAdmin("admin"), deleteBlog);
router.route("/get-all-blogs").get(isAuthenticated, getAllBlogs);
router.route("/get-single-blog/:id").get(isAuthenticated, getSingleBlog);
router.route("/get-my-blog").get(isAuthenticated, isAdmin("admin"), getMyBlog);
router.route("/update-blog/:id").put(isAuthenticated, isAdmin("admin"), updateBlog);

export default router;
