import mongoose from 'mongoose'

const connectDB = async () => {
    const uri = process.env.MONGODB_URI

    try{
        mongoose.Promise = global.Promise
        const conn = await mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
        console.log(`MongoDB Connected ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default connectDB