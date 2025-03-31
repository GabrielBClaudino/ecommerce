const Category = require('../model/category.js');

const createCategory = async (req, res) => {
    const { name, description } = req.body;

    const newCategory = new Category({
        name,
        description
    });

    try {
        await newCategory.save();
    
        res.status(201).json({
            message: "Categoria criada com sucesso!",
            category: newCategory,
        });
        
    } catch (error) {
        res.status(500).json({ error: 'Erro interno, tente novamente' });
    }
};

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
        
    } catch (error) {
        res.status(500).json({ error: 'Erro interno, tente novamente' });
    }
}

const getCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.findById(id);
        res.status(200).json(category);
        
    } catch (error) {
        res.status(500).json({ error: 'Erro interno, tente novamente' });
    }
}

const deleteCategory = async (req, res) => {    
    const { id } = req.params;
    try {
        const category = await Category.findById(id);
    
        await Category.deleteOne({ _id: id});
    
        res.status(200).json({ message: "Categoria removida com sucesso!" });
        
    } catch (error) {
        res.status(500).json({ error: 'Erro interno, tente novamente' });
    }
}   

const editCategory = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        let category = await Category.findByIdAndUpdate(id, { name, description }); 
    
        res.status(200).json({
            message: "Categoria atualizada com sucesso!",
            category,
        });
        
    } catch (error) {
        res.status(500).json({ error: 'Erro interno, tente novamente' });
    }
}

module.exports = { getAllCategories, createCategory, editCategory, deleteCategory, getCategoryById };