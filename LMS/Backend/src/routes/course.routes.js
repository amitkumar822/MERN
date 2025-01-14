import { Router } from "express"
import { isInstructorAuthenticated } from "../middlewares/authUser.js";
import { createCourse } from "../controllers/course.controller.js";

const router = Router();

router.post("/create", isInstructorAuthenticated, createCourse);

export default router;
