const bcrypt = require('bcryptjs')
const moment = require('moment')
const redis = require('@app/redis')
const UserModel = require('@app/module/user/model')
const { isUndefined } = require("@app/util/check");

const { userService, createToken } = require('@app/module/user/service')
const { toInputObjectType } = require('graphql-compose')
const { UserUpdate } = require('./inputs')

const user = {
  name: 'user',
  type: 'User!',
  resolve: ({ context: { user } }) => user
}

const signIn = {
  name: 'signIn',
  type: 'AccessToken!',
  args: {
    email: 'String!',
    password: 'String!'
  },
  resolve: async ({ args: { email, password } }) => {
    try {
      const user = await UserModel.emailExist(email)
      if (!user) {
        return Promise.reject(new Error('User not found.'))
      }

      const comparePassword = await user.comparePassword(password)
      if (!comparePassword) {
        return Promise.reject(new Error('Password is incorrect.'))
      }

      const accessToken = createToken(user)

      return { accessToken }
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

const signUp = {
  name: 'signUp',
  type: 'AccessToken!',
  args: {
    name: 'String',
    email: 'String!',
    password: 'String!'
  },
  resolve: async ({ args: { email, password, name } }) => {
    try {
      let user = await UserModel.emailExist(email)
      if (user) {
        return Promise.reject(new Error('Email has already been taken.'))
      }

      const hash = bcrypt.hashSync(password, 10)

      user = await new UserModel({
        name,
        email,
        password: hash
      }).save()

      const accessToken = createToken(user)

      const token = await userService.createVerificationToken(user)

      return { accessToken }
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

const logout = {
  name: 'logout',
  type: 'Succeed!',
  resolve: async ({ context: { user, accessToken } }) => {
    try {
      await redis.set(`expiredToken:${accessToken}`, user._id, 'EX', process.env.REDIS_TOKEN_EXPIRY)

      return { succeed: true }
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

const verifyRequest = {
  name: 'verifyRequest',
  type: 'Succeed!',
  resolve: async ({ context: { user } }) => {
    try {
      const token = await userService.verifyRequest(user)
      return { succeed: true }
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

const verify = {
  name: 'verify',
  type: 'AccessToken!',
  args: { token: 'String!' },
  resolve: async ({ args: { token } }) => {
    try {
      const user = await UserModel.findOne({
        'account.verification.token': token
      })
      if (!user) {
        return Promise.reject(new Error('Access Token is not valid or has expired.'))
      }

      user.set({
        account: {
          verification: {
            verified: true,
            token: null,
            expiresIn: null
          }
        }
      })

      await user.save()
      const accessToken = createToken(user)
      return { accessToken }
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

const resetPassword = {
  name: 'resetPassword',
  type: 'Succeed!',
  args: { email: 'String!' },
  resolve: async ({ args: { email } }) => {
    try {
      const user = await UserModel.findOne({ email })
      if (!user) {
        return Promise.reject(new Error('User not found.'))
      }

      const token = crypto({ length: 48, type: 'url-safe' })
      const expiresIn = moment().add(7, 'days')

      user.set({
        account: {
          resetPassword: {
            token,
            expiresIn
          }
        }
      })

      await user.save()

      return { succeed: true }
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

const newPassword = {
  name: 'newPassword',
  type: 'AccessToken!',
  args: { token: 'String!', newPassword: 'String!' },
  resolve: async ({ args: { token, newPassword } }) => {
    try {
      const user = await UserModel.findOne({
        'account.resetPassword.token': token
      })
      if (!user) {
        return Promise.reject(new Error('Access Token is not valid or has expired.'))
      }

      const hash = bcrypt.hashSync(newPassword, 10)

      user.set({
        password: hash,
        account: {
          resetPassword: {
            token: null,
            expiresIn: null
          }
        }
      })

      await user.save()

      const accessToken = createToken(user)

      return { accessToken }
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

const changePassword = {
  name: 'changePassword',
  type: 'Succeed!',
  args: { currentPassword: 'String!', newPassword: 'String!' },
  resolve: async ({ args: { currentPassword, newPassword }, context: { user } }) => {
    try {
      const comparePassword = await user.comparePassword(currentPassword)
      if (!comparePassword) {
        return Promise.reject(new Error('Current password is incorrect.'))
      }

      const hash = bcrypt.hashSync(newPassword, 10)

      user.set({ password: hash })

      await user.save()

      return { succeed: true }
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

const updateUser = {
  name: 'updateUser',
  type: 'User!',
  args: { input: toInputObjectType(UserUpdate) },
  resolve: async ({ args: { input }, context: { user } }) => {
    try {
      const { name, profilePic } = input
      
      if(!isUndefined(name)) user.name = name
      if(!isUndefined(profilePic)) user.profilePic = profilePic
      
      await user.save()
      return user

    } catch (error) {
      return Promise.reject(error)
    }
  }
}

module.exports = {
  user,
  signIn,
  signUp,
  logout,
  verifyRequest,
  verify,
  resetPassword,
  newPassword,
  changePassword,
  updateUser
}
