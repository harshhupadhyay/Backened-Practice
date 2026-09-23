const { default: mongoose } = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.mongodb_uri)
    console.log('mongoDb connected');
    

  } catch (error) {
    console.log('error in database', error.message);

  }
}


module.exports = connectDb
