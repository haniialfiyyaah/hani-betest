const mongoose = require('mongoose')

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

module.exports = mongoose.model('User', UserSchema)
