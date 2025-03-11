const cupon = require('../model/cupon.js');


const createCupon = async (req, res) => {
    const { code, discount, expiration, orderId } = req.body;
    const newCupon = new cupon({
        code,
        discount,
        expiration,
        order: orderId,
    });
    try {
        await newCupon.save();
    
        if (orderId && orderId.length > 0) {
            const order = require('../model/order.js');
            await order.updateMany(
                { _id: orderId }, // Encontra o pedido pelo ID
                { cupon: newCupon._id } // associa o cupom ao pedido
            );
        }
    
        res.status(201).json({
            message: "Cupom criado com sucesso!",
            cupon: newCupon,
        });
        
    } catch (error) {
        res.status(500).json({ error: 'Erro interno, tente novamente' });
    }
}

const getAllCupons = async (req, res) => {
    try {
        const cupons = await cupon.find().populate("order");
        res.status(200).json(cupons);
        
    } catch (error) {
        res.status(500).json({ error: 'Erro interno, tente novamente' });
    }
}

const getCuponById = async (req, res) => {
    const { id } = req.params;
    try {
        const cuponId = await cupon.findById(id).populate("order");
        res.status(200).json(cuponId);
        
    } catch (error) {
        res.status(500).json({ error: 'Erro interno, tente novamente' });
    }
}

const deleteCupon = async (req, res) => {
    const { id } = req.params;
    try {
        const cuponDelete = await cupon.findById(id);
    
        await cupon.deleteOne({ _id: id });
    
        res.status(200).json({ message: "Cupom removido com sucesso!" });
        
    } catch (error) {
        res.status(500).json({ error: 'Erro interno, tente novamente' });
    }
}

const editCupon = async (req, res) => {
    const { id } = req.params;
    const { code, discount, expiration } = req.body;
    try {
        let cupon = await cupon.findByIdAndUpdate(id, { code, discount, expiration });
        
        res.status(200).json({
            message: "Cupom atualizado com sucesso!",
            cupon,
        });
        
    } catch (error) {
        res.status(500).json({ error: 'Erro interno, tente novamente' });
    }
}

module.exports = { getAllCupons, createCupon, editCupon, deleteCupon, getCuponById };