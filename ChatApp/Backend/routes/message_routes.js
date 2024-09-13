import express from "express";
import { getMessages, sendMessage } from "../controllers/message_controller.js";
import secureRoute from "../middlewares/secureRoute.js";

const router = express.Router();
router.post("/send/:id", secureRoute, sendMessage);
router.get("/get/:id", secureRoute, getMessages);

export default router;
