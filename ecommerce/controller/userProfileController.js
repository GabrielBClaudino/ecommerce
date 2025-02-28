const userProfile = require('../model/userprofile.js');
const User = require('../model/user.js');

const createUserProfile = async (req, res) => {
    const {phone, address, userId} = req.body;

    const newUserProfile = new userProfile({
        phone,
        address,
        user: userId,
    });

    await newUserProfile.save();

    await User.updateOne(
        { _id: userId }, // Encontra o usuário pelo ID
        { profile: newUserProfile._id } // associa o perfil de usuário ao usuário
    )
    res.json({
        message: "Perfil de usuário criado com sucesso!",
        userProfile: newUserProfile,
    });
};

const getAllUserProfiles = async (req, res) => {
    const userProfiles = await userProfile.find().populate("user");
    res.json(userProfiles);
}

const getUserProfileById = async (req, res) => {
    const { id } = req.params;
    const userProfileId = await userProfile.findById(id).populate("user");
    res.json(userProfileId);
}

const deleteUserProfile = async (req, res) => {
    const { id } = req.params;

    const userProfileDelete = await userProfile.findById(id);

    await userProfile.deleteOne({ _id: id });
    
    res.json({ message: "Perfil de usuário removido com sucesso!" });
}

const editUserProfile = async (req, res) => {
    const { id } = req.params;
    const { phone, address } = req.body;

    let userProfile = await userProfile.findByIdAndUpdate(id, { phone, address });

    res.json({
        message: "Perfil de usuário atualizado com sucesso!",
        userProfile,
    });
}

module.exports = { getAllUserProfiles, createUserProfile, editUserProfile, deleteUserProfile, getUserProfileById };