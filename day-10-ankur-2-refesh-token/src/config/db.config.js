import mongoose from "mongoose"
import config from "./config.js"

const conncetDb =async()=>{
  await mongoose.connect(config.MONGO_URI)
  console.log('conneted db');
}

export default conncetDb
