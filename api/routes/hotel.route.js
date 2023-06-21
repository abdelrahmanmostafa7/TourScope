import express from "express";
const router = express.Router();

import { createHotel, updateHotel, deleteHotel, getHotel, getHotels, getFavHotels, getTopHotels, getHotelRooms  } from "../controllers/hotel.controller.js";
import {verifyAdmin} from "../middleware/jwt.js"  

router.post("/",verifyAdmin, createHotel);
router.put("/update/:id",updateHotel);
router.delete("/:id",verifyAdmin,  deleteHotel);
router.get("/find/:id", getHotel);
router.get("/favHotel/:id", getFavHotels);
router.get("/topHotels", getTopHotels);
router.get("/hotelRooms/:id", getHotelRooms);

router.get("/", getHotels);

export default router;