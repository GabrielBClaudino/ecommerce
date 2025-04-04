const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    products: [{productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product'}, name: { type: String, required: true }, price: { type: Number, required: true }}],
    totalAmount: { type: Number},
    createdAt: { type: Date, default: Date.now },
    cupon: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cupon' }]
    // varios pedidos podem estar associados a varios cupons
});
OrderSchema.path('products').schema.set('_id', false);

module.exports = mongoose.model('Order', OrderSchema);
