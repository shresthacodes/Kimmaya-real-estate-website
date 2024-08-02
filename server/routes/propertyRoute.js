import express from "express";
import { createProperty } from "../controllers/propertyController.js";
import { getAllProperties } from "../controllers/propertyController.js";

const router = express.Router();
router.post("/create", createProperty);
router.get("/allproperties", getAllProperties);

export { router as propertyRoute };
