const express = require("express");
const router = express.Router();
const productController = require("../controller/productController.js");
const WithAuth = require('../middleware/auth.js');

router.get("/products", WithAuth, productController.getAllProducts);
router.get("/product/:id", productController.getProductById);
router.post("/product", productController.createProduct);
router.delete("/product/:id", productController.deleteProduct);
router.put("/product/:id", productController.editProduct);

module.exports = router;