import rateLimit from "express-rate-limit";
import createError from "../utils/createError.js";



const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Max 5 requests per hour
  message: "Too many requests from this IP, please try again later.",
  handler: (req, res, next) => {
    return next(createError(403, "Too many reservations from this IP, please try again later."));
  },
});

export default limiter;
