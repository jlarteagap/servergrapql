import  { gql } from 'apollo-server-express';

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
    country: String
    createdAt: String
    id: ID
    link: String
    money: String
    position: String
    remote: Boolean
    salary: String
    type: String
    updatedAt: String
    username: [User]
  }

  type User {
    id: ID,
    name: String,
    lastname: String,
    email: String,
    password: String,
    role: String
    token: String
    createdAt: String
    updatedAt: String
  }
  type Company {
    id: ID,
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

input JobInput {
    id: ID
    position: String
    category: String
    city: String
    country: String
    link: String
    remote: Boolean
    createdAt: String
    company: [CompanyInput]
    username: [UserInput]
    type: String
    salary: String
    money: String
}

input CompanyInput{
  description: String
  id: ID
  logo: String
  name: String
  site: String
  username: String
  phone: String
  activity: String
}
input UserInput {
    id: ID,
    email: String,
  }
input RegisterInput{
  password: String
  confirmPassword: String
  email: String
}

  type Query {
    getJobs(category: String, username: String, limit: Int, offset: Int): [Jobs]
    getJob(ID: ID): Jobs
    totalJobs : String
    getCompany(ID: ID): Company
    allCompanies(username: String, limit: Int, offset: Int): [Company]
  }

  type Mutation {
    # Multiple uploads are supported. See graphql-upload docs for details.
    singleUpload(file: Upload!): File!

    newJob(input: JobInput) : Jobs
    updateJob(input: JobInput): Jobs
    deleteJobs(jobId: ID): String
    
    register(input: RegisterInput): User
    login(email: String!, password: String!): User

    company(input: CompanyInput) : Company
    updateCompany(input: CompanyInput) : Company
    deleteCompany(companyId: ID): String!
  }
`;

