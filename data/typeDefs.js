import { gql } from "apollo-server-express";

export const typeDefs = gql`
  scalar Upload

  type File {
    url: String
  }

  type Jobs {
    active: Boolean
    category: String
    city: String
    company: [Company]
    companySimple: String
    country: String
    createdAt: String
    updatedAt: String
    deletedAt: String
    id: ID
    link: String
    money: String
    position: String
    remote: Boolean
    salary: String
    type: String
    username: [User]
    slug: String
  }

  type User {
    id: ID
    name: String
    lastname: String
    email: String
    password: String
    role: String
    token: String
    createdAt: String
    updatedAt: String
  }
  type Company {
    id: ID
    name: String
    site: String
    description: String
    logo: String
    createdAt: String
    updatedAt: String
    username: String
    phone: String
    activity: String
  }
  type Cities {
    id: ID
    name: String
    createdAt: String
    updatedAt: String
    value: String
    slug: String
  }
  input JobInput {
    id: ID
    active: Boolean
    category: String
    companySimple: String
    city: String
    company: [CompanyInput]
    country: String
    createdAt: String
    deletedAt: String
    link: String
    money: String
    position: String
    remote: Boolean
    salary: String
    type: String
    username: [UserInput]
    updateAt: String
    slug: String
  }

  input CompanyInput {
    description: String
    id: ID
    logo: String
    name: String
    site: String
    username: String
    phone: String
    activity: String
    createdAt: String
    updateAt: String
  }

  input CitiesInput {
    id: ID
    name: String
    createdAt: String
    updatedAt: String
    value: String
    slug: String
  }

  input UserInput {
    id: ID
    email: String
  }
  input RegisterInput {
    password: String
    confirmPassword: String
    email: String
  }

  type Query {
    getJobs(
      category: String
      username: String
      limit: Int
      offset: Int
      active: Boolean
      role: String
    ): [Jobs]
    getJob(ID: ID): Jobs
    totalJobs: String
    getCompany(ID: ID): Company
    allCompanies(
      username: String
      limit: Int
      offset: Int
      role: String
    ): [Company],
    allCities: [Cities],
  }

  type Mutation {
    # Multiple uploads are supported. See graphql-upload docs for details.
    singleUpload(file: Upload!): File!

    newJob(input: JobInput): Jobs
    updateJob(input: JobInput): Jobs
    deleteJobs(jobId: ID): String

    register(input: RegisterInput): User
    login(email: String!, password: String!): User

    company(input: CompanyInput): Company
    updateCompany(input: CompanyInput): Company
    deleteCompany(companyId: ID): String!

    city(input: CitiesInput): Cities
  }
`;
