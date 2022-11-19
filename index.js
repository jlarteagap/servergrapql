import express from 'express'
import  { ApolloServer } from 'apollo-server-express';
import connectDB from './config/db.js'
import { resolvers } from './data/resolvers.js';
import { typeDefs } from './data/typeDefs.js';
import router from './routes/jobsRoutes.js';
import {errorHandler} from './middleware/errorMiddleware.js'

import dotenv from 'dotenv/config'
import cors from 'cors'

const port = process.env.PORT || 4000
// Connect DB
connectDB()

// Cors 
const corsOptions = {
  origin: true,
  optionsSuccessStatus: 200,
  credentials: true
}

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
    context: ({req}) => ({ req })

  });
  
  await server.start();
  const app = express();

  app.use('/api/jobs', router)
  app.use(errorHandler)
  server.applyMiddleware({ app, cors: corsOptions });


  await new Promise(r => app.listen({ port }, r));

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startServer();