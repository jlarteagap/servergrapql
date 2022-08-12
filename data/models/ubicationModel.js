import mongoose from "mongoose";

const ubicationSchema = new mongoose.Schema({
    name: String,
    cities: Array,
}, {
    timestamps: true,
})
export const Ubication = mongoose.model("ubication", ubicationSchema);