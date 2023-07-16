import express from "express";
const router = express.Router();

import { createHotel, updateHotel, dashboard, deleteHotelItem, deleteuser, modifiyrole, getHotel, addnewuser, getHotels, getFavHotels, getTopHotels, userstatus, getHotelRooms } from "../controllers/hotel.controller.js";
import {verifyAdmin,verifyUser} from "../middleware/jwt.js"  
import {checkRole,checkSupervisor} from "../middleware/adminJwt.js" 
router.post("/", createHotel);
router.put("/update/:id",checkRole,checkSupervisor, updateHotel);
router.put("/deleteHotelItem/:id",checkRole,checkSupervisor, deleteHotelItem);
router.get("/find/:id", getHotel);
router.get("/favHotel/:id",verifyUser, getFavHotels);
router.get("/topHotels", getTopHotels);
router.get("/", getHotels);



//admin routes 
router.get("/userstatus/:id" ,checkRole,checkSupervisor, userstatus)
router.post("/userstatus/newuser/:id"  ,checkRole,checkSupervisor, addnewuser)
router.post("/userstatus/delete/:id"  ,checkSupervisor, deleteuser)
router.post("/userstatus/modifiy/:id"  ,checkSupervisor, modifiyrole)
router.get("/dashboard/:id/" ,checkRole,dashboard)
router.get("/hotelRooms/:id",checkRole, getHotelRooms);






export default router;