require("dotenv").config()
const mongoose = require("mongoose")
mongoose.set('debug', true)

const MONGO_URI = process.env.MONGO_URI

const connect = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000
    })
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error)
    process.exit(1)
  }
}

module.exports = {
  connect,
  Place: require('./places')
};

(async () => {
  await connect()
})()
