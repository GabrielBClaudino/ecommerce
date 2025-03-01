const categoryController = require('../controller/categoryController.js');

const revolvers={
    Query:{
        categories: async () => await categoryController.getCategories(),
        category: async (_, {id}) => await categoryController.getCategoryById(id),
    },
    Mutation: {
        createCategory: async (_, {name, description}) => {
            return await categoryController.createCategory(name, description);
        },
        updateCategory: async (_, {id, name, description}) => {
            return await categoryController.editCategory(id, name, description);
        },
        deleteCategory: async (_, {id}) => {
            return await categoryController.deleteCategory(id);
        },
    },
};

module.exports = revolvers;