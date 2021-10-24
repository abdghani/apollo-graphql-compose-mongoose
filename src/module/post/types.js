const { composeWithMongoose } = require('graphql-compose-mongoose')

const PostModel = require('@app/module/post/model')

const PostTC = composeWithMongoose(PostModel)

module.exports = PostTC
