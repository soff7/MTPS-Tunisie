// contact.js
const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const jwt = require('jsonwebtoken');
const { sendEmail } = require('../utils/email'); // استيراد دالة إرسال البريد

// Middleware للتحقق من التوكن
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ success: false, message: 'Token manquant' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Token invalide' });
  }
};

// Reply to a contact
router.put('/:id/reply', verifyToken, async (req, res) => {
  try {
    // التحقق من أن المستخدم هو admin أو superadmin
    if (req.user.role !== 'admin' && req.user.role !== 'superadmin') {
      return res.status(403).json({
        success: false,
        message: 'Accès refusé : Seuls les administrateurs peuvent répondre aux contacts',
      });
    }

    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact non trouvé' });
    }

    const { reply } = req.body;
    if (!reply || reply.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: 'La réponse doit contenir au moins 10 caractères',
      });
    }

    // تحديث الرسالة
    contact.reply = reply;
    contact.status = 'Replied';
    const updatedContact = await contact.save();

    // إرسال الرد إلى بريد العميل الإلكتروني
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a73e8;">Réponse à votre message</h2>
        <p>Bonjour ${contact.name},</p>
        <p>Merci pour votre message concernant "${contact.subject}". Voici notre réponse :</p>
        <blockquote style="border-left: 4px solid #1a73e8; padding-left: 16px; color: #333;">
          ${reply}
        </blockquote>
        <p>Si vous avez d'autres questions, n'hésitez pas à nous contacter.</p>
        <p>Cordialement,<br>L'équipe de support</p>
      </div>
    `;

    await sendEmail({
      to: contact.email,
      subject: `Réponse à votre message: ${contact.subject}`,
      text: `Bonjour ${contact.name},\n\nMerci pour votre message concernant "${contact.subject}". Voici notre réponse :\n\n${reply}\n\nCordialement,\nL'équipe de support`,
      html: emailContent,
    });

    res.json({ success: true, data: updatedContact });
  } catch (err) {
    console.error('Erreur lors de la réponse au contact:', err);
    res.status(400).json({ success: false, message: err.message });
  }
});

// باقي نقاط النهاية (get, post, delete) كما هي
router.get('/', verifyToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user.role !== 'superadmin') {
      return res.status(403).json({
        success: false,
        message: 'Accès refusé : Seuls les administrateurs peuvent consulter les contacts',
      });
    }
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, data: contacts });
  } catch (err) {
    console.error('Erreur lors de la récupération des contacts:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/', verifyToken, async (req, res) => {
  try {
    if (req.user.role === 'admin' || req.user.role === 'superadmin') {
      return res.status(403).json({
        success: false,
        message: 'Accès refusé : En tant qu\'administrateur, vous n\'êtes pas autorisé à envoyer des messages via ce formulaire de contact.',
      });
    }
    const { name, companyName, email, subject, otherSubject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Tous les champs obligatoires doivent être remplis',
      });
    }
    if (message.length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Le message doit contenir au moins 10 caractères',
      });
    }
    const finalSubject = subject === 'autre' ? otherSubject : subject;
    const contact = new Contact({
      name,
      companyName: companyName || '',
      email,
      subject: finalSubject,
      otherSubject: subject === 'autre' ? otherSubject : '',
      message,
      userId: req.user.id,
    });
    const newContact = await contact.save();
    res.status(201).json({
      success: true,
      message: 'Votre message a été envoyé avec succès!',
      data: newContact,
    });
  } catch (err) {
    console.error('Erreur lors de la création du contact:', err);
    res.status(400).json({
      success: false,
      message: err.message || 'Erreur lors de l\'envoi du message',
    });
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user.role !== 'superadmin') {
      return res.status(403).json({
        success: false,
        message: 'Accès refusé : Seuls les administrateurs peuvent supprimer des contacts',
      });
    }
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact non trouvé' });
    }
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Contact supprimé avec succès' });
  } catch (err) {
    console.error('Erreur lors de la suppression du contact:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;