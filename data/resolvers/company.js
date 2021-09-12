import {Company} from '../db.js'

export const companyResolvers = {
        Query: {
            allCompanies: (root, {user, limit, offset}) => {
                return Company.find().limit(limit).skip(offset).sort({createadAt: -1})
            }
        },
        Mutation: {
            company: ( root, {input}) => {
                const createCompany = new Company({
                    name: input.name,
                    site: input.site,
                    description: input.description,
                    logo: input.logo,
                    user: input.user,
                    createdAt: new Date().toISOString()
                })
        
                createCompany.id = createCompany._id
        
                return new Promise((resolve, object) => {
                    createCompany.save((error) =>{
                        if(error) rejects(error)
                        else resolve(createCompany)
                    })
                })
            }
        }
    }
    