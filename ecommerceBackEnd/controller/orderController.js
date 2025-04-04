const Order = require('../model/order.js');
const Cupon = require('../model/cupon.js');

const createOrder = async (req, res) => {
    try {
        
        const { products, cuponId, userId } = req.body;

        const totalAmount = products.reduce((sum, product) => sum + product.price, 0);

        const newOrder = new Order({
            userId: userId,
            products,
            totalAmount,
            cupon: cuponId,
        });

        await newOrder.save();

        if (cuponId) {
            await Cupon.updateMany(
                { _id: cuponId },
                { order: newOrder._id }
            );
        }

        res.status(201).json({
            message: "Pedido criado com sucesso!",
            order: newOrder,
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro interno, tente novamente' });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("cupon");
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Erro interno, tente novamente' });
    }
};

const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const orderId = await Order.findById(id).populate("cupon");
        res.status(200).json(orderId);
    } catch (error) {
        res.status(500).json({ error: 'Erro interno, tente novamente' });
    }
};

const deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        await Order.findByIdAndDelete(id);
        res.status(200).json({ message: "Pedido removido com sucesso!" });
    } catch (error) {
        res.status(500).json({ error: 'Erro interno, tente novamente' });
    }
};

const editOrder = async (req, res) => {
    const { id } = req.params;
    const { totalAmount } = req.body;
    try {
        let order = await Order.findByIdAndUpdate(id, { totalAmount }, { new: true });
        res.status(200).json({
            message: "Pedido atualizado com sucesso!",
            order,
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro interno, tente novamente' });
    }
};

module.exports = { getAllOrders, createOrder, editOrder, deleteOrder, getOrderById };
