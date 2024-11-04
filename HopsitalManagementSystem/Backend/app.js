import express from "express";
import { config } from "dotenv";

const app = express();
config({ path: "./config/config.env" });

// middleware

export default app;
