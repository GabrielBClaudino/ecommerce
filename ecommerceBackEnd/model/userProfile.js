const mongoose = require("mongoose");

let userProfileSchema = new mongoose.Schema({
    phone: { type: String},
    address: { type: String},
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    // Um perfil de usuário está associado a um usuário
});

module.exports = mongoose.model("UserProfile", userProfileSchema);