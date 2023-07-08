import mongoose from "mongoose";

const ReservationScheme = new mongoose.Schema({

    hotel_id: 
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Hotel",
        },
      
      room_id: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Room",
        },
      ],


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
        number_rooms: {
          type: Number
      },

        
    },
 
    user_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
},{ timestamps: true });

export default mongoose.model("Reservation", ReservationScheme);