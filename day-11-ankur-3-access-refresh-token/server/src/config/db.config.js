import mongoose from 'mongoose'
import { config } from './config.js'

export const connectDb =async()=>{

  await mongoose.connect(config.MONGO_URI)
  console.log("mongo db is connected");


}
