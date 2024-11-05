import express from "express";
import { appointment, deleteAppointment, getAllAppointments, updateAppointmentStatus } from "../controllers/appointment.controller.js";
import { isAdminAuthenticated, isPatientAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/post", isPatientAuthenticated, appointment);
router.get("/get-all-appointments", isAdminAuthenticated, getAllAppointments);
router.put("/update/:id", isAdminAuthenticated, updateAppointmentStatus);
router.delete("/delete/:id", isAdminAuthenticated, deleteAppointment);

export default router;
