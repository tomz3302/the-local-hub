const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Size and Stock Schema
const sizeSchema = new Schema({
  size: { type: String, required: true },
  stock: { type: Number, required: true }
}, { _id: false });  // Prevent Mongoose from creating _id field for sub-documents


const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  size_stock: [sizeSchema],
  brand: { type: String, required: true },
  material: { type: String, required: true },
  tags: [String],
  created_at: { type: Date, default: Date.now }
});

// Export Product model
module.exports = mongoose.model('Products', productSchema);
