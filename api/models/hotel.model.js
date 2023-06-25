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
    validate: {
      validator: function (v) {
        const urlPattern = /^(http|https):\/\/.*\.(jpg|jpeg|png|gif)$/;
        return v.every((url) => urlPattern.test(url));
      },
      message: "Invalid image URL",
    },
  },
  virtualTour: {
    type: String
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
  rooms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
    },
  ], admin: 
    [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }]

  ,
  checkInout: {
    timeIn: {
      type: Date,
      default: Date.parse('1970-01-01T14:00:00.000Z')
    },
    timeout: {
      type: Date,
      default: Date.parse('1970-01-01T12:00:00.000Z')
    }
  }

});


export default mongoose.model("Hotel", HotelSchema);