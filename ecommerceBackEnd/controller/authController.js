const jwt = require('jsonwebtoken');
const User = require('../model/user.js');
require('dotenv').config();

const secret = process.env.JWT_SECRET; 

const register = async (req, res) => {
    const { name, email, password, profileId } = req.body;
    const user = new User({ name, email, password, profile: profileId });

    try {
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Erro interno, tente novamente' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(401).json({ error: 'Email ou senha incorretos' });

        user.isCorrectPassword(password, (err, same) => {
            if (!same) return res.status(401).json({ error: 'Email ou senha incorretos' });

            // Gerar o token JWT
            const token = jwt.sign({ email }, secret, { expiresIn: '30d' });
            res.status(200).json({ user, token });
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro interno, tente novamente' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().populate("profile");
        res.status(200).json(users);
        
    } catch (error) {
        res.status(500).json({ error: 'Erro interno, tente novamente' });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    
    try {
        await User.findByIdAndDelete(id);
    
        res.status(200).json({ message: "Usuário removido com sucesso!" });
        
    } catch (error) {
        res.status(500).json({ error: 'Erro interno, tente novamente' });
    }
}

const editUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    try {
        let user = await User
    .findByIdAndUpdate(id, { name, email, password });
    
        res.status(200).json({
            message: "Usuário atualizado com sucesso!",
            user,
        });
        
    } catch (error) {
        res.status(500).json({ error: 'Erro interno, tente novamente' });
    }
}
const getUser = async (req, res) => {  
    const { id } = req.params;  
    try {
        const user = await User.findById(id).populate("profile");
        res.status(200).json(user);
        
    } catch (error) {
        res.status(500).json({ error: 'Erro interno, tente novamente' });
    }
}

module.exports = {
    login, register, getAllUsers, deleteUser, editUser, getUser
};

