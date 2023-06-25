import express from "express";
const router = express.Router();

import { createHotel, updateHotel, dashboard,deleteHotel,deleteuser,modifiyrole, getHotel, addnewuser,getHotels, getFavHotels,getTopHotels,userstatus  } from "../controllers/hotel.controller.js";
import {verifyAdmin} from "../middleware/jwt.js"  

router.post("/",verifyAdmin, createHotel);
router.put("/update/:id",updateHotel);
router.delete("/:id",verifyAdmin,  deleteHotel);
router.get("/find/:id", getHotel);
router.get("/favHotel/:id", getFavHotels);
router.get("/topHotels", getTopHotels);
router.get("/", getHotels);

//admin routes 
router.get("/userstatus/:id" , userstatus)
router.post("/userstatus/newuser/:id" , addnewuser)
router.post("/userstatus/delete/:id" , deleteuser)
router.post("/userstatus/modifiy/:id" , modifiyrole)
router.get("/dashboard/:id/",dashboard)





export default router;