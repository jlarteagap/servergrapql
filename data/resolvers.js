import { userResolvers } from './resolvers/users.js'
import { companyResolvers } from './resolvers/company.js'
import { jobsResolvers } from './resolvers/jobs.js'
import { ubicationResolvers } from './resolvers/ubicactionResolver.js';

export const resolvers = {
    Query: {
        ...jobsResolvers.Query,
        ...companyResolvers.Query,
        ...ubicationResolvers.Query,
    },
    Mutation: {
      ...userResolvers.Mutation,
      ...companyResolvers.Mutation,
      ...jobsResolvers.Mutation,
      ...ubicationResolvers.Mutation,
    },
  };

