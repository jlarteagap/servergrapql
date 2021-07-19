import e from 'express'
import mongoose from 'mongoose'
import bcrypt, { hash } from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()

const uri = process.env.DBSERVER

mongoose.Promise = global.Promise
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})

const jobsSchema = new mongoose.Schema({
    position: String,
    category: String,
    city: String,
    country: String,
    link: String,
    remote: Boolean,
    startDate: Date,
    tags: Array,
});

const Jobs = mongoose.model('jobs', jobsSchema);

export { Jobs }