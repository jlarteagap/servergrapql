import express, { request } from 'express'
import cors from 'cors'
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

import { typeDefs } from './data/schema.js';
import { resolvers } from './data/resolvers.js'

dotenv.config({path: 'variables.env'})
const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}

const server = new ApolloServer({ 
	typeDefs, 
	resolvers,
	introspection: true, 
	playground: true,
	context: async ({req}) => {

		const token = req.headers.authorization;

		if(token !== null){
			try{
				const userActual = await jwt.verify(token, process.env.SECRET)
				return userActual
			} catch(err) {
				console.error(err)
			}
		}
	}
});
server.applyMiddleware({app, cors: corsOptions});

app.listen(process.env.PORT || 4000, 
	() => console.log("Server is runningo en ${server.graphqlPath}`"))