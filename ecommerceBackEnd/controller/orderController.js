const order=require('../model/order.js');
const cupon=require('../model/cupon.js');

const createOrder = async (req, res) => {
    const {totalAmount, cuponId} = req.body;
    const newOrder = new order({
        totalAmount,
        cupon: cuponId,
    });

    try {
        await newOrder.save();
    
        await cupon.updateMany(
            { _id: cuponId }, // Encontra o cupom pelo ID
            { order: newOrder._id } // associa o pedido ao cupom
        )
    
        res.status(201).json({
            message: "Pedido criado com sucesso!",
            order: newOrder,
        });
        
    } catch (error) {
        res.status(500).json({ error: 'Erro interno, tente novamente' });
    }
}

const getAllOrders = async (req, res) => {
    try {
        const orders = await order.find().populate("cupon");
        res.status(200).json(orders);
        
    } catch (error) {
        res.status(500).json({ error: 'Erro interno, tente novamente' });
    }
}

const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const orderId = await order.findById(id).populate("cupon");
        res.status(200).json(orderId);
        
    } catch (error) {
        res.status(500).json({ error: 'Erro interno, tente novamente' });
    }
}

const deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const orderDelete = await order.findById(id);
    
        await order.deleteOne({ _id: id });
    
        res.status(200).json({ message: "Pedido removido com sucesso!" });
        
    } catch (error) {
        res.status(500).json({ error: 'Erro interno, tente novamente' });
    }
}

const editOrder = async (req, res) => {
    const { id } = req.params;
    const { totalAmount } = req.body;
    try {
        let order = await order.findByIdAndUpdate(id, { totalAmount });
    
        res.status(200).json({
            message: "Pedido atualizado com sucesso!",
            order,
        });
        
    } catch (error) {
        res.status(500).json({ error: 'Erro interno, tente novamente' });
    }
}

module.exports = { getAllOrders, createOrder, editOrder, deleteOrder, getOrderById };