require('module-alias/register')

// setting env variables
require('dotenv').config()

// enabling loggers
require('@app/service/logger')

// initializing redis
require('@app/service/redis')

// starting the server
const startApolloServer = require('@app/graphql')
startApolloServer()
