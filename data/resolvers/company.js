import {AuthenticationError, } from 'apollo-server-express'

import { Company } from '../db.js'
import checkAuth from '../../utils/checkAuth.js'

export const companyResolvers = {
        Query: {
            allCompanies: (root, {username, limit, offset}) => {
                return Company.find({username}).limit(limit).skip(offset).sort({createdAt: -1})
            }
        },
        Mutation: {
            company: async( root, {input}) => {
                const createCompany = new Company({
                    name: input.name,
                    site: input.site,
                    description: input.description,
                    logo: input.logo,
                    username: input.username,
                    createdAt: new Date().toISOString()
                })
        
                createCompany.id = createCompany._id
        
                return new Promise((resolve, object) => {
                    createCompany.save((error) =>{
                        if(error) rejects(error)
                        else resolve(createCompany)
                    })
                })
            },
            deleteCompany: async(root, {companyId }, context) => {
                
                const user = checkAuth(context)
                console.log(user)
                try{
                    const company = await Company.findById(companyId)

                    console.log(company)
                    if(user.email === company.username){
                        await company.delete()
                        return 'Compañia eleminada correctamente.'
                    } else {
                        throw new AuthenticationError('Action not allowed')
                    } 
                } catch (err) {
                    throw new Error(err)
                }
            }
        }
    }
    