const router = require('express').Router()
const { UserController } = require('./controller')

router.get('/', UserController.index)

module.exports = router
