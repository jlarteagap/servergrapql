import express from 'express';
import  { ApolloServer } from 'apollo-server-express';
import { graphqlUploadExpress } from 'graphql-upload';

import { resolvers } from './data/resolvers.js';
import { typeDefs } from './data/typeDefs.js';
import path from 'path';

import dotenv from 'dotenv'

dotenv.config()
const port = process.env.PORT || 4000

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();
  const app = express();
  // This middleware should be added before calling `applyMiddleware`.
  app.use(graphqlUploadExpress());
  app.use(express.static(path.resolve('./public')));

  server.applyMiddleware({ app });

  await new Promise(r => app.listen({ port }, r));

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startServer();
