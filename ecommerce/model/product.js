const mongoose = require("mongoose");


let productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    src: {type: String, required: true},
    storage: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    // Varios produtos podem estar associados a uma categoria
});

module.exports = mongoose.model("Product", productSchema);
