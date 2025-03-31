const mongoose = require("mongoose");


let productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: {type: String, required: true},
    price: { type: Number, required: true },
    storage: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    // Varios produtos podem estar associados a uma categoria
});

module.exports = mongoose.model("Product", productSchema);
