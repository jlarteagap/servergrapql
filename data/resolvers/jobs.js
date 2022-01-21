
import checkAuth from '../../utils/checkAuth.js'
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
                position: input.position,
                category: input.category,
                link: input.link,
                remote: input.remote,
                city: input.city,
                country: input.country,
                createdAt: new Date().toISOString(),
                company: input.company,
                username: input.username,
                tags: input.tags,
                type: input.type,
                salary: input.salary
            });
    
            newJob.id = newJob._id;
    
            return new Promise((resolve, object) => {
                newJob.save((error) => {
                    if(error) rejects(error)
                    else resolve(newJob)
                })
            });
          },

        deleteJobs : async(root, {jobId}, context) => {
            const user = checkAuth(context)
            try{
                const job = await Jobs.findById(jobId)

                if(user.email === job.username[0].email){
                    await job.delete()
                    return 'Publicacion eliminada correctamente.'
                } else {
                    throw new AuthenticationError('Action not allowed')
                }
            } catch (err) {
                throw new Error(err)
            }
        },
        updateJob : async (root, {input}, context) => {
            const user = checkAuth(context)
            try {
                const job = await Jobs.findById(input.id)
                if(user.email === job.username[0].email){
                    const jobs = await Jobs.findOneAndUpdate({_id: input.id}, input, {new: true, upsert: true, useFindAndModify: false})
                        return jobs
                }
            } catch (error) {
                throw new Error(error)
            }
        }
    }
}