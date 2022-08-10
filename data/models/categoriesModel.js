import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: String,
    value: String,
    slug: String,
});

export const Category = mongoose.model("categories", categorySchema);
