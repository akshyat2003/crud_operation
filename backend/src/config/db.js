const mongoose = require('mongoose')

async function connectDB() {
    if (!process.env.MONGODB_URI) {
        throw new Error('MONGODB_URI is not set. Add it to backend/.env before starting the server.')
    }

    await mongoose.connect(process.env.MONGODB_URI)
    console.log('MongoDB connected')
}

module.exports = connectDB
