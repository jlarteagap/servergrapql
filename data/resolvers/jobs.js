import checkAuth from "../../utils/checkAuth.js";
import { Jobs } from '../models/jobsModel.js'

export const jobsResolvers = {
  Query: {
    getJobs: async (root, { username, category, limit, offset, active }) => {
      if(category && active){
        return await Jobs.find({category, active})
        .limit(limit)
        .skip(offset)
        .sort({ updatedAt: -1 });
      }

      if (category) {
        return await Jobs.find({category})
        .limit(limit)
        .skip(offset)
        .sort({ updatedAt: -1 });
      }
      if (username) {
        return await Jobs.find({"username.email": username})
        .limit(limit)
        .skip(offset)
        .sort({ createdAt: -1 });
      }
      if(active) {
        return await Jobs.find({active})
        .limit(limit)
        .skip(offset)
        .sort({ updatedAt: -1 });
        
      }

      return await Jobs.find()
        .limit(limit)
        .skip(offset)
        .sort({ createdAt: -1 });
    },

    getJob: async (root, { ID }) => {
      return await Jobs.findById(ID);
    },
    getPost: async (root, { slug }) => {
      return await Jobs.findOne({ "slug": slug });
    },
    totalJobs: (root) => {
      return new Promise((resolve, object) => {
        Jobs.countDocuments({}, (error, count) => {
          if (error) rejects(error);
          else resolve(count);
        });
      });
    },

    totalActiveJobs: (root) => {
      return new Promise((resolve, object) => {
        Jobs.countDocuments({ active: true }, (error, count) =>{
          if (error) rejects(error);
          else resolve(count);
        })
      })
      Jobs.countDocuments({ active: true }, function (err, count) {
        console.log('there are %d jungle adventures', count);
      });
    }

  },
  Mutation: {
    newJob: async (root, { input }) => {
      const newJob = new Jobs({
        active: input.active,
        position: input.position,
        category: input.category,
        link: input.link,
        remote: input.remote,
        city: input.city,
        country: input.country,
        createdAt: new Date().toISOString(),
        updateAt: new Date().toISOString(),
        deletedAt: new Date(new Date().setDate(new Date().getDate() + 15)).toISOString(),
        company: input.company,
        username: input.username,
        tags: input.tags,
        type: input.type,
        salary: input.salary,
        money: input.money,
        companySimple: input.companySimple,
        slug: input.slug,
        location: input.location,
        content: input.content,
      });

      newJob.id = newJob._id;

      return new Promise((resolve, object) => {
        newJob.save((error) => {
          if (error) rejects(error);
          else resolve(newJob);
        });
      });
    },

    deleteJobs: async (root, { jobId }, context) => {
      const user = checkAuth(context);
      try {
        const job = await Jobs.findById(jobId);

        if (user.email === job.username.email) {
          await job.delete();
          return "Publicacion eliminada correctamente.";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    updateJob: async (root, { input }, context) => {
      const user = checkAuth(context);

      try {
        const job = await Jobs.findById(input.id);

        if (user.email === job.username.email) {
          const jobs = await Jobs.findOneAndUpdate({ _id: input.id }, input, {
            new: true,
            upsert: true,
            useFindAndModify: false,
          });
          return jobs;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    changeActiveJobs: async(root, {input}) => {
      try {
        const jobs = await Jobs.findOneAndUpdate({_id: input.id}, input, {
          new: true,
          upsert: true,
          useFindAndModify: false
        })
        return jobs
      } catch (error) {
       throw new Error(error)
      }
    }
  },
};
