const productController = require('../controller/productController.js');

const revolvers={
    Query:{
        products: async () => await productController.getAllProducts(),
        product: async (_, {id}) => await productController.getProductById(id),
    },
    Mutation: {
        createProduct: async (_, {name, image, price, storage }) => {
            return await productController.createProduct(name, image, price, storage );
        },
        updateProduct: async (_, {id, name, image, price, storage }) => {
            return await productController.editProduct(id, name, image, price, storage );
        },
        deleteProduct: async (_, {id}) => {
            return await productController.deleteProduct(id);
        },
    },
};

module.exports = revolvers;