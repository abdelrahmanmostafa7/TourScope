import express from "express";
const router = express.Router();

import { createHotel, updateHotel, dashboard, deleteHotelItem, deleteuser, modifiyrole, getHotel, addnewuser, getHotels, getFavHotels, getTopHotels, userstatus, getHotelRooms } from "../controllers/hotel.controller.js";
import {verifyAdmin,verifyUser} from "../middleware/jwt.js"  

router.post("/", createHotel);
router.put("/update/:id", updateHotel);
router.put("/deleteHotelItem/:id", deleteHotelItem);
router.get("/find/:id", getHotel);
router.get("/favHotel/:id",verifyUser, getFavHotels);
router.get("/topHotels", getTopHotels);
router.get("/", getHotels);
router.get("/hotelRooms/:id", getHotelRooms);



//admin routes 
router.get("/userstatus/:id" , userstatus)
router.post("/userstatus/newuser/:id" , addnewuser)
router.post("/userstatus/delete/:id" , deleteuser)
router.post("/userstatus/modifiy/:id" , modifiyrole)
router.get("/dashboard/:id/",dashboard)





export default router;