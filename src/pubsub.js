const { RedisPubSub } = require('graphql-redis-subscriptions')
const Redis = require('ioredis')

const options = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD
}

const pubsub = new RedisPubSub({
  publisher: new Redis(options),
  subscriber: new Redis(options)
})

const topics = {
  POST_ADDED: 'POST_ADDED'
}

module.exports = {
  pubsub,
  topics
}
