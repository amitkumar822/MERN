import { Router } from "express"
import { isInstructorAuthenticated } from "../middlewares/authUser.js";
import { createCourse, editCourse, getAllCourses, getCourseById } from "../controllers/course.controller.js";
import upload from "../../utils/multer.js";


const router = Router();

router.post("/create", isInstructorAuthenticated, createCourse);
router.get("/get-courses", isInstructorAuthenticated, getAllCourses);
router.get("/get-course-by-id/:courseId", isInstructorAuthenticated, getCourseById);
router.put("/edit-course/:courseId", isInstructorAuthenticated, upload.single("courseThumbnail"), editCourse);

export default router;
