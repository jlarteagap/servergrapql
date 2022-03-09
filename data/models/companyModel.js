import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  activity: String,
  createdAt: String,
  description: String,
  logo: String,
  name: String,
  phone: String,
  site: String,
  updatedAt: String,
  username: String,
});

export const Company = mongoose.model('companies', companySchema)