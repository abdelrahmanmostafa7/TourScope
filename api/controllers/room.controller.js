import Room from "../models/room.model.js";
import Hotel from "../models/hotel.model.js";

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};

export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates,
        },
      }
    );
    res.status(200).json("Room status has been updated.");
  } catch (err) {
    next(err);
  }
};

export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Room has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find({ hotel_id: req.params.id }).select(
      "price name size images"
    );
    res.status(201).send(rooms);
  } catch (err) {
    next(err);
  }
};

export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);

    res.status(201).send(room);
  } catch (err) {
    next(err);
  }
};


export const addOrRemove = async (req, res, next) => {
  const roomId = req.params.id;
  const facilities = req.body.facilities;
  try {
    // Find the room by ID
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    // Loop through the facilities array and add or remove each facility
    for (let i = 0; i < facilities.length; i++) {
      const facility = facilities[i];
      const alreadyAdded = room.facilities.includes(facility);
      if (alreadyAdded) {
        // Remove the facility from the room's list of facilities
        room.facilities = room.facilities.filter((f) => f !== facility);
      } else {
        // Add the facility to the room's list of facilities
        room.facilities.push(facility);
      }
    }
    // Save the updated room to the database
    await room.save();
    res.json(room.facilities);
  } catch (err) {
    next(err);
  }
};



