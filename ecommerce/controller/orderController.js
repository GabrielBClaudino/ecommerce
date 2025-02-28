const order=require('../model/order.js');
const cupon=require('../model/cupon.js');

const createOrder = async (req, res) => {
    const {totalAmount, cuponId} = req.body;
    const newOrder = new order({
        totalAmount,
        cupon: cuponId,
    });

    await newOrder.save();

    await cupon.updateMany(
        { _id: cuponId }, // Encontra o cupom pelo ID
        { order: newOrder._id } // associa o pedido ao cupom
    )

    res.json({
        message: "Pedido criado com sucesso!",
        order: newOrder,
    });
}

const getAllOrders = async (req, res) => {
    const orders = await order.find().populate("cupon");
    res.json(orders);
}

const getOrderById = async (req, res) => {
    const { id } = req.params;
    const orderId = await order.findById(id).populate("cupon");
    res.json(orderId);
}

const deleteOrder = async (req, res) => {
    const { id } = req.params;

    const orderDelete = await order.findById(id);

    await order.deleteOne({ _id: id });

    res.json({ message: "Pedido removido com sucesso!" });
}

const editOrder = async (req, res) => {
    const { id } = req.params;
    const { totalAmount } = req.body;
    
    let order = await order.findByIdAndUpdate(id, { totalAmount });

    res.json({
        message: "Pedido atualizado com sucesso!",
        order,
    });
}

module.exports = { getAllOrders, createOrder, editOrder, deleteOrder, getOrderById };