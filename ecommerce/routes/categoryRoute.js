const express = require("express");
const router = express.Router();
const categoryController = require("../controller/categoryController.js");
const WithAuth = require('../middleware/auth.js');

router.get("/categories", WithAuth, categoryController.getAllCategories);
router.get("/category/:id", WithAuth, categoryController.getCategoryById);
router.post("/category", WithAuth, categoryController.createCategory);
router.delete("/category/:id", WithAuth, categoryController.deleteCategory);
router.put("/category/:id", WithAuth, categoryController.editCategory);

module.exports = router;