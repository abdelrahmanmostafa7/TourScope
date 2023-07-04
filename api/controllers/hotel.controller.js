import Hotel from "../models/hotel.model.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Reservation from "../models/reservation.model.js";

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
export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};
// export const updateHotel = async (req, res, next) => {
//     try {
//         const updatedHotel = await Hotel.findByIdAndUpdate(
//             req.params.id,
//             { $push: { images: req.body.image } },
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

// export const updateHotel = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const  images  = req.body;
//         const updatedHotel = await Hotel.findByIdAndUpdate(
//             id,
//             { $set: { images } },
//             { new: true }
//         );
//         res.status(200).json(updatedHotel);
//     } catch (err) {
//         next(err);
//     }
// };
export const addnewuser = async (req, res, next) => {

  try {
    const hash = bcrypt.hashSync(req.body.password, 5)
    const newUser = new User({
      ...req.body,
      password: hash,
    })
    await newUser.save()
    const { password, role, ...info } = newUser._doc
    res.status(201).send(info)

  } catch (err) {
    next(err)
  }


}

export const deleteuser = async (req, res, next) => {

  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (err) {
    next(err);
  }


}
export const modifiyrole = async (req, res, next) => {

  try {
    const { id } = req.params;
    const { newrole } = req.body
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role: newrole },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }

}

//DELETE
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted");
  } catch (err) {
    next(err);
  }
};


export const dashboard = async (req, res, next) => {

  const objectId = new mongoose.Types.ObjectId(req.params.id);
  const currentMonthStartDate = new Date(Date.now());
  currentMonthStartDate.setDate(1); // Set the date to the first day of the month
  const currentMonthEndDate = new Date(currentMonthStartDate);
  currentMonthEndDate.setMonth(currentMonthEndDate.getMonth() + 1); // Set the date to the first day of the next month
  const lastMonthStartDate = new Date(currentMonthStartDate);
  lastMonthStartDate.setMonth(lastMonthStartDate.getMonth() - 1); // Set the date to the first day of the previous month
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  try {
    const pipeline1 = [
      {
        $match: { hotel_id: objectId }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m", date: "$check_in_out.in" }
          },
          total_profit: {
            $sum: {
              $cond: {
                if: { $eq: ["$status", "confirmed"] },
                then: "$total_price",
                else: 0
              }
            }
          }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ];

    const pipeline2 = [
      {
        $match: { hotel_id: objectId }
      },
      {
        $group: {
          _id: null,
          earnings: {
            $sum: {
              $cond: {
                if: { $eq: ["$status", "confirmed"] },
                then: "$total_price",
                else: 0
              }
            }
          },
          Guests: {
            $sum: {
              $cond: {
                if: { $eq: ["$status", "confirmed"] },
                then: "$guests.adults",
                else: 0
              }
            }
          },
          Reservations: {
            $sum: {
              $cond: {
                if: { $eq: ["$status", "confirmed"] },
                then: 1,
                else: 0
              }
            }
          },
          average_night: {
            $sum: {
              $cond: {
                if: {
                  $and: [
                    { $eq: ["$status", "confirmed"] },

                  ]
                },
                then: {
                  $ceil: {
                    $divide: [
                      {
                        $subtract: ["$check_in_out.out", "$check_in_out.in"]
                      },
                      1000 * 60 * 60 * 24
                    ]
                  }
                },
                else: 0
              }
            }
          },
          total_rev_this_month: {
            $sum: {
              $cond: {
                if: {
                  $and: [
                    { $eq: ["$status", "confirmed"] },
                    { $gt: ["$check_in_out.in", currentMonthStartDate] },
                    { $lte: ["$check_in_out.in", currentMonthEndDate] }
                  ]
                },
                then: "$total_price",
                else: 0
              }
            }
          },
          total_rev_last_month: {
            $sum: {
              $cond: {
                if: {
                  $and: [
                    { $eq: ["$status", "confirmed"] },
                    { $gt: ["$check_in_out.in", lastMonthStartDate] },
                    { $lte: ["$check_in_out.in", currentMonthStartDate] }
                  ]
                },
                then: "$total_price",
                else: 0
              }
            }
          }
        }
      }
    ];

    const mergedPipeline = [
      {
        $facet: {
          aggregation1: pipeline1,
          aggregation2: pipeline2,
        },
      },
      {
        $project: {
          dashboard_data: { $concatArrays: ["$aggregation1", "$aggregation2"] },
        },
      },
    ];


    const results = await Reservation.aggregate(mergedPipeline);
    const dashboardData = results[0].dashboard_data;
    const years = {};

    dashboardData.forEach(data => {
      if (data._id !== null) {
        const yearMonth = data._id.split("-");
        const year = yearMonth[0];
        const monthIndex = parseInt(yearMonth[1]) - 1;
        const month = monthNames[monthIndex];

        if (!years[year]) {
          years[year] = {
            Year: year,
            months: []
          };
        }

        years[year].months.push({
          name: month,
          Total: data.total_profit || 0
        });
      } else {
        data.total_profit = data.total_profit || 0;
      }
    });

    const output = {
      dashboard_data: Object.values(years)
    };
    output.dashboard_data.push(dashboardData.find(data => data._id === null));

    res.status(200).send(output);
  } catch (err) {
    next(err);
  }

};
//GET
// export const getHotel = async (req, res, next) => {
//     const { min, max, city, startdate, enddate, roomsoption, } = req.query;
//     try {
//         await Hotel.findByIdAndDelete(req.params.id);
//         res.status(200).json("Hotel has been deleted");
//     } catch (err) {
//         next(err);
//     }
// };

