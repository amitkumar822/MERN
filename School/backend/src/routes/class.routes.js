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

export default router;
