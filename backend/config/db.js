import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://balumeduri6:balu14312345@cluster0.etjuxx6.mongodb.net/tomoto').then(()=>{
        console.log("DB is connected");
    })
}