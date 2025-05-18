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
    const productsCount = await Product.countDocuments();
    
    // Stats de produits par catégorie
    const productsByCategory = await Product.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);

    // Stats des messages par statut
    const messagesByStatus = await Contact.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    // Messages récents
    const recentMessages = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5);
      
    // Produits récents
    const recentProducts = await Product.find()
      .sort({ createdAt: -1 })
      .limit(5);

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
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

module.exports = router;