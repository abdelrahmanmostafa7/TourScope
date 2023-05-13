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
        const rooms_id = req.body.rooms_id
        const roomIds = rooms_id.map(id => new mongoose.Types.ObjectId(id));
        console.log(roomIds)
        const hotel = await Hotel.findOne({ rooms: { $elemMatch: { $in: roomIds } } });


        // get hotel id
        if (!hotel) {
            return next(createError(404, "something went wrong"))
        }
        //cheak room available



        //Sum of Total price
        let total_price = 0;
        for (let id of rooms_id) {
            const r = await Room.findOne({ _id: id });
            total_price += r.price;
        }
        //create reservation 
        const newreservation = await Reservation.create({
            user_id: req.body.user,
            guests: req.body.guests,
            room_id: rooms_id,
            hotel_id: hotel._id,
            total_price: total_price,
            check_in_out: req.body.check_in_out,
            user_id: req.body.user_id

        });
        await newreservation.save();
        res.status(201).send(newreservation)

        // assign new dates for new room







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