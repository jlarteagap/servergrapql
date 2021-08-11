import { UserInputError } from 'apollo-server-express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import {User} from '../../data/db.js'
import { validateRegisterInput} from '../../utils/validators.js'

dotenv.config()
 
const generateToken =(user) =>{
    return jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.SECRET, {expiresIn: '1h'})
}

export const userResolvers = {
    Mutation: {    
      createUser: async(root, {input: { email, password, confirmPassword}}) => {
        // validaciones 
        const { valid, errors} = validateRegisterInput(email, password, confirmPassword)
        if(!valid){
            throw new UserInputError('Errors', { errors})
        }
        // verifacion de usuario registrado
        const user = await User.findOne({email})
        if(user){
            throw new UserInputError('El correo electrónico esta registrado', {
                errors: {
                    email: 'Este correo electrónico esta registrado.'
                }
            })
        }
        // hasheando contraseña
        password = await bcrypt.hash(password, 12)

        // creando usuario en la BD
        const newUser = await new User({
            email,
            name: "",
            lastname: "",
            password,
            createdAt: new Date().toISOString()

        })

        const res = await newUser.save()
        const token = generateToken(res)
        
        return{
            ...res._doc,
            id: res._id,
            token
        }
        }
    }
}