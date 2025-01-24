import { Router } from "express"
import { addStudentInClassWise, addSubjectsInClassWise, createClass, getAllClasses, getClassById } from "../controllers/class.controller.js";

const router = Router();

// Router defined
router.post('/create', createClass);
router.get('/get-all-class', getAllClasses);
router.get('/get-class-byid/:classId', getClassById);
router.put('/add-student', addStudentInClassWise);
router.put('/add-subjects/:classId', addSubjectsInClassWise);

export default router