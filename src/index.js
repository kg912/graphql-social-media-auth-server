require('app-module-path').addPath('./src');

const { ApolloServer, PubSub } = require('apollo-server'); // uses express underneath: node_modules/express
const mongoose = require('mongoose'); // ORM library > Object relationship mapper > used to connect to MongoDB cluster

const typeDefs = require('graphql/typeDefs');
const resolvers = require('graphql/resolvers');

const { MONGO_DB } = require('../config.js');

// PubSub: Publisher/Subscribe

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }), // will now forward these props to the third arg in resolver queries or mutations i.e: context
});

mongoose
  .connect(MONGO_DB, {
    useNewUrlParser: true /* will give deprecation warning without this option*/,
  })
  .then(() => {
    console.log('connected to the database');
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
