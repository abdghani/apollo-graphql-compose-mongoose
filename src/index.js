
require('module-alias').addAlias('@app', `${__dirname}/`);

// setting env vatiables 
require('dotenv').config();

// emabling logers
require('@app/service/logger');

// initializing redis
require('@app/redis');

// starting the server
const startApolloServer =  require('@app/graphql');
startApolloServer();
