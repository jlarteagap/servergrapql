import  { gql } from 'apollo-server-express';

export const typeDefs = gql`
  scalar Upload

  type File {
    url: String
  }

  type Jobs {
    id: ID
    position: String
    category: CategoryJob
    city: CityJob
    country: String
    link: String
    remote: Boolean
    company: [Company]
    createdAt: String
    username: [User]
    type: String
    salary: String
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
  }
  type Company {
    id: ID,
    name: String
    site: String
    description: String
    logo: String
    createdAt: String
    username: String
    phone: String
    activity: String
  }

  enum CategoryJob{
    SOFTWARE_DEVELOP
    SOCIAL_MEDIA
    DESIGNER
    SALES
  }

  enum CityJob{
    SANTA_CRUZ
    LA_PAZ
    COCHABAMBA
    CHUQUISACA
    TARIJA
    ORURO
    POTOSI
    BENI
    PANDO
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
    getJobs(category: String, limit: Int, offset: Int): [Jobs]
    totalJobs : String
    allCompanies(username: String, limit: Int, offset: Int): [Company]
  }

  type Mutation {
    # Multiple uploads are supported. See graphql-upload docs for details.
    singleUpload(file: Upload!): File!

    newJob(input: JobInput) : Jobs
    deleteJobs(jobId: ID): String
    
    register(input: RegisterInput): User
    login(email: String!, password: String!): User

    company(input: CompanyInput) : Company
    deleteCompany(companyId: ID): String!

  }
`;

