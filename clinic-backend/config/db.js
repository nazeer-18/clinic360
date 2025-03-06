const mongoose = require('mongoose');
const URI = process.env.MONGO_URI;
const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(URI);
        console.log(`Mongo DB connected ${conn.connection.host}`)
    }catch(error){
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}
module.exports = connectDB;