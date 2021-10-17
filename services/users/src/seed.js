require('dotenv').config()

const { Auth } = require('./model')
// seeding
const fs = require('fs/promises')
const mongoose = require('mongoose')
const { hashPassword } = require('./helpers/bcrypt')
const MONGO_URI = process.env.MONGO_URI

// connect to databse once to seed
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected for seeding'))
  .catch((err) => console.log(err))

const seedDB = async () => {
  const data = JSON.parse((await fs.readFile('auth.json')).toString())
  data.map(async (e) => (e.password = hashPassword(e.password)))
  await Auth.deleteMany({})
  await Auth.insertMany(data)
}

seedDB().then(() => {
  console.log('Auth user seed successfully')
  // close database
  mongoose.connection.close()
})
