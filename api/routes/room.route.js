import express from "express";
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
} from "../controllers/room.controller.js";
import roomModel from "../models/room.model.js";
import hotelModel from "../models/hotel.model.js";
const router = express.Router();
import { verifyAdmin } from "../middleware/jwt.js";
//createRoom
router.post("/:hotelid",  createRoom);
//updateRoom
router.put("/:id", verifyAdmin, updateRoom);
//deleteRoom
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);
//getRoom
router.get("/finds/:id", getRooms);
//getRoom
router.get("/find/:id" , getRoom)

export default router;

  // //=================================================
  //   const rooms = await roomModel.find();
  //   for (const room of rooms) {
  //     const hotel = await hotelModel.findOne({ hotelName: room.hotelName });
  //     await roomModel.updateOne(
  //       { _id: room._id },
  //       { $set: { hotelId: hotel.id } }
  //     );
  // } 
  // console.log("Rooms updated successfully");
  // //===================================================
  // u have 10 rooms each room have hotel name we need to give each room the hotel id which match hotel name