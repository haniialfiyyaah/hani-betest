const mongoose = require('mongoose')
const { hashPassword } = require('./helpers/bcrypt')

const UserSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
    },
    userName: {
      type: String,
      required: [true, "can't be blank"],
      unique: true,
      index: true,
      lowercase: true,
      match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
    },
    accountNumber: {
      type: String,
      required: [true, "can't be blank"],
      unique: true,
      index: true,
    },
    emailAddress: {
      type: String,
      required: [true, "can't be blank"],
      unique: true,
      index: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, 'is invalid'],
    },
    identityNumber: {
      type: String,
      required: [true, "can't be blank"],
      unique: true,
      index: true,
    },
  },
  { timestamps: true }
)

UserSchema.method('toJSON', function () {
  const { _v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})
UserSchema.pre('save', function () {
  this.id = mongoose.Types.ObjectId(this._id)
})

UserSchema.index({ id: 'text', accountNumber: 'text', identityNumber: 'text' })

const User = mongoose.model('User', UserSchema)

const AuthSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [6, 'password has to be at least 6 characters'],
  },
})
AuthSchema.pre('save', function () {
  this.password = hashPassword(this.password)
})

const Auth = mongoose.model('Auth', AuthSchema)

module.exports = { User, Auth }
