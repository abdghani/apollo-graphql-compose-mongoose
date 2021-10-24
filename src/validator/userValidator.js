const validator = require('validator')
const { isUndefined } = require('@app/util/check')

const userValidator = {
  changePassword: async (resolve, source, args, context, info) => {
    const { newPassword } = args

    if (!validator.isLength(newPassword, { min: 6 })) {
      return Promise.reject(new Error('Error: newPassword'))
    }

    return resolve(source, args, context, info)
  },

  newPassword: async (resolve, source, args, context, info) => {
    const { newPassword } = args

    if (!validator.isLength(newPassword, { min: 6 })) {
      return Promise.reject(new Error('Error: newPassword'))
    }

    return resolve(source, args, context, info)
  },

  resetPassword: async (resolve, source, args, context, info) => {
    let { email } = args

    email = validator.normalizeEmail(email)
    email = validator.trim(email)

    Object.assign(args, { email })

    return resolve(source, args, context, info)
  },

  signIn: async (resolve, source, args, context, info) => {
    let { email } = args

    email = validator.normalizeEmail(email)
    email = validator.trim(email)

    Object.assign(args, { email })

    return resolve(source, args, context, info)
  },

  signUp: async (resolve, source, args, context, info) => {
    let { email } = args

    email = validator.normalizeEmail(email)
    email = validator.trim(email)

    Object.assign(args, { email })

    const { password } = args

    if (!validator.isEmail(email, { allow_utf8_local_part: false })) {
      return Promise.reject(new Error('Error: email'))
    }

    if (!validator.isLength(password, { min: 6 })) {
      return Promise.reject(new Error('Error: password'))
    }

    return resolve(source, args, context, info)
  },

  updateUser: async (resolve, source, args, context, info) => {
    let {
      input: { name }
    } = args
    if (!isUndefined(name) && !validator.isLength(name, { min: 3 })) {
      return Promise.reject(new Error('Error: name'))
    }
    return resolve(source, args, context, info)
  }
}

module.exports = { userValidator }
