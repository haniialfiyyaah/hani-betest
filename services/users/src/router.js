const router = require('express').Router()
const { UserController, AuthController } = require('./controller')
const { AuthMiddleware } = require('./middlewares/auth')

router.get('/token', AuthController.token)

router.use(AuthMiddleware.auth)
router.get('/', UserController.index)
router.get('/:id', UserController.show)
router.post('/', UserController.store)
router.put('/:id', UserController.update)
router.delete('/:id', UserController.destroy)

module.exports = router
