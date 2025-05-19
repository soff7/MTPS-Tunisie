// Correction de routes/stats.js pour retourner des données correctes même quand vides
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Contact = require('../models/Contact');
const Product = require('../models/Product');

// @route   GET api/stats
// @desc    Get dashboard statistics
// @access  Private/Admin
router.get('/', auth, async (req, res) => {
  try {
    // Vérification des droits d'administrateur
    const user = await User.findById(req.user.id);
    if (!user || (user.role !== 'admin' && user.role !== 'superadmin')) {
      return res.status(403).json({ success: false, message: 'Accès refusé' });
    }

    // Récupération des statistiques
    const usersCount = await User.countDocuments();
    const newMessagesCount = await Contact.countDocuments({ status: 'nouveau' });
    
    // Vérifier si la collection Products existe avant de compter
    let productsCount = 0;
    try {
      productsCount = await Product.countDocuments();
    } catch (error) {
      console.log('Collection Products non disponible:', error.message);
      // On continue avec 0 par défaut
    }
    
    // Stats de produits par catégorie
    let productsByCategory = [];
    try {
      productsByCategory = await Product.aggregate([
        { $group: { _id: "$category", count: { $sum: 1 } } }
      ]);
    } catch (error) {
      console.log('Impossible d\'agréger les produits par catégorie:', error.message);
      // On continue avec un tableau vide par défaut
    }

    // Stats des messages par statut
    let messagesByStatus = [];
    try {
      messagesByStatus = await Contact.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } }
      ]);
    } catch (error) {
      console.log('Impossible d\'agréger les messages par statut:', error.message);
      // On continue avec un tableau vide par défaut
    }

    // Messages récents
    let recentMessages = [];
    try {
      recentMessages = await Contact.find()
        .sort({ createdAt: -1 })
        .limit(5);
    } catch (error) {
      console.log('Impossible de récupérer les messages récents:', error.message);
      // On continue avec un tableau vide par défaut
    }
      
    // Produits récents
    let recentProducts = [];
    try {
      recentProducts = await Product.find()
        .sort({ createdAt: -1 })
        .limit(5);
    } catch (error) {
      console.log('Impossible de récupérer les produits récents:', error.message);
      // On continue avec un tableau vide par défaut
    }

    res.json({
      success: true,
      data: {
        counts: {
          users: usersCount,
          newMessages: newMessagesCount,
          products: productsCount
        },
        productsByCategory,
        messagesByStatus,
        recentMessages,
        recentProducts
      }
    });
  } catch (err) {
    console.error('Error fetching stats:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur serveur',
      // Renvoyer des données par défaut pour éviter les erreurs côté client
      data: {
        counts: {
          users: 0,
          newMessages: 0,
          products: 0
        },
        productsByCategory: [],
        messagesByStatus: [],
        recentMessages: [],
        recentProducts: []
      }
    });
  }
});

module.exports = router;