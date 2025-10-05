import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    lat: {
        type: Number,
        required: true,
        set: (v) => Math.round(v * 100000) / 100000 // Limiting to 5 dec digits
    },
    long: {
        type: Number,
        required: true,
        set: (v) => Math.round(v * 100000) / 100000 // Limiting to 5 dec digits
    },
    avg_rating: Number
})

const Location = mongoose.model("Location", locationSchema);
export default Location;