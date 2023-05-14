import mongoose from "mongoose";
const { Schema } = mongoose;

const RoomSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  maxpeople: {
    type: Number,
  },
  numberOfRoom:{
    type:Number,
  },
  type:{
    type:String,
  },
  status:{
    type:String,
  },
  facilities: {
    type: [String],
    default: []
  },
  images: {
    type: [String],
  },
  description: {
    type: String,
  },
  size: {
    type: Number,
  },
  beds: {
    type: [String],
  },
  hotel_name: {
    type: String,
  },
  room_availability: [{
    number: String, unavailableDates: [{
      startDate: { type: Date },
      endDate: { type: Date }
    }]
  }],
  hotel_id: {
    type: String,
  }
});
export default mongoose.model("Room", RoomSchema)