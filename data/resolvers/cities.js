import { Cities } from "../models/citiesModel.js";

export const citiesResolvers = {
    Query: {
        allCities: () => {
            return Cities.find({})
        }
    },
    Mutation: {
        city: async (root, { input }) => {
            const createCity = new Cities({
                name: input.name,
                value: input.value,
                slug: input.slug,
                createdAt: new Date().toISOString(),
            });

            createCity.id = createCity._id;

            return new Promise((resolve, object) => {
                createCity.save((error) => {
                    if (error) rejects(error);
                    else resolve(createCity);
                });
            });
        }
    }
}