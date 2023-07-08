import  express  from "express";
import limiter  from "../middleware/ratelimiter.js"
import {verifyUser} from "../middleware/jwt.js"
import {checkRole,checkSupervisor} from "../middleware/adminJwt.js"

import {user_reservations,make_reservation ,admin_reservation, hotelReservations,cancel_Reservation } from '../controllers/reservation.controller.js'
const route = express.Router();



//reservations routes

route.get("/my_reservation/:id",verifyUser,user_reservations)
route.put("/my_reservation/:_id",verifyUser,cancel_Reservation)

route.post("/make_reservation",verifyUser,limiter,make_reservation)

// admin 
route.get("/hotelReservations/:id",checkRole,hotelReservations)
route.put("/admin_resevation/:_id",checkRole,admin_reservation)



export default route