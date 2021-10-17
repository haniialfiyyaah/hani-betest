const { comparePassword } = require('./helpers/bcrypt')
const { generateToken } = require('./helpers/jwt')
const { redis } = require('./helpers/redis')
const { User, Auth } = require('./model')
const REDIS_NAME = process.env.REDIS_NAME
class UserController {
  static async index(req, res, next) {
    try {
      let users
      const cacheUsers = await redis.get(REDIS_NAME)
      if (cacheUsers) {
        console.log('cache')
        users = JSON.parse(cacheUsers)
      } else {
        console.log('find')
        users = await User.find()
        await redis.set(REDIS_NAME, JSON.stringify(users))
      }
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
      await redis.del(REDIS_NAME)
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
      await redis.del(REDIS_NAME)
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
      await redis.del(REDIS_NAME)
      res.status(200).json({ message: 'user deleted' })
    } catch (err) {
      console.log(err)
      let message = err?.message || 'Internal Server Error'
      res.status(500).json({ message: message, errors: err?.errors })
    }
  }
}

class AuthController {
  static async token(req, res) {
    try {
      const { username, password } = req.query
      if (!username || !password)
        res.status(400).json({ message: 'Username and password required' })
      const user = await Auth.findOne({ username })
      if (user && comparePassword(password, user.password)) {
        const token = generateToken({
          id: user._id,
          username: user.username,
        })
        res.status(200).json({
          message: 'Success',
          token,
        })
      } else {
        res.status(401).json({ message: 'Unauthorized' })
      }
    } catch (err) {
      console.log(err)
      let message = err?.message || 'Internal Server Error'
      res.status(500).json({ message: message, errors: err?.errors })
    }
  }
}

module.exports = { UserController, AuthController }
