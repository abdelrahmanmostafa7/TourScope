import express from "express";
const router = express.Router();

import { createHotel, updateHotel, deleteHotel, getHotel, getHotels, getFavHotels  } from "../controllers/hotel.controller.js";
import {verifyAdmin} from "../middleware/jwt.js"  

router.post("/",verifyAdmin, createHotel);
router.put("/:id",verifyAdmin,updateHotel);
router.delete("/:id",verifyAdmin,  deleteHotel);
router.get("/find/:id", getHotel);
router.get("/favHotel/:id", getFavHotels);

router.get("/", getHotels);

export default router;