import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import { userRoute } from "./routes/userRoutes.js";
import { propertyRoute } from "./routes/propertyRoute.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.use("/api/user", userRoute);
app.use("/api/property", propertyRoute);
