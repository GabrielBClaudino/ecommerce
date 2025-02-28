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

  await newProduct.save();

  res.json({
    message: "Produto criado com sucesso!",
    product: newProduct,
  });
};

const getAllProducts = async (req, res) => {
  const products = await Product.find().populate("category");
  res.json(products);
};

const getProductById = async (req, res) => { 
  const { id } = req.params;
  const product = await Product.findById(id).populate("category");
  res.json(product);
}

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  await Product.deleteOne({ _id: id });
  res.json({ message: "Produto removido com sucesso!" });
};

const editProduct = async (req, res) => {
  const { id } = req.params;
  const { name, src, storage } = req.body;

  let product = await Product.findByIdAndUpdate(id, { name, src, storage });

  res.json({
    message: "Produto atualizado com sucesso!",
    product,
  });
};

module.exports = { getAllProducts, createProduct, editProduct, deleteProduct, getProductById };
