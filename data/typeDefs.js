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
    company: Company
    createdAt: String
    username: String
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
    company: String
    logo: String
    position: String
    category: String
    city: String
    country: String
    link: String
    email: String
    remote: Boolean
    startDate: String
}

input CompanyInput{
  id: ID
  name: String,
  site: String,
  description: String,
  logo: String,
  username: String
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

    # addJob(input: JobInput) : Jobs
    register(input: RegisterInput): User
    login(email: String!, password: String!): User

    company(input: CompanyInput) : Company
    deleteCompany(companyId: ID): String!

  }
`;

