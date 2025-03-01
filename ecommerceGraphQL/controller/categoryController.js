const Category = require('../model/category.js');

const createCategory = async (name,description)=>{
    const newCategory = new Category({
        name,
        description,
    });

    await newCategory.save();

    return newCategory;
};

const getCategories = async ()=>{
    return await Category.find();
}

const getCategoryById = async (id)=>{
    try {
        const category = await Category.findById(id);
        if (!category) {
            throw new Error('Categoria não encontrada');
        }
        return category;
    } catch (error) {
        throw new Error("Error ao buscar categoria");
    }
};

const deleteCategory = async (id)=>{
    try {
        const category = await Category.findById(id);
        if (!category) {
            throw new Error('Categoria não encontrada');
        }
        await Category.deleteOne({ _id: id });
        return true;
    } catch (error) {
        throw new Error("Error ao deletar categoria");
    }
};

const editCategory = async (id,name,description)=>{
    try {
        let category = await Category.findByIdAndUpdate(id, { name, description });
        if (!category) {
            throw new Error('Categoria não encontrada');
        }
        return category;
    } catch (error) {
        throw new Error("Error ao editar categoria");
    }
};

module.exports = { createCategory, getCategories, getCategoryById, deleteCategory, editCategory };
