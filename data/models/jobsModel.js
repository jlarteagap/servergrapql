import mongoose from "mongoose";

const jobsSchema = new mongoose.Schema(
  {
    active: Boolean,
    category: String,
    city: String,
    company: Array,
    country: String,
    link: String,
    money: String,
    position: String,
    remote: Boolean,
    salary: String,
    tags: Array,
    type: String,
    username: Array,
    companySimple: String,
    slug:String,
    deletedAt: String,
    ubication: Array,
  },
  {
    timestamps: true,
  }
);

export const Jobs = mongoose.model("jobs", jobsSchema);