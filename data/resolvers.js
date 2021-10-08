import { Jobs, User, Company } from './db.js'
import { userResolvers } from './resolvers/users.js'
import { companyResolvers } from './resolvers/company.js'
import { jobsResolvers } from './resolvers/jobs.js'
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
        ...jobsResolvers.Query,
        ...companyResolvers.Query
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
      ...companyResolvers.Mutation,
      ...jobsResolvers.Mutation
    },
  };

