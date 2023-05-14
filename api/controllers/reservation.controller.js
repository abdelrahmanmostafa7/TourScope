import Reservation from "../models/reservation.model.js";
import createError from "../utils/createError.js";
import Hotel from "../models/hotel.model.js";
import Room from "../models/room.model.js";
import mongoose from 'mongoose';


export const user_reservations = async (req, res, next) => {
    try {
        const userdata = await Reservation.find({ user_id: req.body.user_id })
            .populate({ path: 'hotel_id', select: 'name images' });
        userdata[0].hotel_id.images = userdata[0].hotel_id.images[0];
        res.status(201).send(userdata)
    } catch (err) {
        next(err)
    }
}

export const make_reservation = async (req, res, next) => {
    try {

        const { roomoptions, roomId, date,deal,user_id } = req.body.userdata;
        const roomIds = new mongoose.Types.ObjectId(roomId);
        const hotel = await Hotel.findOne({ rooms: { $elemMatch: { $in: roomIds } } }).populate({ path: 'rooms', match: { _id: roomId } });
        const room = await Room.findById(roomIds).select('room_availability price maxpeople')
        const user_startDate = new Date(date[0].startDate)
        const user_endDate = new Date(date[0].endDate)
        //res.status(201).send(room)


        room.room_availability.some(ro => {
            let isAvailable = false;

            for (let i = 0; i < ro.unavailableDates.length; i++) {
                const date = ro.unavailableDates[i];
                if (!(user_startDate >= date.startDate && user_startDate < date.endDate ||
                    user_endDate <= date.endDate && user_endDate > date.startDate ||
                    user_startDate < date.startDate && user_endDate >= date.endDate)) {
                    isAvailable = true;
                    ro.unavailableDates.push({ startDate: user_startDate, endDate: user_endDate });
                    break;
                }

            }
            if (isAvailable) {
                return true
            } else {
                return next(createError(403, "Something Went Wrong"))
            }
        });

        // if(deal.roomscount < 1){
        //     return next(createError(403, "Something Went Wrong"))

        // }
    
        const totalprice = deal.price 
        // console.log(room.price * deal.roomscount)
        // if (room.price * deal.roomscount !== totalprice) {
        //     return next(createError(403, "Something Went Wrong"))

        // }
        const newreservation = await Reservation.create({
            guests: {
                adults:  roomoptions.adult
                ,
                child: roomoptions.children
                ,
            }, room_id: roomIds,
            hotel_id: hotel._id,
            total_price: totalprice,
            check_in_out: {
                in: user_startDate,
                out: user_endDate,
            },
            user_id: user_id

        });
        await newreservation.save();
        await room.save();
        res.status(201).send(newreservation)







   






        //     const availableDates = hotel.rooms.ro.unavailableDates.filter((date) => {
        //     //  if (!(user_startDate >= date.startDate && user_startDate < date.endDate ||
        //     //     user_endDate <= date.endDate && user_endDate > date.startDate ||
        //     //     user_startDate < date.startDate && user_endDate >= date.endDate ||
        //     //     user_startDate < date.startDate && user_endDate >= date.endDate

        //     // )) {
        //     //      //return date
        //     //      return "data"
        //     // }
        //  });



    } catch (err) {
        next(err)
    }

}
export const update_reservation_status = async (req, res, next) => {
    try {

        // time before canceled request

        //update reservation state 
        const resevation = await Reservation.findByIdAndUpdate(req.params.reservation_id,
            {
                $set: {
                    "status": req.body.status
                }
            },
            { new: true })
        await resevation.save()
        res.status(201).send(resevation);

        //update room validatin



    } catch (err) {
        next(err)
    }
}