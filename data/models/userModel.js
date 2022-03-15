import mongoose from "mongoose"; 

const userSchema = new mongoose.Schema({
    name: String,
    lastname: String,
    email: String,
    password: String,
    role: String,
},
{
  timestamps: true,
})

export const User = mongoose.model('user', userSchema)
