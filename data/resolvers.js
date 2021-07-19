import fs from 'fs'
import path from 'path';
const __dirname = path.resolve();
import { Jobs } from './db.js'

import { GraphQLUpload } from 'graphql-upload';

export const resolvers = {
    // This maps the `Upload` scalar to the implementation provided
    // by the `graphql-upload` package.
    Upload: GraphQLUpload,
    Query: {
      getJobs : (root, {limit, offset}) => {
        return Jobs.find({}).limit(limit).skip(offset).sort({startDate: -1})
    },
    },
    Mutation: {
      singleUpload: async (parent, { file }) => {
        const { createReadStream, filename, mimetype, encoding } = await file;
        const location = path.join(__dirname, `/public/images/${filename}`)
        const stream = createReadStream();
          
        await stream.pipe(fs.createWriteStream(location))
  
        return { url: `http://localhost:4000/images/${filename}` };
      },
    },
  };

