import express from "express";
import { login, patientRegister } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/patient/register", patientRegister);
router.post("/login", login);

export default router;
