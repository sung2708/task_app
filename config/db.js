import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async()=>{
    try{
         const conn  = await mongoose.connect(process.env.DB_URI,{
            dbName: process.env.DB_NAME
        })
        console.log(`DB connected, ${conn.connection.host}`);
    }
    catch(err){
        console.log('error: ', err);
        process.exit(1);
    }
}

export default connectDB;
