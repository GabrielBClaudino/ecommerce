const mongoose = require("mongoose");

let productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: {type: String, required: true},
    price: { type: Number, required: true },
    storage: { type: Number, required: true },
});

module.exports = mongoose.model("Product", productSchema);
