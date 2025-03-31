const userProfile = require('../model/userprofile.js');
const User = require('../model/user.js');

const createUserProfile = async (req, res) => {
    const {phone, address, userId} = req.body;

    const newUserProfile = new userProfile({
        phone,
        address,
        user: userId,
    });
    try {
        await newUserProfile.save();
    
        await User.updateOne(
            { _id: userId }, // Encontra o usuário pelo ID
            { profile: newUserProfile._id } // associa o perfil de usuário ao usuário
        )
        res.status(201).json({
            message: "Perfil de usuário criado com sucesso!",
            userProfile: newUserProfile,
        });
    
    } catch (error) {
      res.status(500).json({ error: 'Erro interno, tente novamente' });
    }
};

const getAllUserProfiles = async (req, res) => {
    try {
        const userProfiles = await userProfile.find().populate("user");
        res.status(200).json(userProfiles);
    
    } catch (error) {
      res.status(500).json({ error: 'Erro interno, tente novamente' });
    }
}

const getUserProfileById = async (req, res) => {
    const { id } = req.params;
    try {
        const userProfileId = await userProfile.findById(id).populate("user");
        res.status(200).json(userProfileId);
    
    } catch (error) {
      res.status(500).json({ error: 'Erro interno, tente novamente' });
    }
}

const deleteUserProfile = async (req, res) => {
    const { id } = req.params;
    try {
        const userProfileDelete = await userProfile.findById(id);
    
        await userProfile.deleteOne({ _id: id });
        
        res.status(200).json({ message: "Perfil de usuário removido com sucesso!" });
    
    } catch (error) {
      res.status(500).json({ error: 'Erro interno, tente novamente' });
    }
}

const editUserProfile = async (req, res) => {
    const { id } = req.params;
    const { phone, address } = req.body;
    try {
        let userProfile = await userProfile.findByIdAndUpdate(id, { phone, address });
    
        res.status(200).json({
            message: "Perfil de usuário atualizado com sucesso!",
            userProfile,
        });
    
    } catch (error) {
      res.status(500).json({ error: 'Erro interno, tente novamente' });
    }
}

module.exports = { getAllUserProfiles, createUserProfile, editUserProfile, deleteUserProfile, getUserProfileById };