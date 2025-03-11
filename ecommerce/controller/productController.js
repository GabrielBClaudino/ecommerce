const Product = require("../model/product.js");

const createProduct = async (req, res) => {
  const { name, src, storage, categoryId } = req.body;

  const newProduct = new Product({
    name,
    src,
    storage,
    category: categoryId,
    // Varios produtos podem estar associados a uma categoria
    // atraves do categoryId
 
  });
  try {
    await newProduct.save();
  
    res.status(201).json({
      message: "Produto criado com sucesso!",
      product: newProduct,
    });
    
  } catch (error) {
    res.status(500).json({ error: 'Erro interno, tente novamente' });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.status(200).json(products);
    
  } catch (error) {
    res.status(500).json({ error: 'Erro interno, tente novamente' });
  }
};

const getProductById = async (req, res) => { 
  const { id } = req.params;
  try {
    const product = await Product.findById(id).populate("category");
    res.status(200).json(product);
    
  } catch (error) {
    res.status(500).json({ error: 'Erro interno, tente novamente' });
  }
}

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
  
    await Product.deleteOne({ _id: id });
    res.status(200).json({ message: "Produto removido com sucesso!" });
    
  } catch (error) {
    res.status(500).json({ error: 'Erro interno, tente novamente' });
  }
};

const editProduct = async (req, res) => {
  const { id } = req.params;
  const { name, src, storage } = req.body;
  try {
    let product = await Product.findByIdAndUpdate(id, { name, src, storage });
  
    res.status(200).json({
      message: "Produto atualizado com sucesso!",
      product,
    });
    
  } catch (error) {
    res.status(500).json({ error: 'Erro interno, tente novamente' });
  }
};

module.exports = { getAllProducts, createProduct, editProduct, deleteProduct, getProductById };
