const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURI')


const connectDB = async () =>{
    try {
        console.log("DB CONNECTED")
        await mongoose.connect(db, {
            useNewUrlParser: true
        })
    } catch (error) {
        console.log(error.message)
        process.exit(1)      
    }
} 

module.exports = connectDB

