import  express  from "express";
import limiter  from "../middleware/ratelimiter.js"
import {user_reservations,make_reservation , cancelled_reservation_status } from '../controllers/reservation.controller.js'
const route = express.Router();



//reservations routes

route.get("/my_reservation/:id",user_reservations)
route.put("/my_reservation/:id",cancelled_reservation_status)
route.post("/make_reservation",limiter,make_reservation)

export default route