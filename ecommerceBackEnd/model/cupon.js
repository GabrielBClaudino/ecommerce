const mongoose = require("mongoose");

let cuponSchema = new mongoose.Schema({
    code: { type: String, required: true },
    discount: { type: Number, required: true },
    expiration: { type: Date, required: true },
    order: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    // Varios cupons podem estar associados a varios pedidos
});

module.exports = mongoose.model("Cupon", cuponSchema);
