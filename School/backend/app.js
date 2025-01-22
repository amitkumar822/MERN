import express from "express";
import cors from "cors";
import errorHandler from "./src/middlewares/errorHandler.js";

const app = express();

app.use(
  cors({
    origin: process.env.MONGODB_URI,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// import all routes from here
import studentRoutes from "./src/routes/student.routes.js";
import attendanceRoutes from "./src/routes/attendance.routes.js";
import teacherRoutes from "./src/routes/teacher.routes.js";
import classRoutes from "./src/routes/class.routes.js";
import staffRoutes from "./src/routes/staff.routes.js";
import vehicleRoutes from "./src/routes/vehicle.routes.js";

// define routes
app.use("/api/v1/students", studentRoutes);
app.use("/api/v1/attendance", attendanceRoutes);
app.use("/api/v1/teacher", teacherRoutes);
app.use("/api/v1/class", classRoutes);
app.use("/api/v1/staff", staffRoutes);
app.use("/api/v1/vehicle", vehicleRoutes);

app.use(errorHandler);
export { app };
