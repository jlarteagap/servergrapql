import express from 'express';
import mongoose from 'mongoose'
import { Jobs } from './db.js'

export const resolvers = {
    Query: {
        getJobs : (root, {limit, offset}) => {
            return Jobs.find({}).limit(limit).skip(offset)
        }
    },
    // Mutaciones
    Mutation: {
        addJob : (root, { input }) => {
            const addJob = new Jobs({
                company: input.company,
                logo: input.logo,
                position: input.position,
                category: input.category,
                city: input.city,
                country: 'Bolivia',
                link: input.link,
                email: input.email,
                remote: input.remote,
                startDate: new Date(),
                tags: input.tags
            });

            addJob.id = addJob._id;

            return new Promise((resolve, object) => {
                addJob.save((error) => {
                    if(error) rejects(error)
                    else resolve(addJob)
                })
            });
        }
    }
}