import express from "express";
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  addOrRemove,
  deleteRoomItem,
} from "../controllers/room.controller.js";
import roomModel from "../models/room.model.js";
import {checkRole,checkSupervisor} from "../middleware/adminJwt.js"

import hotelModel from "../models/hotel.model.js";
const router = express.Router();
import { verifyAdmin } from "../middleware/jwt.js";
//createRoom
router.post("/:hotelid",  checkSupervisor,createRoom);
//updateRoom
router.put("/update/:id",checkSupervisor, updateRoom);
//deleteRoom
router.delete("/:id/:hotelid",checkSupervisor, deleteRoom);
//getALLRoom
router.get("/finds/:id", getRooms);
//getRoom
router.get("/find/:id" , getRoom)

router.put("/update/:id", checkSupervisor,addOrRemove);
router.put("/deleteRoomItem/:id",checkSupervisor, deleteRoomItem);


export default router;
