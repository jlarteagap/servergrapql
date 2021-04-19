import e from 'express';
import mongoose from 'mongoose';


// const uri = "mongodb+srv://tembiapo:Tembiapo123@cluster0.h1lb5.mongodb.net/remote?retryWrites=true&w=majority";
const uri = process.env.MONGODB_URI
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

export {Jobs}