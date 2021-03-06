import express from 'express';
import mongoose from 'mongoose'
import { Jobs, User } from './db.js'

import bcrypt from 'bcrypt'
// Generar token 
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config({path: 'variables.env'})

const tokenCreate = (user, secret, expiresIn) => {
    const {email} = user    
    return jwt.sign({email}, secret, {expiresIn})
}

export const resolvers = {
    Query: {
        getJobs : (root, {limit, offset}) => {
            return Jobs.find({}).limit(limit).skip(offset).sort({startDate: -1})
        },
        //Seleccion por Categorias
        byCategories: (root, {category, limit, offset}) => {
            return new Promise((resolve, object) => {
                Jobs.find({category: category}, (error, category) => {
                    if(error) rejects(error)
                    else resolve(category)
                }).limit(limit).skip(offset).sort({startDate: -1})
            })
        },
        totalJobs : (root) => {
            return new Promise((resolve, object) => {
                Jobs.countDocuments({}, (error, count) => {
                    if(error) rejects(error)
                    else resolve(count)
                })
            })
        },
        totalCategories : (root, {category})  =>{
            return new Promise((resolve, object) => {
                Jobs.countDocuments({category: category}, (error, count) => {
                    if(error) rejects(error)
                    else resolve(count)
                })
            })
        },
        getUser:(root, args, context) => {
            if(!context){
                return null
            }
            const user = User.findOne({ email: context.email})
            return user
        }
    },
    // Mutaciones
    Mutation: {
        addJob : (root, { input }) => {
            const addJob = new Jobs({
                company: input.company,
                logo: input.logo,
                position: input.position,
                category: input.category,
                city: input.city,
                country: 'Bolivia',
                link: input.link,
                email: input.email,
                remote: input.remote,
                startDate: new Date(),
                tags: input.tags
            });

            addJob.id = addJob._id;

            return new Promise((resolve, object) => {
                addJob.save((error) => {
                    if(error) rejects(error)
                    else resolve(addJob)
                })
            });
        },
        // Crear usuario
        createUser: async(root, {email, name, lastname, password, role, company}) => {
            // Revisar si existe el correo electronico como usuario. 
            const existUser = await User.findOne({email})

            if(existUser){
                throw new Error('El usuario ya existe...')
            }
            // De lo contrario creamos un nuevo usuario 
            const newUser = await new User({
                email,
                name, 
                lastname,
                password,
                company,
                role
            }).save()

            return "Usuario creado correctamente..."
        },
        autenticateUser: async(root, {email, password}) => {
            const userEmail = await User.findOne({email})

            if(!userEmail){
                throw new Error('El usuario no existe...')
            }
            const passwordUser = await bcrypt.compare(password, userEmail.password)

            if(!passwordUser){
                throw new Error("Contraseña Incorrecta")
            }
            
            return{
                token: tokenCreate(userEmail, process.env.SECRET, '1hr')
            }
        }
    }
}