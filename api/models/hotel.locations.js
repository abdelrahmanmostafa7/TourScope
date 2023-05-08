import mongoose from 'mongoose';

const locations = new mongoose.Schema({

    type: {
        type: String,
        enum: ['Feature'],
      },
      geometry: {
        type: {
          type: String,
          enum: ['Point'],
        },
        coordinates: {
          type: [Number],
        }
      },
      properties: {
        name: {
          type: String,
        },
        description: {
          type: String,
        }
        
      }
      ,hotel_id: {
        type: String,
        required:true
      }
      

  });
  export default mongoose.model("locations", locations );
