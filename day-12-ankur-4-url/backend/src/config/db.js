import mongoose from 'mongoose'
import configs from './config.js'


const connectDb = async()=>{

  await mongoose.connect(configs.Mongo_Url)
  console.log("connected db");
  

}

export default connectDb
