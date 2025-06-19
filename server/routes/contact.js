const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { sendEmail } = require('../utils/email');
const auth = require('../middleware/auth'); // Middleware d'authentification

// Obtenir tous les contacts (protégé - admin seulement)
router.get('/', auth, async (req, res) => {
  try {
    // Vérifier si l'utilisateur est admin
    if (req.user.role !== 'admin' && req.user.role !== 'superadmin') {
      return res.status(403).json({ message: 'Accès refusé' });
    }

    const contacts = await Contact.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    
    res.json(contacts);
  } catch (err) {
    console.error('Erreur lors de la récupération des contacts:', err);
    res.status(500).json({ message: err.message });
  }
});

// Créer un nouveau contact
router.post('/', auth, async (req, res) => {
  try {
    // Vérifier que l'utilisateur n'est pas admin
    if (req.user.role === 'admin' || req.user.role === 'superadmin') {
      return res.status(403).json({ 
        message: 'Les administrateurs ne peuvent pas envoyer de messages via ce formulaire' 
      });
    }

    const { name, companyName, email, subject, otherSubject, message } = req.body;

    // Validation des données
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        message: 'Tous les champs obligatoires doivent être remplis' 
      });
    }

    if (subject === 'autre' && !otherSubject) {
      return res.status(400).json({ 
        message: 'Veuillez préciser votre sujet' 
      });
    }

    if (message.length < 10) {
      return res.status(400).json({ 
        message: 'Le message doit contenir au moins 10 caractères' 
      });
    }

    const finalSubject = subject === 'autre' ? otherSubject : subject;

    const contact = new Contact({
      name,
      companyName,
      email,
      subject: finalSubject,
      message,
      userId: req.user.id,
      status: 'Pending'
    });

    const newContact = await contact.save();
    await newContact.populate('userId', 'name email');
    
    res.status(201).json(newContact);
  } catch (err) {
    console.error('Erreur lors de la création du contact:', err);
    res.status(400).json({ message: err.message });
  }
});

// Répondre à un contact et envoyer un email
router.put('/:id/reply', auth, async (req, res) => {
  try {
    // Vérifier si l'utilisateur est admin
    if (req.user.role !== 'admin' && req.user.role !== 'superadmin') {
      return res.status(403).json({ message: 'Accès refusé' });
    }

    const { reply } = req.body;
    
    if (!reply || reply.trim() === '') {
      return res.status(400).json({ message: 'La réponse ne peut pas être vide' });
    }

    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact non trouvé' });
    }

    // Mettre à jour le contact
    contact.reply = reply;
    contact.status = 'Replied';
    contact.repliedAt = new Date();
    contact.repliedBy = req.user.id;

    const updatedContact = await contact.save();

    // Envoyer l'email de réponse
    try {
      const emailSubject = `Réponse à votre message: ${contact.subject}`;
      const emailText = `
Bonjour ${contact.name},

Merci pour votre message concernant "${contact.subject}".

Votre message:
"${contact.message}"

Notre réponse:
${reply}

Cordialement,
L'équipe MTPS Tunisie
      `;

      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Réponse à votre message</h2>
          
          <p>Bonjour <strong>${contact.name}</strong>,</p>
          
          <p>Merci pour votre message concernant "<strong>${contact.subject}</strong>".</p>
          
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4 style="margin-top: 0; color: #374151;">Votre message:</h4>
            <p style="font-style: italic;">"${contact.message}"</p>
          </div>
          
          <div style="background-color: #eff6ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4 style="margin-top: 0; color: #2563eb;">Notre réponse:</h4>
            <p>${reply.replace(/\n/g, '<br>')}</p>
          </div>
          
          <p>Cordialement,<br>
          <strong>L'équipe MTPS Tunisie</strong></p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 12px; color: #6b7280;">
            Cet email a été envoyé automatiquement. Si vous avez d'autres questions, n'hésitez pas à nous contacter.
          </p>
        </div>
      `;

      await sendEmail({
        to: contact.email,
        subject: emailSubject,
        text: emailText,
        html: emailHtml
      });

      console.log(`Email de réponse envoyé à ${contact.email}`);
    } catch (emailError) {
      console.error('Erreur lors de l\'envoi de l\'email:', emailError);
      // Ne pas faire échouer la requête si l'email échoue
      // Le contact est quand même marqué comme répondu
    }

    await updatedContact.populate('userId', 'name email');
    res.json(updatedContact);
  } catch (err) {
    console.error('Erreur lors de la réponse au contact:', err);
    res.status(400).json({ message: err.message });
  }
});

// Marquer un contact comme lu (sans envoyer d'email)
router.put('/:id/mark-read', auth, async (req, res) => {
  try {
    // Vérifier si l'utilisateur est admin
    if (req.user.role !== 'admin' && req.user.role !== 'superadmin') {
      return res.status(403).json({ message: 'Accès refusé' });
    }

    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact non trouvé' });
    }

    // Marquer comme lu
    contact.status = 'Read';
    contact.readAt = new Date();
    contact.readBy = req.user.id;

    const updatedContact = await contact.save();
    await updatedContact.populate('userId', 'name email');
    
    res.json(updatedContact);
  } catch (err) {
    console.error('Erreur lors du marquage comme lu:', err);
    res.status(400).json({ message: err.message });
  }
});

// Supprimer un contact
router.delete('/:id', auth, async (req, res) => {
  try {
    // Vérifier si l'utilisateur est admin
    if (req.user.role !== 'admin' && req.user.role !== 'superadmin') {
      return res.status(403).json({ message: 'Accès refusé' });
    }

    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact non trouvé' });
    }

    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Contact supprimé avec succès' });
  } catch (err) {
    console.error('Erreur lors de la suppression du contact:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;