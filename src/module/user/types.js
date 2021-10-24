const { schemaComposer } = require('graphql-compose')
const { composeWithMongoose } = require('graphql-compose-mongoose')

const UserModel = require('@app/module/user/model')

const UserTC = composeWithMongoose(UserModel).removeField('password')

const userAccountTC = UserTC.getFieldTC('account')

userAccountTC.getFieldTC('verification').removeField(['token', 'expiresIn'])

userAccountTC.removeField('resetPassword')

schemaComposer.createObjectTC({
  name: 'AccessToken',
  description: 'Access token for a authorized user',
  fields: { accessToken: 'String!' }
})

schemaComposer.createObjectTC({
  name: 'SignupAdmin',
  description: 'Access token for a authorized user',
  fields: {
    accessToken: 'String!',
    verificationCode: 'String!'
  }
})

UserTC.addFields({
  eid: {
    type: 'String',
    description: 'Encoded Id of user'
  }
})

module.exports = UserTC
