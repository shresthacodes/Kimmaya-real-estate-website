import express from "express";
import { PrismaClient } from "@prisma/client";
import { createUser } from "../controllers/userController.js";
const prisma = new PrismaClient();
const router = express.Router();

router.post("/register", createUser);
export { router as userRoute };