//GET

//GET
export const getHotel = async (req, res, next) => {
  const { startdate, enddate, roomsoption } = req.query;
  try {
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 1);
    const roomoptions = JSON.parse(roomsoption ?? "[]");
    let sumOfAdults = null;
    if (Array.isArray(roomoptions)) {
      sumOfAdults = roomoptions.reduce((total, room) => {
        return total + room.adult;
      }, 0);
    } else {
      sumOfAdults = roomoptions.adult;
    }
    const hotelId = new mongoose.Types.ObjectId(req.params.id);
    await Hotel.aggregate([
      {
        $match: {
          _id: hotelId,
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
          area_info: { $push: "$area_info" },
        },
      },
    ]).then((hotel_res) => {
      const user_startDate = new Date(startdate);
      const user_endDate = new Date(enddate);
      user_startDate.setUTCHours(22, 0, 0, 0);
      user_endDate.setUTCHours(22, 0, 0, 0);

      const timeDiff = Math.abs(
        user_endDate.getTime() - user_startDate.getTime()
      );
      const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      user_startDate.setHours(24);
      user_endDate.setHours(24);
      const updatedRooms = hotel_res[0].rooms.map((room) => {
        let cheak_flag = true;

        const cheacker = [];
        const updatedAvailability = room.room_availability.some((ro) => {
          for (let i = 0; i < ro.unavailableDates.length; i++) {
            const date = ro.unavailableDates[i];
            const isDateValid = !(
              (user_startDate >= date.startDate &&
                user_startDate < date.endDate) ||
              (user_endDate <= date.endDate && user_endDate > date.startDate) ||
              (user_startDate < date.startDate && user_endDate >= date.endDate)
            );

            if (!isDateValid && cheak_flag) {
              cheacker.push({
                state: "invalid",
              });
              break;
            }
          }

          if (cheacker.length === 0 && cheak_flag) {
            cheak_flag = false;
            cheacker.push({
              state: "valid",
            });
            return true;
          }
          return false;
        });
        if (!cheak_flag) {
          let deal = { roomscount: 0 };
          let n = 1;
          do {
            if (room.maxpeople * n >= sumOfAdults) {
              if (n <= room.room_availability.length) {
                deal.roomscount = n;
                deal.price = n * room.price * diffDays;
                break;
              } else {
                deal.roomscount = [];
                break;
              }
            }
            n++;
          } while (true);

          delete room.room_availability;
          return { ...room, deal };
        } else {
          return { ...room, room_availability: [] };
        }
      });
      hotel_res[0].rooms = updatedRooms;
      const obj = hotel_res[0];
      res.status(200).send(obj);
    });
    //res.status(201).send(hotel)
  } catch (err) {
    next(err);
  }
};






// Get fav Hotels
export const getFavHotels = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("favoriteList")
      .select("favoriteList");
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

