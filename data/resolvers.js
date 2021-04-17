import express from 'express';
import mongoose from 'mongoose'
import { Jobs } from './db.js'

export const resolvers = {
    Query: {
        getJobs : (root, {limit, offset}) => {
            return Jobs.find({}).limit(limit).skip(offset).sort({startDate: -1})
        },
        //Seleccion por Categorias
        byCategories: (root, {category, limit, offset}) => {
            return new Promise((resolve, object) => {
                Jobs.find({category: category}, (error, category) => {
                    if(error) rejects(error)
                    else resolve(category)
                }).limit(limit).skip(offset).sort({startDate: -1})
            })
        },

        // Seleccion por Tags
        byTags:(root, {tags, limit, offset}) => {
            return new Promise((resolve, object) => {
                Jobs.find({tags: tags}, (error, tags) => {
                    if(error) rejects(error)
                    else resolve(tags)
                })
            })
        },
        totalJobs : (root) => {
            return new Promise((resolve, object) => {
                Jobs.countDocuments({}, (error, count) => {
                    if(error) rejects(error)
                    else resolve(count)
                })
            })
        },
        totalCategories : (root, {category})  =>{
            return new Promise((resolve, object) => {
                Jobs.countDocuments({category: category}, (error, count) => {
                    if(error) rejects(error)
                    else resolve(count)
                })
            })
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