import Hotel from "../models/hotel.model.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";
//CREATE
export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body);
    try {
        const saveHotel = await newHotel.save();
        res.status(200).json(saveHotel);
    } catch (err) {
        next(err);
    }
};

//UPDATE
// export const updateHotel = async (req, res, next) => {
//     try {
//         const updatedHotel = await Hotel.findByIdAndUpdate(
//             req.params.id,
//             { $set: req.body },
//             { new: true }
//         );
//         res.status(200).json(updatedHotel);
//     } catch (err) {
//         next(err);
//     }
// };

// export const updateHotel = async (req, res, next) => {
//     try {
//         const { collection, id } = req.params;
//         const updatedData = await mongoose.model(collection).findByIdAndUpdate(
//             id,
//             { $set: req.body },
//             { new: true }
//         );
//         res.status(200).json(updatedData);
//     } catch (err) {
//         next(err);
//     }
// };

export const updateHotel = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { images } = req.body;
        const updatedHotel = await Hotel.findByIdAndUpdate(
            id,
            { $set: { images } },
            { new: true }
        );
        res.status(200).json(updatedHotel);
    } catch (err) {
        next(err);
    }
};
//DELETE
export const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted");
    } catch (err) {
        next(err);
    }
};

//GET
// export const getHotel = async (req, res, next) => {
//     const { min, max, city, startdate, enddate, roomsoption, } = req.query;
//     try {
//         const hotel = await Hotel.findById(req.params.id).populate('rooms').select('_id name address distanceFromCityCenter amenities rating price images description rooms');

//         res.status(201).send(hotel)

//     } catch (err) {
//         next(err);
//     }
// };

//GET
export const getHotel = async (req, res, next) => {
    const { startdate, enddate, roomsoption, } = req.query;
    try {
        const currentDate = new Date()
        currentDate.setHours(currentDate.getHours() + 1)
        const roomoptions = JSON.parse(roomsoption ?? '[]');
        const sumOfAdults = roomoptions.reduce((total, room) => {
            return total + room.adult;
        }, 0);
        const hotelId = new mongoose.Types.ObjectId(req.params.id);
        await Hotel.aggregate([
            {
                $match: {
                    _id: hotelId

                },
            },
            {
                $lookup: {
                    from: "rooms",
                    localField: "rooms",
                    foreignField: "_id",
                    as: "rooms",
                },
            },
            {
                $unwind: "$rooms",
            },

            {
                $group: {
                    _id: "$_id",
                    name: { $first: "$name" },
                    address: { $first: "$address" },
                    country: { $first: "$country" },
                    city: { $first: "$city" },
                    description: { $first: "$description" },
                    price: { $first: "$price" },
                    rating: { $first: "$rating" },
                    images: { $first: "$images" },
                    amenities: { $first: "$amenities" },
                    distanceFromCityCenter: { $first: "$distanceFromCityCenter" },
                    checkInout: { $first: "$checkInout" },
                    rooms: { $push: "$rooms" },
                },
            },
        ]).then((hotel_res) => {
            const user_startDate = new Date(startdate)
            const user_endDate = new Date(enddate)
            const timeDiff = Math.abs(user_endDate.getTime() - user_startDate.getTime());
            const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            user_startDate.setHours(24)
            user_endDate.setHours(24)
            const updatedRooms = hotel_res[0].rooms.map((room) => {
                const updatedAvailability = room.room_availability.filter((ro) => {
                    const availableDates = ro.unavailableDates.filter((date) => {
                        if (!(user_startDate >= date.startDate && user_startDate < date.endDate ||
                            user_endDate <= date.endDate && user_endDate > date.startDate ||
                            user_startDate < date.startDate && user_endDate >= date.endDate ||
                            user_startDate < date.startDate && user_endDate >= date.endDate

                        )) {
                            return date
                        }
                    });

                    if (availableDates.length > 0) {
                        ro.unavailableDates = availableDates;
                        return true;
                    }
                });
                if (updatedAvailability.length > 0) {
                    let deal = { roomscount: 0 };
                    let n = 1;
                    do {

                        if (room.maxpeople * n >= sumOfAdults) {
                            if (n <= updatedAvailability.length) {
                                deal.roomscount = n
                                deal.price = n * room.price
                                break;

                            } else {
                                deal.roomscount = []
                                break;

                            }
                        }
                        n++;
                    } while (true);

                    delete room.room_availability
                    return { ...room, deal };

                } else {
                    return { ...room, room_availability: [] };
                }
            });
            hotel_res[0].rooms = updatedRooms;
            const obj = hotel_res[0]
            res.status(200).send(obj)
        });
        //res.status(201).send(hotel)
    } catch (err) {
        next(err);
    }
};


