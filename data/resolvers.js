import { Jobs, User, Company } from './db.js'
import { userResolvers } from './resolvers/users.js'

import fs from 'fs'
import path from 'path';
const __dirname = path.resolve();

import dotenv from 'dotenv'
dotenv.config()

const url = process.env.PUBLIC_URL

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
      ...userResolvers.Mutation,
    //   addJob : (root, { input }) => {
    //     const addJob = new Jobs({
    //         company: input.company,
    //         logo: input.logo,
    //         position: input.position,
    //         category: input.category,
    //         city: input.city,
    //         country: 'Bolivia',
    //         link: input.link,
    //         email: input.email,
    //         remote: input.remote,
    //         startDate: new Date(),
    //         tags: input.tags
    //     });

    //     addJob.id = addJob._id;

    //     return new Promise((resolve, object) => {
    //         addJob.save((error) => {
    //             if(error) rejects(error)
    //             else resolve(addJob)
    //         })
    //     });
    //   },
    },
  };

