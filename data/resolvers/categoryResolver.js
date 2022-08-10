import {Category} from '../models/categoriesModel.js';

export const categoryResolvers = {
    Query: {
        allCategories: () => {
            return Category.find({});
        }
    },
    Mutation: {
        category: async (root, { input }) => {
            console.log(input);
            const createCategory = new Category({
                name: input.name,
                value: input.value,
                slug: input.slug,
            })
            createCategory.id = createCategory._id;

            return new Promise((resolve, object) => {
                createCategory.save((error) => {
                    if (error) rejects(error);
                    else resolve(createCategory);
                });
            });
        }
    }
}