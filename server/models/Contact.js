const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Le nom est requis']
  },
  company: {  // Modifié de companyName à company
    type: String,
    default: ''
  },
  email: {
    type: String,
    required: [true, 'L\'email est requis'],
    match: [/^\S+@\S+\.\S+$/, 'Format d\'email invalide']
  },
  subject: {
    type: String,
    required: [true, 'Le sujet est requis']
    // Suppression des restrictions de valeurs si nécessaire
  },
  message: {
    type: String,
    required: [true, 'Le message est requis'],
    minlength: [5, 'Le message doit contenir au moins 5 caractères'] // Modifié à 5 caractères minimum
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['nouveau', 'lu', 'en-traitement', 'résolu'],
    default: 'nouveau'
  }
});

module.exports = mongoose.model('Contact', contactSchema);