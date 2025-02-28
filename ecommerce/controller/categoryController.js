const Category = require('../model/category.js');

const createCategory = async (req, res) => {
    const { name, description } = req.body;

    const newCategory = new Category({
        name,
        description
    });

    await newCategory.save();

    res.json({
        message: "Categoria criada com sucesso!",
        category: newCategory,
    });
};

const getAllCategories = async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
}

const getCategoryById = async (req, res) => {
    const { id } = req.params;
    const category = await Category.findById(id);
    res.json(category);
}

const deleteCategory = async (req, res) => {    
    const { id } = req.params;

    const category = await Category.findById(id);

    await Category.deleteOne({ _id: id});

    res.json({ message: "Categoria removida com sucesso!" });
}   

const editCategory = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    let category = await Category.findByIdAndUpdate(id, { name, description }); 

    res.json({
        message: "Categoria atualizada com sucesso!",
        category,
    });
}

module.exports = { getAllCategories, createCategory, editCategory, deleteCategory, getCategoryById };