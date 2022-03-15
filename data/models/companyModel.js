import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  activity: String,
  description: String,
  logo: String,
  name: String,
  phone: String,
  site: String,
  username: String,
}, {
  timestamps: true,
});

export const Company = mongoose.model('companies', companySchema)