const moongoose = require('mongoose');

let orderSchema = new moongoose.Schema({
    totalAmount: { type: Number, required: true },
    created_at: { type: Date, default: Date.now },
    cupon: [{ type: moongoose.Schema.Types.ObjectId, ref: 'Cupon' }],
    // varios pedidos podem estar associados a varios cupons
});

module.exports = moongoose.model('Order', orderSchema);