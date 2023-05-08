import mongoose from "mongoose";

const ReservationScheme = new mongoose.Schema({
    hotel_id: {
        type: String,
        required: true,
    },
    room_id: {
        type: [String],
        required: true,

    },
    total_price: {
        type: Number,
        required: true
    }, check_in_out: {
        in: { type: Date, required: true },
        out: { type: Date, required: true },

    },
    status: { type: String, enum: ['pending', 'cancelled', 'confirmed'], default: 'pending'}
    ,
    guests: {
        adults: {
            type: Number, required: true
        },
        child: {
            type: Number, required: true
        },
    },
    user_id:{
        type: String, required: true,

    }
});

export default mongoose.model("Reservation", ReservationScheme);