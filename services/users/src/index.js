const express = require('express')
const cors = require('cors')
const router = require('./router')

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

// router
app.use(router)

app.listen(PORT, () => {
  console.log(`Listening to user services on port ${PORT} 🎶`)
})
