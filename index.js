import express, { request } from 'express'
import cors from 'cors'
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

import { typeDefs } from './data/schema.js';
import { resolvers } from './data/resolvers.js'

dotenv.config({path: 'variables.env'})
const app = express();
app.use(cors())

const server = new ApolloServer({ 
	typeDefs, 
	resolvers, 
	introspection: true, 
	playground: true,
	context: async ({ req }) => {
		const token = req.headers['authorization']		
		if(token.length>2){
			try{
				const userActual = jwt.verify(token, process.env.SECRET)
				// enviamos los datos del usuario al request, lo que hara que siempre este disponible 
                req.userActual = userActual
				
			} catch {

			}
		}
	}
});
server.applyMiddleware({app});

app.listen(process.env.PORT || 4000, 
	() => console.log("Server is runningo en ${server.graphqlPath}`"))