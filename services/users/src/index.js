if (process.env.NODE_ENV === 'development') require('dotenv').config()

const express = require('express')
const cors = require('cors')
const router = require('./router')
require('./config') // mongoose config

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use(router)

app.listen(PORT, () => {
  console.log(`Listening to user services on port ${PORT} 🎶`)
})
