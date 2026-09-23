const { default: mongoose } = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.mongodb_uri)

  } catch (error) {
    console.log('error in database', error.message);

  }
}


module.exports = connectDb
