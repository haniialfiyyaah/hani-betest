const { Auth } = require('./model')

// seeding
const fs = require('fs/promises')
const mongoose = require('mongoose')
const seedDB = async () => {
  const data = JSON.parse((await fs.readFile('auth.json')).toString())
  const auth = await Auth.find()
  if (auth?.length > 0) await Auth.deleteMany({})
  data.forEach(async (e) => {
    await Auth.create(e)
  })
}

seedDB().then(() => {
  console.log('Auth user seed successfully')
  mongoose.connection.close()
})
