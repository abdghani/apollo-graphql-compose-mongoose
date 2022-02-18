const cors = require('cors')
const express = require('express')
const winston = require('winston')

const bodyParser = require('body-parser')
const schema = require('@app/graphql/schema')
const { ApolloServer } = require('apollo-server-express')
const { createServer } = require('http')
const { authentication, subscriptionAuth } = require('@app/middleware/authentication')
const { execute, subscribe } = require('graphql')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')

const startApolloServer = async () => {
  const app = express()
  const httpServer = createServer(app)

  const server = new ApolloServer({
    schema,
    introspection: true,
    playground: true,
    context: authentication,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  })

  SubscriptionServer.create(
    {
      // This is the `schema` we just created.
      schema,
      // These are imported from `graphql`.
      execute,
      subscribe,

      // authentication in subscription
      onConnect: subscriptionAuth
    },
    {
      // This is the `httpServer` we created in a previous step.
      server: httpServer,
      // This `server` is the instance returned from `new ApolloServer`.
      path: server.graphqlPath
    }
  )

  app.use(bodyParser.json({ limit: '100mb' }))
  app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }))

  app.get("/", (req, res) => res.send("Server is up and running"))

  await server.start()
  server.applyMiddleware({ app })
  const corsOptions = {
    origin: '*'
  }
  app.use(cors(corsOptions))
  httpServer.listen(process.env.PORT, () =>
    winston.info(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`)
  )
  return server
}

module.exports = startApolloServer
