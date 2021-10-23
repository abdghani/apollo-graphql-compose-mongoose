const { schemaComposer } = require('graphql-compose')

require('@app/graphql/types')

const { User } = require('@app/module')

schemaComposer.Query.addFields({
  ...User.query
})

schemaComposer.Mutation.addFields({
  ...User.mutation
})

schemaComposer.Subscription.addFields({
  // ...Entity.subscription,
})

const schema = schemaComposer.buildSchema()
module.exports = schema
