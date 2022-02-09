require('module-alias').addAlias('@app', `${__dirname}/`)

// setting env variables
require('dotenv').config()

// enabling loggers
require('@app/service/logger')

// initializing redis
require('@app/redis')

// starting the server
const startApolloServer = require('@app/graphql')
startApolloServer()
