const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); // Keep this single import at the top
const { uploadMiddleware } = require('../middleware/uploadConfig');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  testRoute
} = require('../controllers/productsController');

// Route de test
router.get('/test', testRoute);

// Route de diagnostic détaillée
router.get('/diagnostic', async (req, res) => {
  try {
    const Product = require('../models/Product');
    
    console.log('🔍 Diagnostic MongoDB détaillé...');
    
    // Informations de connexion
    const connectionInfo = {
      readyState: mongoose.connection.readyState,
      readyStateText: {
        0: 'Déconnecté',
        1: 'Connecté',
        2: 'Connexion en cours',
        3: 'Déconnexion en cours'
      }[mongoose.connection.readyState],
      database: mongoose.connection.name,
      host: mongoose.connection.host,
      port: mongoose.connection.port
    };
    
    // Collections disponibles
    const collections = await mongoose.connection.db.listCollections().toArray();
    
    // Statistiques des produits
    const productCount = await Product.countDocuments();
    const products = await Product.find().sort({ createdAt: -1 });
    
    // Statistiques par catégorie
    const categoryStats = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);
    
    const diagnostic = {
      connection: connectionInfo,
      collections: collections.map(c => ({
        name: c.name,
        type: c.type
      })),
      statistics: {
        totalProducts: productCount,
        categoriesCount: categoryStats.length,
        categoryBreakdown: categoryStats
      },
      products: products.map(p => ({
        id: p._id,
        name: p.name,
        category: p.category,
        hasImage: !!p.image,
        hasTechSheet: !!p.techSheet,
        createdAt: p.createdAt
      }))
    };
    
    console.log('✅ Diagnostic complet:', JSON.stringify(diagnostic, null, 2));
    
    res.json({
      success: true,
      message: 'Diagnostic terminé avec succès',
      diagnostic: diagnostic
    });
    
  } catch (error) {
    console.error('❌ Erreur lors du diagnostic:', error);
    res.status(500).json({ 
      success: false,
      message: 'Erreur lors du diagnostic',
      error: error.message 
    });
  }
});

// Récupérer tous les produits
router.get('/', getProducts);

// Récupérer un produit par ID
router.get('/:id', getProductById);

// Créer un nouveau produit (avec upload de fichiers)
router.post('/', uploadMiddleware, createProduct);

// Mettre à jour un produit (avec upload de fichiers optionnel)
router.put('/:id', uploadMiddleware, updateProduct);

// Supprimer un produit
router.delete('/:id', deleteProduct);

module.exports = router;