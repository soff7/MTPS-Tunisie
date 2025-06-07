const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Le nom du produit est requis'],
    trim: true
  },
  category: { 
    type: String, 
    required: [true, 'La catégorie est requise'],
    trim: true
  },
  image: { 
    type: String,
    default: null
  },
  techSheet: { 
    type: String,
    default: null
  },
  description: { 
    type: String,
    default: '',
    trim: true
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Middleware pour mettre à jour updatedAt
productSchema.pre('save', function(next) {
  if (this.isModified() && !this.isNew) {
    this.updatedAt = Date.now();
  }
  next();
});

// Index pour optimiser les requêtes
productSchema.index({ name: 1 });
productSchema.index({ category: 1 });
productSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Product', productSchema);