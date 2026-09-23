const { default: mongoose } = require("mongoose");

const connectDb = async () => {

  try {
    await mongoose.connect('mongodb+srv://upadhyayharsh147_db_user:0JW30izulud0b4iq@cluster1.zd1rkp5.mongodb.net/')
    console.log('mongodb connected');

  } catch (error) {
    console.error('error in mongodb', error.message)
  }
}

module.exports = connectDb
