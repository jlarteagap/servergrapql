import e from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt'


const uri = "mongodb://localhost/remote"
// const uri = process.env.MONGODB_URI
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/remote', {useNewUrlParser : true, useUnifiedTopology: true});
mongoose.connect(uri, {useNewUrlParser : true, useUnifiedTopology: true});

const jobsSchema = new mongoose.Schema({
    company: String,
    logo: String,
    position: String,
    category: String,
    city: String,
    country: String,
    link: String,
    email: String,
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
export {Jobs, User}