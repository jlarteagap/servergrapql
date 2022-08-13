import { userResolvers } from './resolvers/usersResolvers.js';
import { companyResolvers } from './resolvers/company.js'
import { jobsResolvers } from './resolvers/jobs.js'
import { ubicationResolvers } from './resolvers/ubicactionResolver.js';
import { categoryResolvers } from './resolvers/categoryResolver.js';

export const resolvers = {
    Query: {
        ...jobsResolvers.Query,
        ...companyResolvers.Query,
        ...ubicationResolvers.Query,
        ...categoryResolvers.Query,
    },
    Mutation: {
      ...userResolvers.Mutation,
      ...companyResolvers.Mutation,
      ...jobsResolvers.Mutation,
      ...ubicationResolvers.Mutation,
      ...categoryResolvers.Mutation,
    },
  };

