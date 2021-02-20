import express from 'express'

import { ApolloServer } from 'apollo-server-express';

import { typeDefs } from './data/schema.js';
import { resolvers } from './data/resolvers.js'

const app = express();
const server = new ApolloServer({ typeDefs, resolvers});
server.applyMiddleware({app});

app.listen({port: 4000}, () => console.log(`El servidor esta corriendo en ${server.graphqlPath}`))