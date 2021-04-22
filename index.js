import express from 'express'
import cors from 'cors'
import { ApolloServer } from 'apollo-server-express';

import { typeDefs } from './data/schema.js';
import { resolvers } from './data/resolvers.js'

const app = express();
app.use(cors())

const server = new ApolloServer({ typeDefs, resolvers, introspection: true, playground: true,});
server.applyMiddleware({app});

app.listen(process.env.PORT || 4000, 
	() => console.log("Server is runningo en ${server.graphqlPath}`"))