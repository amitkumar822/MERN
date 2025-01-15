import { Router } from "express"
import { isInstructorAuthenticated } from "../middlewares/authUser.js";
import { createCourse, getAllCourses } from "../controllers/course.controller.js";

const router = Router();

router.post("/create", isInstructorAuthenticated, createCourse);
router.get("/get-courses", isInstructorAuthenticated, getAllCourses);

export default router;
