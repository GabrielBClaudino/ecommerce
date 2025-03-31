const Product = require("../model/product.js");

const createProduct = async (name, image, price, storage) => {

  const newProduct = new Product({
    name,
    image,
    price,
    storage,
  });

    await newProduct.save();
  
    return newProduct;
};

const getAllProducts = async () => {
  
  return await Product.find();
    
};

const getProductById = async (id) => { 
    try {
      const product = await Product.findById(id)
        if (!product) {
          throw new Error('Produto não encontrado');
        }
      return product;
    } catch (error) {
      throw new Error("Error ao buscar Produto");
    }
}

const deleteProduct = async (id) => {
  try {
    const product = await Product.findById(id)
      if (!product) {
        throw new Error('Produto não encontrado');
      }
    await product.deleteOne({ _id: id });
    return true;
  } catch (error) {
    throw new Error("Error ao deletar Produto");
  }
};

const editProduct = async ( id, name, image, price, storage) => {
  try {
    let product = await Product.findByIdAndUpdate(id, { name, image, price, storage });
    if (!product) {
      throw new Error('Produto não encontrada');
    }
    return product;
    } catch (error) {
      throw new Error("Error ao editar Produto");
    }
};

module.exports = { getAllProducts, createProduct, editProduct, deleteProduct, getProductById };