//Dashboard
export const userstatus = async (req, res, next) => {
  try {

    const hotel = await Hotel.findOne({ admin: "6490327d0b468e93e5fb7e4c" }).populate("admin").select("admin");
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

// GET ALL
export const getHotels = async (req, res, next) => {
  const { min, max, city, startdate, enddate, roomsoption } = req.query;
  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + 1);
  const roomoptions = JSON.parse(roomsoption ?? "[]");
  let sumOfAdults = null;
  if (Array.isArray(roomoptions)) {
    sumOfAdults = roomoptions.reduce((total, room) => {
      return total + room.adult;
    }, 0);
  } else {
    sumOfAdults = roomoptions.adult;
  }

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
          rooms: {
            $push: {
              room_availability: "$rooms.room_availability",
              _id: "$rooms._id",
              price: "$rooms.price",
              maxpeople: "$rooms.maxpeople",
            },
          },
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
      const user_startDate = new Date(startdate);
      const user_endDate = new Date(enddate);
      user_startDate.setUTCHours(22, 0, 0, 0);
      user_endDate.setUTCHours(22, 0, 0, 0);
      const timeDiff = Math.abs(
        user_endDate.getTime() - user_startDate.getTime()
      );
      const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      user_startDate.setHours(24);
      user_endDate.setHours(24);
      let roomscalculator = [];

      const updatedHotels = hotels_res.map((hotel) => {
        const updatedRooms = hotel.rooms.map((room) => {
          const updatedAvailability = room.room_availability.filter((ro) => {
            const availableDates = ro.unavailableDates.filter((date) => {
              if (
                !(
                  (user_startDate >= date.startDate &&
                    user_startDate < date.endDate) ||
                  (user_endDate <= date.endDate &&
                    user_endDate > date.startDate) ||
                  (user_startDate < date.startDate &&
                    user_endDate >= date.endDate) ||
                  (user_startDate < date.startDate &&
                    user_endDate >= date.endDate)
                )
              ) {
                //return date
                return "data";
              }
            });

            if (availableDates.length > 0) {
              ro.unavailableDates = "avilable";
              return true;
            }
          });
          if (updatedAvailability.length > 0) {
            roomscalculator.push({
              id: hotel._id,
              roomcounter: updatedAvailability.length,
              price: room.price,
              maxpeople: room.maxpeople,
            });
            //return { ...room, room_availability: updatedAvailability };
          } else {
            return null;
          }
        });

        let bestDeal = null;
        let nearestDeal = null;
        let diff = Infinity;
        let deals = {};

        roomscalculator.forEach((room) => {
          if (room.id === hotel._id) {
            if (room.maxpeople >= sumOfAdults && room.roomcounter >= 1) {
              if (
                !bestDeal ||
                room.price < bestDeal.price ||
                (room.price === bestDeal.price &&
                  room.roomcounter < bestDeal.roomcounter)
              ) {
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
          deals.price = deals.price * diffDays;
        } else if (nearestDeal) {
          const numRooms = Math.ceil(sumOfAdults / nearestDeal.maxpeople);
          deals = nearestDeal;
          deals.rooms = numRooms;
          deals.price = numRooms * deals.price * diffDays;
        }
        if (deals.roomcounter >= deals.rooms) {
          return { ...hotel, deals };
        } else {
          return { ...hotel };
        }
      });

      res.status(201).send(updatedHotels);
    });
  } catch (err) {
    next(err);
  }
};

// Get all rooms
export const getHotelRooms = async (req, res, next) => {
  try {
    const { id } = req.params;
    const hotels = await Hotel.findById(id)
      .populate({
        path: "rooms",
        select: " name beds type maxpeople price status",
      })
      .select("rooms");
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

// // Delete photos
// export const deleteHotel = async (req, res, next) => {
//     try {
//         await Hotel.findByIdAndDelete(req.params.id);
//         res.status(200).json("Hotel has been deleted");
//     } catch (err) {
//         next(err);
//     }
// };

// export const deleteHotelItem = async (req, res, next) => {
//     const input = req.body
//     try {
//         if (input.photo) {
//             await Hotel.findByIdAndUpdate(req.params.id, { " $pull ": { images: input.photo } })
//         }
//         console.log(input);
//         res.status(200).json({ message: "Hotel and its photo have been deleted" });
//     } catch (err) {
//         next(err);
//     }
// };

export const deleteHotelItem = async (req, res, next) => {
  const input = req.body;
  try {
    if (input.photo) {
      await Hotel.findByIdAndUpdate(req.params.id, {
        $pull: { images: input.photo },
      });
    }
    if (input.amenity) {
      await Hotel.findByIdAndUpdate(req.params.id, {
        $pull: { amenities: input.amenity },
      });
    }
    res.status(200).json({ message: "Hotel item has been deleted" });
  } catch (err) {
    next(err);
  }
};

