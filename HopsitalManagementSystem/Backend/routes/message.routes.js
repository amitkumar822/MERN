import express from "express";
import { getAllMessages, sendMessage } from "../controllers/message.controller.js";
import { isAdminAuthenticated, isPatientAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/send", sendMessage);
router.get("/get-all-message", isAdminAuthenticated, getAllMessages);

export default router;
