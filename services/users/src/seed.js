const { Auth } = require('./model')

// seeding
const fs = require('fs/promises')
const seedDB = async () => {
  const data = JSON.parse((await fs.readFile('auth.json')).toString())
  await Auth.deleteMany({})
  data.forEach(async (e) => {
    await Auth.create(e)
  })
}

seedDB().then(() => {
  console.log('Auth user seed successfully')
})
