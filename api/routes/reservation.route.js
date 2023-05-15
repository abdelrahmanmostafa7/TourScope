import  express  from "express";
import {user_reservations,make_reservation , update_reservation_status} from '../controllers/reservation.controller.js'
const route = express.Router();

//reservations routes

route.get("/my_reservation/:id",user_reservations)
route.put("/my_reservation/:id",update_reservation_status)
route.post("/make_reservation",make_reservation)

export default route