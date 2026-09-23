import mongoose from 'mongoose'
import configs from './config.js'

const  connectionDb = async()=>{

  await mongoose.connect(configs.MONGO_URI)
  console.log("Data base connected successfully");

}

export default connectionDb
