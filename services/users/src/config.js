const mongoose = require('mongoose')
const { seedDB } = require('./seed')

//Set up default mongoose connection
const MONGO_URI = process.env.MONGO_URI
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

db.once('open', () => {
  console.log('Connected successfully')
})

seedDB().then(() => {
  console.log('Auth user seed successfully')
})

module.exports = { db }
