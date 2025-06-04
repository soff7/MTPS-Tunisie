const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const jwt = require('jsonwebtoken');

// Middleware pour vérifier le token et extraire les infos utilisateur
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

// Get all contacts (accessible uniquement aux admins)
router.get('/', verifyToken, async (req, res) => {
  try {
    // Vérifier si l'utilisateur est admin ou superadmin
    if (req.user.role !== 'admin' && req.user.role !== 'superadmin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Accès refusé : Seuls les administrateurs peuvent consulter les contacts' 
      });
    }
    
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, data: contacts });
  } catch (err) {
    console.error('Erreur lors de la récupération des contacts:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// Add a new contact (interdit aux admins)
router.post('/', verifyToken, async (req, res) => {
  try {
    console.log('Données reçues pour le contact:', req.body);
    console.log('Utilisateur connecté:', req.user);
    
    // Vérifier si l'utilisateur est admin ou superadmin
    if (req.user.role === 'admin' || req.user.role === 'superadmin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Accès refusé : En tant qu\'administrateur, vous n\'êtes pas autorisé à envoyer des messages via ce formulaire de contact.' 
      });
    }
    
    const { name, companyName, email, subject, otherSubject, message } = req.body;
    
    // Validation des champs requis
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Tous les champs obligatoires doivent être remplis' 
      });
    }
    
    // Validation de la longueur du message
    if (message.length < 10) {
      return res.status(400).json({ 
        success: false, 
        message: 'Le message doit contenir au moins 10 caractères' 
      });
    }
    
    // Déterminer le sujet final
    const finalSubject = subject === 'autre' ? otherSubject : subject;
    
    const contact = new Contact({
      name,
      companyName: companyName || '', // Optionnel
      email,
      subject: finalSubject,
      otherSubject: subject === 'autre' ? otherSubject : '',
      message,
      userId: req.user.id // Ajouter l'ID de l'utilisateur qui envoie le message
    });
    
    const newContact = await contact.save();
    console.log('Contact sauvegardé avec succès:', newContact);
    
    res.status(201).json({ 
      success: true, 
      message: 'Votre message a été envoyé avec succès!',
      data: newContact 
    });
    
  } catch (err) {
    console.error('Erreur lors de la création du contact:', err);
    res.status(400).json({ 
      success: false, 
      message: err.message || 'Erreur lors de l\'envoi du message' 
    });
  }
});

// Reply to a contact (accessible uniquement aux admins)
router.put('/:id/reply', verifyToken, async (req, res) => {
  try {
    // Vérifier si l'utilisateur est admin ou superadmin
    if (req.user.role !== 'admin' && req.user.role !== 'superadmin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Accès refusé : Seuls les administrateurs peuvent répondre aux contacts' 
      });
    }
    
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact non trouvé' });
    }

    contact.reply = req.body.reply;
    contact.status = 'Replied';
    const updatedContact = await contact.save();
    
    res.json({ success: true, data: updatedContact });
  } catch (err) {
    console.error('Erreur lors de la réponse au contact:', err);
    res.status(400).json({ success: false, message: err.message });
  }
});

// Delete contact (accessible uniquement aux admins)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    // Vérifier si l'utilisateur est admin ou superadmin
    if (req.user.role !== 'admin' && req.user.role !== 'superadmin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Accès refusé : Seuls les administrateurs peuvent supprimer des contacts' 
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