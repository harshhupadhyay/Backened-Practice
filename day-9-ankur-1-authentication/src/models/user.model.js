import mongoose, { Schema } from "mongoose";

const userSechma = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }

})

const userModel  = mongoose.model("user",userSechma)
export default userModel

