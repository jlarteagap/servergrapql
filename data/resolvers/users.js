import { UserInputError } from 'apollo-server-express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { User } from '../models/userModel.js'
// import { validateRegisterInput, validateLoginInput } from '../../utils/validators.js'

dotenv.config()
 
const generateToken = (user) =>{
    return jwt.sign({
        id: user.id,
        email: user.email,
        name: user.name,
        lastname: user.lastname
    }, process.env.SECRET, {expiresIn: '1h'})
}

export const userResolvers = {
    Mutation: {
        login: async(root, {email, password}) => {
            // Validaciones...
            if(email.trim() === ''){
                throw new UserInputError('El correo no debe estar vacío')
            }
            if(password.trim() === ''){
                throw new UserInputError('La contraseña no deber estar vacía')
            }

            const user = await User.findOne({ email })

            if(!user){
                throw new UserInputError('Credenciales incorrectas correo electrónico o contraseña no válidos')
            }

            const match = await bcrypt.compare(password, user.password)
            if(!match){
                throw new UserInputError('Credenciales incorrectas correo electrónico o contraseña no válidos')
            }
    
            const token = generateToken(user)

            return {
                ...user._doc,
                id: user._id,
                token
            }
        }, 
        register: async(root, {input: { email, password, confirmPassword}}) => {
            // Validaciones de email...
            if(email.trim() === ''){
                throw new UserInputError('El correo electrónico no puede estar vacio.')
            } else {
                const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                if(!email.match(regEx)){
                    throw new UserInputError('Ingrese un correo electrónico válido.')
                }
            }
            //Validaciones de correo...
            if(password === ''){
                throw new UserInputError('La contraseña no puede estar vacio.')
            } else if( password !== confirmPassword){
                throw new UserInputError('Las contraseñas no coinciden.')
            }

        const user = await User.findOne({email})
        if(user){
            throw new UserInputError('El correo electrónico esta registrado...', {
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