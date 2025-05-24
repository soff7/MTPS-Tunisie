// server/models/Product.js
const mongoose = require('mongoose');
const validator = require('validator');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Le nom du produit est requis'],
    trim: true,
    maxlength: [100, 'Le nom ne peut excéder 100 caractères'],
    validate: {
      validator: function(v) {
        return validator.isAscii(v.replace(/\s/g, ''));
      },
      message: 'Caractères spéciaux non autorisés'
    }
  },
  category: {
    type: String,
    required: [true, 'La catégorie est requise'],
    trim: true,
    enum: {
      values: ['Informatique', 'Bureautique', 'Mobilier', 'Fournitures'],
      message: 'Catégorie {VALUE} non supportée'
    }
  },
  description: {
    type: String,
    required: [true, 'La description est requise'],
    trim: true,
    minlength: [20, 'La description doit contenir au moins 20 caractères'],
    maxlength: [1000, 'Description limitée à 1000 caractères']
  },
  price: {
    type: Number,
    required: [true, 'Le prix est requis'],
    min: [0.99, 'Le prix minimum est 0.99'],
    max: [100000, 'Le prix maximum est 100 000'],
    set: v => parseFloat(v.toFixed(2)) // Garantit 2 décimales
  },
  stock: {
    type: Number,
    required: [true, 'Le stock est requis'],
    min: [0, 'Le stock doit être positif'],
    validate: {
      validator: Number.isInteger,
      message: 'Le stock doit être un entier'
    }
  },
  status: {
    type: String,
    enum: {
      values: ['disponible', 'rupture', 'arrivage', 'commande'],
      message: 'Statut {VALUE} non valide'
    },
    default: 'disponible'
  },
  imageUrl: {
    type: String,
    required: [true, 'L\'URL de l\'image est requise'],
    validate: {
      validator: validator.isURL,
      message: 'URL invalide'
    }
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true, // Ajoute createdAt et updatedAt automatiquement
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index pour optimisation des recherches
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1, status: 1 });

// Middleware pre-save pour mettre à jour lastUpdated
productSchema.pre('save', function(next) {
  this.lastUpdated = Date.now();
  next();
});

// Virtual pour le statut stock
productSchema.virtual('stockStatus').get(function() {
  if (this.stock === 0) return 'épuisé';
  if (this.stock < 5) return 'faible';
  return 'suffisant';
});

module.exports = mongoose.model('Product', productSchema);