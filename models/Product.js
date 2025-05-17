const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Le nom du produit est requis'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'La catégorie est requise'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'La description est requise'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Le prix est requis'],
    min: [0, 'Le prix doit être positif'],
  },
  stock: {
    type: Number,
    required: [true, 'Le stock est requis'],
    min: [0, 'Le stock doit être positif'],
  },
  status: {
    type: String,
    enum: ['disponible', 'rupture', 'arrivage'],
    default: 'disponible',
  },
  imageUrl: {
    type: String,
    required: [true, 'L\'URL de l\'image est requise'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Product', productSchema);
