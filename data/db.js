import e from 'express';
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/remote', {useNewUrlParser : true, useUnifiedTopology: true});

const jobsSchema = new mongoose.Schema({
    company: String,
    jobtitle: String,
    category: String,
    city: String,
    country: String,
    link: String,
    email: String,
    startDate: Date
});

const Jobs = mongoose.model('jobs', jobsSchema);

export {Jobs}