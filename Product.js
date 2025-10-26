const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: String,
  price: { type: Number, required: true, default: 0 },
  stock: { type: Number, required: true, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