// Get fav Hotels
export const getFavHotels = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).populate('favoriteList').select("favoriteList");
        res.status(200).send(user);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
//GETTop ALL
export const getTopHotels = async (req, res, next) => {
    try {
        const hotels = await Hotel.find(req.query).limit(req.query.limit);
        res.status(200).json(hotels);
    } catch (err) {
        next(err);
    }
};


// GET ALL
export const getHotels = async (req, res, next) => {
    const { min, max, city, startdate, enddate, roomsoption } = req.query;
    const currentDate = new Date()
    currentDate.setHours(currentDate.getHours() + 1)
    const roomoptions = JSON.parse(roomsoption ?? '[]');
    const sumOfAdults = roomoptions.reduce((total, room) => {
        return total + room.adult;
    }, 0);

    try {
        await Hotel.aggregate([
            {
                $lookup: {
                    from: "rooms",
                    localField: "rooms",
                    foreignField: "_id",
                    as: "rooms",
                },
            },
            {
                $unwind: "$rooms",
            },
            {
                $match: {
                    city: { $regex: new RegExp(city, "i") },
                    price: { $gt: Number(min) || 50, $lt: Number(max) || 9999 },

                },
            },
            {
                $group: {
                    _id: "$_id",
                    name: { $first: "$name" },
                    city: { $first: "$city" },
                    price: { $first: "$price" },
                    rating: { $first: "$rating" },
                    images: { $first: "$images" },
                    amenities: { $first: "$amenities" },
                    distanceFromCityCenter: { $first: "$distanceFromCityCenter" },
                    checkInout: { $first: "$checkInout" },
                    rooms: { $push: { room_availability: "$rooms.room_availability", _id: "$rooms._id", price: "$rooms.price", maxpeople: "$rooms.maxpeople" } },
                },
            },
            {
                $sort: {
                    price: 1,
                },
            },
            {
                $limit: Number(req.query.limit),
            },

        ]).then((hotels_res) => {
            const user_startDate = new Date(startdate)
            const user_endDate = new Date(enddate)
            const timeDiff = Math.abs(user_endDate.getTime() - user_startDate.getTime());
            const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            user_startDate.setHours(24)
            user_endDate.setHours(24)
            let roomscalculator = []

            const updatedHotels = hotels_res.map((hotel) => {
                const updatedRooms = hotel.rooms.map((room) => {
                    const updatedAvailability = room.room_availability.filter((ro) => {
                        const availableDates = ro.unavailableDates.filter((date) => {
                            if (!(user_startDate >= date.startDate && user_startDate < date.endDate ||
                                user_endDate <= date.endDate && user_endDate > date.startDate ||
                                user_startDate < date.startDate && user_endDate >= date.endDate ||
                                user_startDate < date.startDate && user_endDate >= date.endDate

                            )) {
                                return date
                            }
                        });

                        if (availableDates.length > 0) {
                            ro.unavailableDates = availableDates;
                            return true;
                        }
                    });
                    if (updatedAvailability.length > 0) {
                        roomscalculator.push({ id: hotel._id, roomcounter: updatedAvailability.length, price: room.price, maxpeople: room.maxpeople });
                        return { ...room, room_availability: updatedAvailability };

                    } else {
                        return null
                    }
                });

                const filteredRooms = updatedRooms.filter((r) => r !== null);
                let bestDeal = null;
                let nearestDeal = null;
                let diff = Infinity;
                let deals = {};

                roomscalculator.forEach((room) => {
                    if (room.id === hotel._id) {
                        if (room.maxpeople >= sumOfAdults && room.roomcounter >= 1) {
                            if (!bestDeal || (room.price < bestDeal.price || (room.price === bestDeal.price && room.roomcounter < bestDeal.roomcounter))) {
                                bestDeal = room;
                            }
                        }
                        if (!nearestDeal || room.roomcounter > nearestDeal.roomcounter) {
                            nearestDeal = room;
                        }
                    }
                });
                if (bestDeal) {
                    deals = bestDeal;
                    deals.rooms = 1;
                } else if (nearestDeal) {
                    const numRooms = Math.ceil(sumOfAdults / nearestDeal.maxpeople);
                    deals = nearestDeal;
                    deals.rooms = numRooms;
                }
                return { ...hotel, rooms: filteredRooms, deals };
            });
            const availableHotels = updatedHotels.filter((h) => h !== null);
            res.status(201).send(updatedHotels)
        });

    } catch (err) {
        next(err);
    }

};
