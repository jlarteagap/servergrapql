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

const userSchema = new mongoose.Schema({
    name: String,
    lastname: String,
    email: String,
    password: String,
    role: String,
    company: Array,
})

userSchema.pre('save', function(next){
    if(!this.isModified('password')){
        return next()
    }
    // usamos bcrypt para encriptar la contrasenha con valor de 10 rondas
    bcrypt.genSalt(10, (err, salt) => {
        if(err) return next(err)
        // let password = this.password.toString()

        bcrypt.hash(this.password, salt, (err, hash) =>{
            if(err) return next(err)
            this.password = hash
            next()
        })
    })
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