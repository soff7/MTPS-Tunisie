const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  companyName: { type: String }, // Nouveau champ
  email: { type: String, required: true },
  subject: { type: String, required: true }, // Nouveau champ
  otherSubject: { type: String }, // Nouveau champ
  message: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Replied'], default: 'Pending' },
  reply: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // ID de l'utilisateur qui envoie le message
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Contact', contactSchema);