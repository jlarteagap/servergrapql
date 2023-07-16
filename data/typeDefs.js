import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Jobs {
    active: Boolean
    category: String
    city: String @deprecated(reason: "Use a new Structure")
    company: Company
    companySimple: String
    country: String @deprecated(reason: "Use a new Structure")
    createdAt: String
    updatedAt: String
    deletedAt: String
    id: ID
    link: String
    money: String @deprecated(reason: "Use a new Structure")
    position: String @deprecated(reason: "Use a new Structure")
    remote: Boolean
    salary: String @deprecated(reason: "Use a new Structure")
    type: String @deprecated(reason: "Use a new Structure")
    username: User
    slug: String
    content: Content
    location: Location
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
    name: String
    value: String
    slug: String
  }
  type Country {
    name: String
    value: String
    slug: String
  }
  type Location{
    country: Country
    city: Cities
  }
  type Ubication {
    id: ID
    name: String
    value: String
    cities: [Cities]
  }

  type Category {
    id: ID
    name: String
    value: String
    slug: String
  }

  type Content {
    id: ID
    currency: String
    description: String
    salary: String
    tags: [String]
    title: String
    contract: String
  }

  input JobInput {
    id: ID
    active: Boolean
    category: String
    companySimple: String
    city: String
    company: CompanyInput
    country: String
    createdAt: String
    deletedAt: String
    link: String
    money: String
    position: String
    remote: Boolean
    salary: String
    type: String
    username: UserInput
    updateAt: String
    slug: String
    content: ContentInput
    location: LocationInput
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

  input CountryInput{
      name: String
      value: String
      slug: String
  }
  input CitiesInput {
    name: String
    value: String
    slug: String
  }

  input LocationInput{
    country: CountryInput
    city: CitiesInput
  }
  input UbicationInput {
    id: ID
    name: String
    cities: [CitiesInput]
    remote: Boolean
  }

  input UserInput {
    id: ID
    email: String
  }
  input ContentInput {
    id: ID
    title: String
    description: String
    tags: [String]
    currency: String
    salary: String
    contract: String
  }
  input CategoryInput {
    id: ID
    name: String
    value: String
    slug: String
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
    getPost(slug: String): Jobs
    totalJobs: String,
    totalActiveJobs: String,
    getCompany(ID: ID): Company
    allCompanies(
      username: String
      limit: Int
      offset: Int
      role: String
    ): [Company]
    allUbication: [Ubication]
    allCategories: [Category]
    getCategory(slug: String): Category
  }

  type Mutation {
    newJob(input: JobInput): Jobs
    updateJob(input: JobInput): Jobs
    deleteJobs(jobId: ID): String
    changeActiveJobs(input: JobInput): Jobs

    register(input: RegisterInput): User
    login(email: String!, password: String!): User

    company(input: CompanyInput): Company
    updateCompany(input: CompanyInput): Company
    deleteCompany(companyId: ID): String!

    ubication(input: UbicationInput): Ubication

    category(input: CategoryInput): Category
  }
`;
