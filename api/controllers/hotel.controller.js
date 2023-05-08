import Hotel from "../models/hotel.model.js";
import User from "../models/user.model.js";

import createError from "../utils/createError.js";
import { error } from "console";
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
export const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id).populate('rooms').select('_id name address distanceFromCityCenter rating price images description rooms amenities');
       res.status(201).send(hotel) 
      
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

// GET ALL
export const getHotels = async (req, res, next) => {
    const { min, max, city, startdate, enddate } = req.query;
    try {
        // const options = { year: 'numeric', day: '2-digit', month: '2-digit' };
        // const startDate = new Date(startdate).toLocaleDateString(undefined, options);
        // const endDate = new Date(enddate).toLocaleDateString(undefined, options);
        // const currentDate = new Date().toLocaleDateString(undefined, options)



        // if ( startDate  === endDate || currentDate > startDate){
        //     return next(createError(404,"invalid date"));
        // }
        // console.log(startDate);
        // console.log(endDate);

        const hotels = await Hotel.find({
            city: {
                $regex: new RegExp(city, "i")
            },
            price: { $gt: min | 50, $lt: max || 9999 },

        }).limit(req.query.limit).select("name amenities rating price images city country distanceFromCityCenter ");

        res.status(200).json(hotels);
    } catch (err) {
        next(err);
    }
};


// export const getHotels = async (req, res, next) => {
//     try {
//         const page = parseInt(req.query.page) || 1; // current page number
//         const limit = parseInt(req.query.limit) || 10; // number of items per page
//         const skip = (page - 1) * limit; // number of items to skip

//         const hotels = await Hotel.find(req.query).skip(skip).limit(limit);
//         const count = await Hotel.countDocuments(req.query); // total number of items

//         const totalPages = Math.ceil(count / limit); // total number of pages
//         const hasNextPage = page < totalPages; // whether there's a next page
//         const hasPrevPage = page > 1; // whether there's a previous page

//         res.status(200).json({
//             hotels,
//             pageInfo: {
//                 currentPage: page,
//                 totalPages,
//                 hasNextPage,
//                 hasPrevPage,
//                 totalItems: count,
//                 itemsPerPage: limit
//             }
//         });
//     } catch (err) {
//         next(err);
//     }
// };


//get hotel and pass rooms id
// const loc = await Hotel.find()
//         let counter = 0;
//         for (const element1 of loc) {
//                 const room = await Room.find({ hotel_id: element1._id });
//                 for (const element2 of room){
//                     element1.rooms.push(element2._id);
//                     counter++;
//                     console.log(counter)
//                 }
//                 element1.save();
//         }


//get room and pass hotel id
// const loc = await Room.find()
//         let counter = 0;
//         for (const element of loc) {
//             if (element.hotel_name == null) {
//                 console.log("No properties");
//             } else {
//                 const hotel = await Hotel.findOne({ name: element.hotel_name });

//                 element.hotel_id = hotel.id;
//                 element.save();
//                 counter++;
//                 console.log(counter)
//             }
//         }
