const bcrypt = require('bcryptjs')
const BYCRYPT_SALT = +process.env.BYCRYPT_SALT

module.exports = {
  hashPassword: (password) => bcrypt.hashSync(password, BYCRYPT_SALT),
  comparePassword: (pass, hashed) => bcrypt.compareSync(pass, hashed),
}
