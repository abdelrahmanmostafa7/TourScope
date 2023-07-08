import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";
import Hotel from "../models/hotel.model.js";

export const checkRole = async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return next(createError(401, "You are not authenticated!"));

  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) return next(createError(403, "Token is not valid!"));

    if (payload.role !== "supervisor" && payload.role !== "moderator") {
      res.status(200).send("You are not authenticated!");
    }
    const hotelID = req.body.hotelId;
    // console.log(hotelID);
    if (hotelID) {
      const hotel = await Hotel.findById(hotelID);

      if (!hotel) {
        return next(createError(403, "You Are Not authenticated!"));
      }
      if (!hotel.admin.includes(payload.id)) {
        return next(createError(403, "You Are Not authenticated!"));
      }
      console.log(hotelID, "if");
    } else {
      const hotel = await Hotel.findById(req.params.id);

      if (!hotel) {
        return next(createError(403, "You Are Not authenticated!"));
      }
      if (!hotel.admin.includes(payload.id)) {
        return next(createError(403, "You Are Not authenticated!"));
      }
      console.log(req.params.id, "else");
    }
    next();
  });
};

export const checkSupervisor = async (req, res, next) => {
  const token = req.cookies.accessToken;

  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) return next(createError(403, "Token is not valid!"));

    const role = payload.role;
    if (role !== "supervisor") {
      next(createError(403, "ٌRole is not Authorized!"));
    }

    next();
  });
};

export const checkModerator = async (req, res, next) => {
  const token = req.cookies.accessToken;

  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) return next(createError(403, "Token is not valid!"));

    const role = payload.role;
    if (role !== "moderator") {
      next(createError(403, "ٌRole is not Authorized!"));
    }
    next();
  });
};
