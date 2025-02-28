const cupon = require('../model/cupon.js');


const createCupon = async (req, res) => {
    const { code, discount, expiration, orderId } = req.body;
    const newCupon = new cupon({
        code,
        discount,
        expiration,
        order: orderId,
    });
    
    await newCupon.save();

    if (orderId && orderId.length > 0) {
        const order = require('../model/order.js');
        await order.updateMany(
            { _id: orderId }, // Encontra o pedido pelo ID
            { cupon: newCupon._id } // associa o cupom ao pedido
        );
    }

    res.json({
        message: "Cupon criado com sucesso!",
        cupon: newCupon,
    });
}

const getAllCupons = async (req, res) => {
    const cupons = await cupon.find().populate("order");
    res.json(cupons);
}

const getCuponById = async (req, res) => {
    const { id } = req.params;
    const cuponId = await cupon.findById(id).populate("order");
    res.json(cuponId);
}

const deleteCupon = async (req, res) => {
    const { id } = req.params;

    const cuponDelete = await cupon.findById(id);

    await cupon.deleteOne({ _id: id });

    res.json({ message: "Cupon removido com sucesso!" });
}

const editCupon = async (req, res) => {
    const { id } = req.params;
    const { code, discount, expiration } = req.body;
    
    let cupon = await cupon.findByIdAndUpdate(id, { code, discount, expiration });
    
    res.json({
        message: "Cupon atualizado com sucesso!",
        cupon,
    });
}

module.exports = { getAllCupons, createCupon, editCupon, deleteCupon, getCuponById };