const { RedisPubSub } = require('graphql-redis-subscriptions')
// eslint-disable-next-line import/no-extraneous-dependencies
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
  ENTITY_ADDED: 'ENTITY_ADDED'
}

module.exports = {
  pubsub,
  topics
}
