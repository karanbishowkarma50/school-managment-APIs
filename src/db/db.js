const mongoose = require("mongoose")

async function connectDB() {
    try{
        await mongoose.connect(process.env.URI)
        console.log("connected to database.")
    }
    catch{
        console.log("failed to connect database.")
    }
}

module.exports = connectDB