import { Router } from "express"
import { createLecture, getCourseLectureById } from "../controllers/lecture.controller.js";
import { isInstructorAuthenticated } from "../middlewares/authUser.js";

const router = Router();

// routes define
router.post("/create/:courseId/lecture", isInstructorAuthenticated, createLecture);
router.get("/get-lecture/:courseId/lecture", getCourseLectureById)


export default router;