import mongoose from 'mongoose';
const { Schema } = mongoose;

const HotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
  },
  area_info: {
    nearbyPlaces: { type: [String] },
    attractions: { type: [String] },
    restaurants: { type: [String] }
  },
  country: {
    type: String,
  },
  distanceFromCityCenter: {
    type: Number,
  },
  description: {
    type: String,
  },
  images: {
    type: [String],
  },
  virtualTour:{
    type:String
  },
  amenities: {
    type: [String],
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  price: {
    type: Number,
  },
  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }],
  admin: {
    type: [String]

  }

});

export default mongoose.model("Hotel", HotelSchema);

