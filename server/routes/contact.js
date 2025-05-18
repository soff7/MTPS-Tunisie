// routes/contact.js
const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// POST - Créer un nouveau message de contact
router.post('/', async (req, res) => {
  try {
    console.log('Données de contact reçues:', req.body);
    const contact = new Contact(req.body);
    await contact.save();
    console.log('Contact enregistré avec succès');
    res.status(201).json({ 
      success: true, 
      message: 'Message envoyé avec succès!' 
    });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement du contact:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ 
        success: false, 
        message: messages.join(', ') 
      });
    }
    res.status(500).json({ 
      success: false, 
      message: 'Une erreur est survenue lors de l\'envoi du message' 
    });
  }
});

// GET - Récupérer tous les messages (pour le panel admin)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ 
      success: true, 
      data: contacts 
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des contacts:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Une erreur est survenue lors de la récupération des messages' 
    });
  }
});

// GET - Récupérer un message spécifique
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ 
        success: false, 
        message: 'Message non trouvé' 
      });
    }
    res.status(200).json({ 
      success: true, 
      data: contact 
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du contact:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Une erreur est survenue' 
    });
  }
});

// PATCH - Mettre à jour le statut d'un message
router.patch('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );
    
    if (!contact) {
      return res.status(404).json({ 
        success: false, 
        message: 'Message non trouvé' 
      });
    }
    
    res.status(200).json({ 
      success: true, 
      data: contact 
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du contact:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Une erreur est survenue' 
    });
  }
});

// DELETE - Supprimer un message
router.delete('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ 
        success: false, 
        message: 'Message non trouvé' 
      });
    }
    
    res.status(200).json({ 
      success: true, 
      message: 'Message supprimé avec succès' 
    });
  } catch (error) {
    console.error('Erreur lors de la suppression du contact:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Une erreur est survenue' 
    });
  }
});

module.exports = router;