import { Router } from "express";
import { createAttendance, getAllAttendance, getAttendanceDayMonthYearWise } from "../controllers/attendance.controller.js";

const router = Router();

// Route defin
router.post("/create/:studentId", createAttendance);
router.get("/get-all-attendance", getAllAttendance);
router.get("/get-all-attendance-daymonthyear", getAttendanceDayMonthYearWise);

export default router;