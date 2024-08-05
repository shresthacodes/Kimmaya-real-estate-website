import express from "express";
import { createProperty } from "../controllers/propertyController.js";
import { getAllProperties } from "../controllers/propertyController.js";
import { getProperty } from "../controllers/propertyController.js";
import jwtCheck from "../config/auth0Config.js";
const router = express.Router();
router.post("/create", jwtCheck, createProperty);
router.get("/allproperties", getAllProperties);
router.get("/:id", getProperty);

export { router as propertyRoute };
