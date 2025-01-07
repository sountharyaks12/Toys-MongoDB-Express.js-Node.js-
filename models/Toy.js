// models/Toy.js
const mongoose = require('mongoose');

const toySchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    stock: { type: Number, default: 0 }
});

module.exports = mongoose.model('Toy', toySchema);
