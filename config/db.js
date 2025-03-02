var mongoose = require('mongoose');
var dotenv = require('dotenv');

dotenv.config();

var connectDB = async()=>{
    try{
         var conn  = await mongoose.connect(process.env.DB_URI,{
            dbName: process.env.DB_NAME
        })
        console.log(`DB connected, ${conn.connection.host}`);
    }
    catch(err){
        console.log('error: ', err);
        process.exit(1);
    }
}

module.exports = connectDB;
