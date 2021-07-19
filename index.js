import express from 'express';
import  { ApolloServer } from 'apollo-server-express';
import { graphqlUploadExpress } from 'graphql-upload';

import { resolvers } from './data/resolvers.js';
import { typeDefs } from './data/typeDefs.js';
import path from 'path';

import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()
const port = process.env.PORT || 4000

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
}

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
    context: async({req}) => {
      const token = req.headers.authorization || '';

      if(token !== null){
        try{
          const userActual = await jwt.verify(token, process.env.SECRET)
          return userActual
        } catch(err){
          console.error(err)
        }
      }
    }
  });
  await server.start();
  const app = express();
  // This middleware should be added before calling `applyMiddleware`.
  app.use(graphqlUploadExpress());

  app.use(express.static(path.resolve('./public')));

  server.applyMiddleware({ app, cors: corsOptions });

  await new Promise(r => app.listen({ port }, r));

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startServer();
