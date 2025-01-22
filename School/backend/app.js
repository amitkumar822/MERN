import express from 'express';
import cors from "cors";
import errorHandler from './src/middlewares/errorHandler.js';

const app = express();

app.use(cors({
    origin: process.env.MONGODB_URI,
    credentials: true
}))

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({ extended: true ,limit: "16kb" }));

// import all routes from here
import studentRoutes from "./src/routes/student.routes.js"
import attendanceRoutes from "./src/routes/attendance.routes.js"


// define routes
app.use("/api/v1/students", studentRoutes);
app.use("/api/v1/attendance", attendanceRoutes);

app.use(errorHandler);
export {app}