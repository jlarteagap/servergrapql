
import { Jobs} from '../db.js'

export const jobsResolvers = {
    Query: {    
        getJobs : (root, {category, limit, offset}) => {
            let filter
            if(category){
                filter = {category}
            }
            return Jobs.find(filter).limit(limit).skip(offset).sort({createdAt: -1})
        },
        totalJobs : (root) => {
            return new Promise((resolve, object) => {
                Jobs.countDocuments({}, (error, count) => {
                    if(error) rejects(error)
                    else resolve(count)
                })
            })
        }
    },
    Mutation: {
        newJob : async(root, { input }) => {
            const newJob = new Jobs({
                company: input.company,
                position: input.position,
                category: input.category,
                city: input.city,
                country: 'Bolivia',
                link: input.link,
                remote: input.remote,
                createdAt: new Date().toISOString(),
                tags: input.tags,
                username: input.username
            });
    
            newJob.id = newJob._id;
    
            return new Promise((resolve, object) => {
                newJob.save((error) => {
                    if(error) rejects(error)
                    else resolve(newJob)
                })
            });
          }
    }
}