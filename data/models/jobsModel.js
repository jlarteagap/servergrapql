import mongoose from "mongoose";

const jobsSchema = new mongoose.Schema(
  {
    active: Boolean,
    category: String,
    city: String,
    company: Object,
    country: String,
    link: String,
    money: String,
    position: String,
    remote: Boolean,
    salary: String,
    tags: Array,
    type: String,
    username: Object,
    companySimple: String,
    slug:String,
    deletedAt: String,
    ubication: Object,
    content: Object,
  },
  {
    timestamps: true,
  }
);

export const Jobs = mongoose.model("jobs", jobsSchema);