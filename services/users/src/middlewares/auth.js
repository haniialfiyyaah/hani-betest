const { Auth } = require('../model')
const { verifyToken } = require('../helpers/jwt')

class AuthMiddleware {
  static async auth(req, res, next) {
    try {
      const { authorization } = req.headers
      const token = authorization?.split('Bearer ')[1]
      if (token) {
        let payload = verifyToken(token)
        const user = await Auth.findOne({ username: payload.username })
        !user
          ? res.status(404).json({ message: 'Invalid token' })
          : ((req.UserData = payload), next())
      } else {
        res.status(401).json({ message: 'Unauthorized' })
      }
    } catch (err) {
      res.status(500).json({ message: err?.message || 'Internal Server Error' })
    }
  }
}

module.exports = { AuthMiddleware }
