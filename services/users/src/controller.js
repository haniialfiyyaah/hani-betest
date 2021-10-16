const User = require('./model')
class UserController {
  static async index(req, res, next) {
    try {
      let users = await User.find()
      res.status(200).json({ message: 'users found.', data: users })
    } catch (err) {
      console.log(err)
      let message = err?.message || 'Internal Server Error'
      res.status(500).json({ message: message, errors: err?.errors })
    }
  }

  static async store(req, res) {
    try {
      const { userName, accountNumber, emailAddress, identityNumber } = req.body
      const newUser = await User.create({
        userName,
        accountNumber,
        emailAddress,
        identityNumber,
      })
      res.status(200).json({ message: 'user created.', data: newUser })
    } catch (err) {
      console.log(err)
      let message = err?.message || 'Internal Server Error'
      res.status(500).json({ message: message, errors: err?.errors })
    }
  }

  static async show(req, res) {
    try {
      const { id } = req.params
      let user = await User.findOne({ $text: { $search: id } })

      if (!user) return res.status(404).json({ message: 'User not found' })
      res.status(200).json({ message: 'user found', data: user })
    } catch (err) {
      console.log(err)
      let message = err?.message || 'Internal Server Error'
      res.status(500).json({ message: message, errors: err?.errors })
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params
      const { userName, accountNumber, emailAddress, identityNumber } = req.body

      let user = await User.findByIdAndUpdate(id, {
        userName,
        accountNumber,
        emailAddress,
        identityNumber,
      })

      if (!user) return res.status(404).json({ message: 'User not found' })
      res.status(200).json({ message: 'user updated' })
    } catch (err) {
      console.log(err)
      let message = err?.message || 'Internal Server Error'
      res.status(500).json({ message: message, errors: err?.errors })
    }
  }

  static async destroy(req, res, next) {
    try {
      const { id } = req.params
      let user = await User.findByIdAndDelete(id)
      if (!user) return res.status(404).json({ message: 'User not found' })
      res.status(200).json({ message: 'user deleted' })
    } catch (err) {
      console.log(err)
      let message = err?.message || 'Internal Server Error'
      res.status(500).json({ message: message, errors: err?.errors })
    }
  }
}

module.exports = { UserController }
