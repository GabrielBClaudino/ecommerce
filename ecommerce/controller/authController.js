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
        res.status(500).json({ error: 'Erro ao registrar usuário' });
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
            res.json({ user, token });
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro interno, tente novamente' });
    }
};

const getAllUsers = async (req, res) => {
    const users = await User.find().populate("profile");
    res.json(users);
};

const deleteUser = async (req, res) => {
    const { id } = req.params;

    await User.findByIdAndDelete(id);

    res.json({ message: "Usuário removido com sucesso!" });
}

const editUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    let user = await User
.findByIdAndUpdate(id, { name, email, password });

    res.json({
        message: "Usuário atualizado com sucesso!",
        user,
    });
}
const getUser = async (req, res) => {  
    const { id } = req.params;  
    const user = await User.findById(id).populate("profile");
    res.json(user);
}

module.exports = {
    login, register, getAllUsers, deleteUser, editUser, getUser
};

