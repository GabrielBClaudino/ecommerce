const mongoose = require('mongoose');

let categorySchema = new mongoose.Schema({
    name: { type: String, required: true},
    description: { type: String},
});

module.exports = mongoose.model('Category', categorySchema);