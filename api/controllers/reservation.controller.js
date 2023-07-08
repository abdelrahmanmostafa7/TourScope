import Reservation from "../models/reservation.model.js";
import createError from "../utils/createError.js";
import Hotel from "../models/hotel.model.js";
import Room from "../models/room.model.js";
import mongoose from 'mongoose';
import nodemailer from "nodemailer";
import userModel from "../models/user.model.js";


export const user_reservations = async (req, res, next) => {
    try {
        const userdata = await Reservation.find({ user_id: req.params.id })
            .populate({ path: 'hotel_id', select: 'name images address rating' });
        res.status(201).send(userdata)
    } catch (err) {
        next(err)
    }
}
export const hotelReservations = async (req, res, next) => {
    try {
        const hotelReservations = await Reservation.find({ hotel_id: req.params.id }).populate(
            {
                path: "user_id",
                select: "first_name last_name email"
            }
        ).populate({
            path: "room_id",
            select: "name"
        }).select("guests check_in_out status total_price");
        const modifiedReservations = hotelReservations.map((reservation) => {
            const { check_in_out, guests, _id, room_id, total_price, status, user_id } = reservation;
            const roomname = room_id[0].name;
            const { first_name, last_name, email  } = user_id[0];
            const user_ID = user_id[0]. _id;

            // Format the check-in and check-out dates
            const checkInDate = formatDate(check_in_out.in);
            const checkOutDate = formatDate(check_in_out.out);

            return {
                check_in_out: {
                    in: checkInDate,
                    out: checkOutDate
                },
                guests,
                _id,
                roomname,
                total_price,
                status,
                first_name,
                last_name,
                email,
                user_ID
            };
        });

        res.status(201).send(modifiedReservations);
    } catch (err) {
        next(err);
    }
};

// Function to format date in "day month year" format
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
};



export const make_reservation = async (req, res, next) => {
    try {
        const { roomoptions, roomId, date, deal, user_id } = req.body;

        const user = await userModel.findById(user_id).select('email')
        const roomIds = new mongoose.Types.ObjectId(roomId);
        const hotel = await Hotel.findOne({ rooms: { $elemMatch: { $in: roomIds } } });
        const room = await Room.findById(roomId).select('name room_availability price maxpeople');

        const user_startDate = new Date(date[0].startDate)
        const user_endDate = new Date(date[0].endDate)
        user_startDate.setUTCHours(22, 0, 0, 0);
        user_endDate.setUTCHours(22, 0, 0, 0);
        user_startDate.setDate(user_startDate.getDate() + 1);
        user_endDate.setDate(user_endDate.getDate() + 1);


        let cheak_flag = true
        let counter = 0;

        room.room_availability.some(ro => {
            const cheacker = [];
            for (let i = 0; i < ro.unavailableDates.length; i++) {
                const date = ro.unavailableDates[i];
                const isDateValid = !(
                    (user_startDate >= date.startDate && user_startDate < date.endDate) ||
                    (user_endDate <= date.endDate && user_endDate > date.startDate) ||
                    (user_startDate < date.startDate && user_endDate >= date.endDate)
                );
                if (!isDateValid && cheak_flag) {
                    cheacker.push({
                        number: ro.number
                        , state: "invalid"
                    });
                    break;
                }
            }

            if (cheacker.length === 0 && cheak_flag) {
                ro.unavailableDates.push({ startDate: user_startDate, endDate: user_endDate });
                counter++

            }
            if (counter === deal.roomscount) {
                cheak_flag = false
            }

        });


        if (cheak_flag === true) {
            return next(createError(403, "Something Went Wrong"))

        }
        if (deal.roomscount < 1) {
            return next(createError(403, "Something Went Wrong"))

        }

        const totalprice = deal.price;
        const timeDiff = Math.abs(user_endDate.getTime() - user_startDate.getTime());
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

        if (room.price * deal.roomscount * diffDays !== totalprice) {
            return next(createError(403, "Something Went Wrong"))
        }

        const newreservation = await Reservation.create({
            guests: {
                adults: roomoptions.adult
                ,
                child: roomoptions.children
                ,
                number_rooms: deal.roomscount
            },
            room_id: roomIds,
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

        const formatteduser_startDate = user_startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        const formatteduser_endDate = user_endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        const transporter = nodemailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            auth: {
                user: 'tourscope.team@gmail.com',
                pass: 'TOURteam23'
            }
        });

        const mailOptions = {
            from: 'tourscope.team@gmail.com',
            to: user.email,
            subject: 'Reservation Confirmation',
            html: `
              <div style="display: flex; height: 100vh; background-color: #f0f0f0;">
                <div style="width: 700px; background-color: #fff; border-radius: 15px; padding: 20px;">
                  <h1 style="margin-bottom: 20px;">TourScope - Hotel Reservation Confirmation</h1>
                  <div style="display: flex; justify-content: center;">
                    <img src="${hotel.images[0]}" alt="Hotel Image" style="width: 400px; height: 250px; border-radius: 15px;" />
                    
                  </div>
                  <h2 style="margin-bottom: 10px; text-align: center;">${hotel.name}</h2>
                  <div style="margin-top: 20px;">
                    <h2 style="margin-bottom: -10px;">Stay Date</h2>
                    <ul>
                      <li>
                        <p style="margin-left: 30px;">${formatteduser_startDate} - ${formatteduser_endDate}</p>
                      </li>
                    </ul>
                  </div>
                  <div style="margin-top: 20px;">
                    <h2 style="margin-bottom: -10px;">Payment</h2>
                    <ul>
                      <li>
                        <p style="margin-left: 30px;">${deal.roomscount}x ${room.name}</p>
                      </li>
                      <li>
                        <p style="margin-left: 30px;">Total Price: ${deal.price} EGP</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            `
        };

        await transporter.sendMail(mailOptions, (err, info) => {

        });
        res.status(200).send("done")
    } catch (err) {
        next(err)
    }
}


