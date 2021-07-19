import express from 'express'
import mongoose from 'mongoose'
import { Jobs, User, Company } from './db.js'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import fs from 'fs'
import path from 'path';
const __dirname = path.resolve();

import dotenv from 'dotenv'
dotenv.config()

const url = process.env.PUBLIC_URL

const tokenCreate = (user, secret, expiresIn) => {
  const { email } = user
  return jwt.sign({email}, secret, {expiresIn})
}

import { GraphQLUpload } from 'graphql-upload';

export const resolvers = {
    Upload: GraphQLUpload,
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
    Mutation: {
      singleUpload: async (parent, { file }) => {
        const { createReadStream, filename, mimetype, encoding } = await file;
        const location = path.join(__dirname, `/public/images/${filename}`)
        const stream = createReadStream();
          
        await stream.pipe(fs.createWriteStream(location))
  
        return { url: `${url}/images/${filename}` };
      },
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
      },createUser: async(root, {email, name, lastname, password, role, company}) => {
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
    }, 
    createCompany: ( root, {input}) => {
        const createCompany = new Company({
            name: input.name,
            site: input.site,
            description: input.description,
            logo: input.logo,
            user: input.user
        })

        createCompany.id = createCompany._id

        return new Promise((resolve, object) => {
            createCompany.save((error) =>{
                if(error) rejects(error)
                else resolve(createCompany)
            })
        })
    }
    },
  };

