const bcrypt = require('bcryptjs')

const mongoose = require('@app/service/mongoose')

const { encodeObjectId } = require('@app/util/encoding')

const { Schema } = mongoose

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true
    },
    password: String,
    name: String,
    phone: {
      type: String,
      unique: true
    },
    profilePic: String,
    account: {
      verification: {
        verified: {
          type: Boolean,
          default: false
        },
        token: String,
        expiresIn: Date
      },
      verificationCode: String,
      resetPassword: {
        token: String,
        expiresIn: Date
      }
    }
  },
  // timestamps automatically manages
  // createdAt and updatedAt field for entries
  { timestamps: true }
)

userSchema.statics.emailExist = function (email) {
  return this.findOne({ email })
}

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

// adding virtual fields
userSchema.virtual('eid').get(function () {
  return encodeObjectId(this._id)
})

const User = mongoose.model('User', userSchema)

module.exports = User