export const cancel_Reservation = async (req, res, next) => {
    try {
        const reservation = await Reservation.findById(req.params._id);
        const room = await Room.findById(reservation.room_id).select('room_availability');

        if (reservation) {
            if (reservation.status === "cancelled") {
                res.status(201).send("Reservation is already cancelled!");
            } else if (reservation.status === "confirmed") {
                res.status(404).send("Reservation cannot be cancelled!");
            } else {


                const startDate = new Date(reservation.check_in_out.in);
                const endDate = new Date(reservation.check_in_out.out);

                let counter = 0;
                let flag = true

                room.room_availability.forEach((availability) => {
                    availability.unavailableDates.forEach((dateRange, index) => {
                        const start = new Date(dateRange.startDate);
                        const end = new Date(dateRange.endDate);

                        if (start.getTime() === startDate.getTime() && end.getTime() === endDate.getTime() && flag) {
                            counter++;
                            availability.unavailableDates.splice(index, 1);
                        }
                        if (counter == reservation.guests.number_rooms) {
                            flag = false
                        }
                    });
                });

                await room.save();
                reservation.status = "cancelled";
                await reservation.save();
                res.status(201).send("Reservation has been cancelled!");
            }
        } else {
            res.status(404).send("Reservation not found!");
        }
    } catch (err) {
        next(err);
    }
};


export const admin_reservation = async (req, res, next) => {
    try {
      const reservation = await Reservation.findById(req.params._id);
      const room = await Room.findById(reservation.room_id).select('room_availability');
  
      if (!reservation ) {
        return res.status(404).send("Reservation not found!");
      }
  
      switch (reservation.status) {
        case "cancelled":
          return res.status(201).send("Reservation cannot be cancelled!");
        case "confirmed":
          return res.status(404).send("Reservation is already confirmed");
        default:
          const startDate = new Date(reservation.check_in_out.in);
          const endDate = new Date(reservation.check_in_out.out);
  
          let counter = 0;
          let flag = true;
  
          room.room_availability.forEach((availability) => {
            availability.unavailableDates.forEach((dateRange, index) => {
              const start = new Date(dateRange.startDate);
              const end = new Date(dateRange.endDate);
  
              if (start.getTime() === startDate.getTime() && end.getTime() === endDate.getTime() && flag) {
                counter++;
                availability.unavailableDates.splice(index, 1);
              }
              if (counter === reservation.guests.number_rooms) {
                flag = false;
              }
            });
          });
  
          await room.save();
          reservation.status = req.body.newState;
          await reservation.save();
          return res.status(201).send("Reservation has been confirmed!");
      }
    } catch (err) {
      next(err);
    }
  };
  




