import mongoose from 'mongoose'

const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    requried: true
  },
  shortCode: {
    type: String,
    requried: true
  },
  clicks:{
    type: Number,
    default: 0
  }
},{
  timestamps : true
})

const urlModel = mongoose.model("urls",urlSchema)

export default urlModel
