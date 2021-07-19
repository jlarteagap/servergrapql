import  { ApolloServer, gql } from 'apollo-server-express';

export const typeDefs = gql`
  # The implementation for this scalar is provided by the
  # 'GraphQLUpload' export from the 'graphql-upload' package
  # in the resolver map below.
  scalar Upload

  type File {
    url: String
  }

  type Jobs {
    id: ID
    position: String
    category: String
    city: String
    country: String
    link: String
    remote: Boolean
    startDate: String
}

  type Query {
    # This is only here to satisfy the requirement that at least one
    # field be present within the 'Query' type.  This example does not
    # demonstrate how to fetch uploads back.
    getJobs(limit: Int, offset: Int): [Jobs]
  }

  type Mutation {
    # Multiple uploads are supported. See graphql-upload docs for details.
    singleUpload(file: Upload!): File!
  }
`;