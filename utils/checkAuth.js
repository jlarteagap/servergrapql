import { AuthenticationError } from 'apollo-server-express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const secret = process.env.SECRET

const checkAuth = (context) => {
    // context = { ... headers}
    const authHeader = context.req.headers.authorization

    if(authHeader){
        // Bearer ...
        const token = authHeader.split('Bearer ')[1]

        if(token){
            try{
                const user = jwt.verify(token, secret)
                return user
            } catch(err){
                throw new AuthenticationError('invalid/Expired token')
            }
        }
        throw new Error('Authentication token must be \'Bearer [token]')
    }
    throw new Error('Authentication header must be provided')
}

export default checkAuth