const express = require("express");
const router = express.Router();
const categoryController = require("../controller/categoryController.js");
const WithAuth = require('../middleware/auth.js');

router.get("/categories", categoryController.getAllCategories);
router.get("/category/:id", categoryController.getCategoryById);
router.post("/category", categoryController.createCategory);
router.delete("/category/:id", categoryController.deleteCategory);
router.put("/category/:id", categoryController.editCategory);

module.exports = router;