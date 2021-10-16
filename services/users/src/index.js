if (process.env.NODE_ENV === 'development') require('dotenv').config()

const express = require('express')
const cors = require('cors')
const router = require('./router')
const { db } = require('./config')

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use(router)

db.once('open', () => {
  console.log('Connected successfully')
})

app.listen(PORT, () => {
  console.log(`Listening to user services on port ${PORT} 🎶`)
})
