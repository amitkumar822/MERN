import { Router } from "express";
import { addStudent, getAllStudents } from "../controllers/student.controller.js";

const router = Router();

// Route defin
router.post("/add", addStudent);
router.get("/get-all-students", getAllStudents);

export default router;