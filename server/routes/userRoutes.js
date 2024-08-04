import express from "express";
import {
  createUser,
  bookVisit,
  getAllBookings,
  cancelBooking,
  toFav,
  getAllFavorites,
} from "../controllers/userController.js";
import jwtCheck from "../config/auth0Config.js";
const router = express.Router();

router.post("/register", jwtCheck, createUser);
router.post("/bookVisit/:id", bookVisit);
router.post("/getBookings", getAllBookings);
router.post("/removeBooking/:id", cancelBooking);
router.post("/toFav/:ptid", toFav);
router.post("/allFav", getAllFavorites);
export { router as userRoute };
