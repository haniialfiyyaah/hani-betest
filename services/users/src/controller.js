class UserController {
  static async index(req, res, next) {
    res.status(200).json({ message: 'ok' })
  }
}

module.exports = { UserController }
