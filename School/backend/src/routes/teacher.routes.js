import { Router } from "express"
import { addTeacher, addTimeTablesTeacher, getAllTeachers, getTeacherById } from "../controllers/teacher.controller.js";

const router = Router();

// Route definition
router.post("/add", addTeacher);
router.get("/get-all-teachers", getAllTeachers);
router.get("/get-teacher-byid/:teacherId", getTeacherById);
router.post("/add-time-table/:teacherId", addTimeTablesTeacher);

export default router