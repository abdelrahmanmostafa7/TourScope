import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from './routes/user.route.js'
import hotelRoute from './routes/hotel.route.js'
import roomRoute from './routes/room.route.js'
import authRoute from './routes/auth.route.js'
import reservationRoute from './routes/reservation.route.js'
import cookieParser from "cookie-parser";
import cors from "cors"
import passport from "passport";
import "./middleware/passport.js";
import session from "express-session";

// our app
const app = express()

// connection to DB
dotenv.config();
mongoose.set("strictQuery", true);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB...");
  } catch (error) {
    console.log(error);
  }
};

// middleware
app.use(express.json())
app.use(cookieParser())
app.use(session({
  secret:'keykeykey',
  resave:false,
  saveUninitialized: true,
  cookie:{ secure:false }
}) );
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE", credentials: true
}))

// routes 
app.use("/api/user", userRoute)
app.use("/api/hotel", hotelRoute)
app.use("/api/room", roomRoute)
app.use("/api/auth", authRoute)
app.use("/api/reservation", reservationRoute )

// error handling middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  // return res.status(errorStatus).send(errorMessage);
  return res.status(errorStatus).json({
    success:false,
    status:errorStatus,
    message:errorMessage,
    stack:err.stack
  })
})

//port&connection
app.listen(8800, () => {
  connect()
  console.log('Backend server is running...');
})