import { Router } from "express"
import { addTeacher, addTimeTablesTeacher, deleteTimeTablePeriod, getAllTeachers, getTeacherById, updateTimeTablePeriod } from "../controllers/teacher.controller.js";

const router = Router();

// Route definition
router.post("/add", addTeacher);
router.get("/get-all-teachers", getAllTeachers);
router.get("/get-teacher-byid/:teacherId", getTeacherById);
router.post("/add-time-table/:teacherId", addTimeTablesTeacher);
router.delete("/delete-timetable/:teacherId", deleteTimeTablePeriod);
router.put("/update-timetable/:teacherId", updateTimeTablePeriod);

export default router