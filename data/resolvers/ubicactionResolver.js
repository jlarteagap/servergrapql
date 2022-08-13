import { Ubication } from "../models/ubicationModel.js";

export const ubicationResolvers = {
    Query: {
        allUbication: () => {
            return Ubication.find({});
        }
    },
    Mutation: {
        ubication: async (root, { input }) => {
            console.log(input);
            const createUbication = new Ubication({
                name: input.name,
                cities: input.cities,
                remote: input.remote
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