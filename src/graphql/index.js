const cors = require('cors')
const express = require('express')
const winston = require('winston')
const { json } = require('body-parser')
const schema = require('@app/graphql/schema')
const { ApolloServer } = require('@apollo/server')
const { createServer } = require('http')
const { expressMiddleware } = require('@apollo/server/express4')
const { authentication, subscriptionAuth } = require('@app/middleware/authentication')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')

const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')

const graphPath = process.env.GRAPH_PATH

const startApolloServer = async () => {
  const app = express()
  const httpServer = createServer(app)

  // Creating the WebSocket subscription server
  const wsServer = new WebSocketServer({
    // This is the `httpServer` returned by createServer(app);
    server: httpServer,
    // Pass a different path here if your ApolloServer serves at
    // a different path.
    path: graphPath
  })

  // Passing in an instance of a GraphQLSchema and
  // telling the WebSocketServer to start listening
  const serverCleanup = useServer(
    {
      schema,
      context: subscriptionAuth
    },
    wsServer
  )

  const server = new ApolloServer({
    schema,
    introspection: true,
    playground: true,
    context: authentication,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            }
          }
        }
      }
    ]
  })

  app.get('/', (req, res) => res.send('Server is up and running'))

  await server.start()

  app.use(
    graphPath,
    cors(),
    json(),
    expressMiddleware(server, {
      context: authentication
    })
  )

  httpServer.listen(process.env.PORT, () =>
    winston.info(`🚀 Server ready at http://localhost:${process.env.PORT}/graphql`)
  )
}

module.exports = startApolloServer
