import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();

export default async function connectDB(){
    await mongoose.connect(process.env.DB)
    .then(()=>console.log('Connected DB'))
    .catch((err)=>console.log(err));
}