const { schemaComposer } = require('graphql-compose')

require('@app/graphql/types')

const { User, Post } = require('@app/module')

schemaComposer.Query.addFields({
  ...User.query,
  ...Post.query
})

schemaComposer.Mutation.addFields({
  ...User.mutation,
  ...Post.mutation
})

schemaComposer.Subscription.addFields({
  ...Post.subscription
})

const schema = schemaComposer.buildSchema()
module.exports = schema
