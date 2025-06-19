const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: String,
  companyName: String,
  email: String,
  subject: String,
  message: String,
  reply: String,
  status: {
    type: String,
    enum: ['Pending', 'Read', 'Replied'],
    default: 'Pending'
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  readAt: Date,
  readBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  repliedAt: Date,
  repliedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
