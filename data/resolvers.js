import { userResolvers } from './resolvers/users.js'
import { companyResolvers } from './resolvers/company.js'
import { jobsResolvers } from './resolvers/jobs.js'
import { citiesResolvers } from './resolvers/cities.js'

export const resolvers = {
    Query: {
        ...jobsResolvers.Query,
        ...companyResolvers.Query,
        ...citiesResolvers.Query
    },
    Mutation: {
      ...userResolvers.Mutation,
      ...companyResolvers.Mutation,
      ...jobsResolvers.Mutation,
      ...citiesResolvers.Mutation
    },
  };

