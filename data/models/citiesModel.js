import mongoose from "mongoose";

const citiesSchema = new mongoose.Schema(
    {
        name: String,
        value: String,
        slug: String
    },
    {
        timestamps: true,
    })

    export const Cities = mongoose.model("cities", citiesSchema);