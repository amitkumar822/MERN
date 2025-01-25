import { Router } from "express";
import {
  addStudentFromClassWise,
  addSubjectsFromClassWise,
  addTimeTableFromClassWise,
  createClass,
  getAllClasses,
  getClassById,
  removeStudentFromClassWise,
  removeSubjectsFromClassWise,
  removeTimeSlotSameDaysWise,
  removeTimeTableSlotDayPeriodWise,
} from "../controllers/class.controller.js";

const router = Router();

// Router defined
router.post("/create", createClass);
router.get("/get-all-class", getAllClasses);
router.get("/get-class-byid/:classId", getClassById);
router.put("/add-student/:classId", addStudentFromClassWise);
router.delete("/remove-student/:classId", removeStudentFromClassWise);
router.put("/add-subjects/:classId", addSubjectsFromClassWise);
router.delete("/remove-subject/:classId", removeSubjectsFromClassWise);
router.put("/add-time-table/:classId", addTimeTableFromClassWise);
router.delete("/remove-time-day-period-slot/:classId", removeTimeTableSlotDayPeriodWise);
router.delete("/remove-time-same-day-slot/:classId", removeTimeSlotSameDaysWise);

export default router;
