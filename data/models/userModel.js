import mongoose from "mongoose"; 

const userSchema = new mongoose.Schema({
    name: String,
    lastname: String,
    email: String,
    password: String,
    role: String,
    createdAt: String,
    updateAt: String
})

export const User = mongoose.model('user', userSchema)
