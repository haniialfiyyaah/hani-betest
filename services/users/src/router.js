const router = require('express').Router()
const { UserController } = require('./controller')

router.get('/', UserController.index)
router.get('/:id', UserController.show)
router.post('/', UserController.store)
router.put('/:id', UserController.update)
router.delete('/:id', UserController.destroy)

module.exports = router
