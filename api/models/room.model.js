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
  maxPeople: {
    type: Number,
  },
  facilities: {
    type: [String],
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
  hotel_id: {
    type: String,
  }
});
export default mongoose.model("Room", RoomSchema)