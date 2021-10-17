const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

module.exports = {
  generateToken: (obj) => jwt.sign(obj, JWT_SECRET),
  verifyToken: (token) => jwt.verify(token, JWT_SECRET),
}
