import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    date_of_birth: {
        type: Date,
    },
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    phone_number: [{
        type: String,
        unique: true
    }],
    favoriteList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hotel" }],

    google_id: {
        type: String,
    },
    facebook_id: {
        type: String,
    },
    resetpasswordtoken: {
        type: String,
    },
    resetpasswordexpire: {
        type: Date,
    },
    role: { type: String, enum: ['moderator', 'supervisor', 'user'], default: 'user', required: true }
}, { timestamps: true });
export default mongoose.model("user", userSchema)