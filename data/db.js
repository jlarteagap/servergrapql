import mongoose from 'mongoose'
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

const userSchema = new mongoose.Schema({
    name: String,
    lastname: String,
    email: String,
    password: String,
    role: String,
    company: Array,
    createdAt: String
})

const User = mongoose.model('user', userSchema)

const companySchema = new mongoose.Schema({
    name: String,
    site: String,
    description: String,
    logo: String,
    user: mongoose.Types.ObjectId
})

const Company = mongoose.model('companies', companySchema)

export {Jobs, User, Company}