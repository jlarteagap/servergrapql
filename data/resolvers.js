import { userResolvers } from './resolvers/users.js'
import { companyResolvers } from './resolvers/company.js'
import { jobsResolvers } from './resolvers/jobs.js'

import dotenv from 'dotenv'
dotenv.config()

const url = process.env.PUBLIC_URL


export const resolvers = {
    Upload: GraphQLUpload,
    Query: {
        ...jobsResolvers.Query,
        ...companyResolvers.Query
    },
    Mutation: {
      ...userResolvers.Mutation,
      ...companyResolvers.Mutation,
      ...jobsResolvers.Mutation
    },
  };

