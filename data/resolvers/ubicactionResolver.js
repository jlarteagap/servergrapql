import { Ubication } from "../models/ubication.js";

export const ubicationResolvers = {
    Query: {
        allUbication: () => {
            return Ubication.find({});
        }
    },
    Mutation: {
        ubication: async (root, { input }) => {

            const createUbication = new Ubication({
                name: input.name,
                cities: input.cities,
                createat: new Date().toISOString(),
            })
            createUbication.id = createUbication._id;

            return new Promise((resolve, object) => {
                createUbication.save((error) => {
                    if (error) rejects(error);
                    else resolve(createUbication);
                });
            });
        }
    }
}