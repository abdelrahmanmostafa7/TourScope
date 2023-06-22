import express from "express";
const router = express.Router();

import { createHotel, updateHotel, getHotel, getHotels, getFavHotels, getTopHotels, getHotelRooms, deleteHotelItem  } from "../controllers/hotel.controller.js";
import {verifyAdmin} from "../middleware/jwt.js"  

router.post("/",verifyAdmin, createHotel);
router.put("/update/:id", updateHotel);
router.put("/deleteHotelItem/:id", deleteHotelItem);
router.get("/find/:id", getHotel);
router.get("/favHotel/:id", getFavHotels);
router.get("/topHotels", getTopHotels);
router.get("/hotelRooms/:id", getHotelRooms);

router.get("/", getHotels);

export default router;