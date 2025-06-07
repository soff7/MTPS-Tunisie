const Product = require('../models/Product');
const path = require('path');
const fs = require('fs');

// Récupérer tous les produits
exports.getProducts = async (req, res) => {
  try {
    console.log('Récupération de tous les produits...');
    const products = await Product.find().sort({ createdAt: -1 });
    console.log(`${products.length} produits trouvés`);
    res.json(products);
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la récupération des produits',
      error: error.message 
    });
  }
};

// Récupérer un produit par ID
exports.getProductById = async (req, res) => {
  try {
    console.log(`Récupération du produit avec ID: ${req.params.id}`);
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Erreur lors de la récupération du produit:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la récupération du produit',
      error: error.message 
    });
  }
};

// Créer un nouveau produit
exports.createProduct = async (req, res) => {
  try {
    console.log('Création d\'un nouveau produit...');
    console.log('Données reçues:', req.body);
    console.log('Fichiers reçus:', req.files);

    const { name, category, description } = req.body;

    // Validation des champs requis
    if (!name || !category) {
      return res.status(400).json({ 
        message: 'Le nom et la catégorie sont requis' 
      });
    }

    // Préparer les données du produit
    const productData = {
      name: name.trim(),
      category: category,
      description: description ? description.trim() : ''
    };

    // Gestion des fichiers uploadés
    if (req.files) {
      if (req.files.image && req.files.image[0]) {
        productData.image = req.files.image[0].path.replace(/\\/g, '/');
        console.log('Image uploadée:', productData.image);
      }
      
      if (req.files.techSheet && req.files.techSheet[0]) {
        productData.techSheet = req.files.techSheet[0].path.replace(/\\/g, '/');
        console.log('Fiche technique uploadée:', productData.techSheet);
      }
    }

    // Créer le produit
    const product = new Product(productData);
    const savedProduct = await product.save();
    
    console.log('Produit créé avec succès:', savedProduct);
    res.status(201).json(savedProduct);
    
  } catch (error) {
    console.error('Erreur lors de la création du produit:', error);
    res.status(400).json({ 
      message: 'Erreur lors de la création du produit',
      error: error.message 
    });
  }
};

// Mettre à jour un produit
exports.updateProduct = async (req, res) => {
  try {
    console.log(`Mise à jour du produit avec ID: ${req.params.id}`);
    
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    const { name, category, description } = req.body;

    // Mettre à jour les champs texte
    if (name) product.name = name.trim();
    if (category) product.category = category;
    if (description !== undefined) product.description = description.trim();

    // Gestion des nouveaux fichiers
    if (req.files) {
      if (req.files.image && req.files.image[0]) {
        // Supprimer l'ancienne image si elle existe
        if (product.image && fs.existsSync(product.image)) {
          fs.unlinkSync(product.image);
        }
        product.image = req.files.image[0].path.replace(/\\/g, '/');
      }
      
      if (req.files.techSheet && req.files.techSheet[0]) {
        // Supprimer l'ancienne fiche technique si elle existe
        if (product.techSheet && fs.existsSync(product.techSheet)) {
          fs.unlinkSync(product.techSheet);
        }
        product.techSheet = req.files.techSheet[0].path.replace(/\\/g, '/');
      }
    }

    const updatedProduct = await product.save();
    console.log('Produit mis à jour avec succès:', updatedProduct);
    res.json(updatedProduct);
    
  } catch (error) {
    console.error('Erreur lors de la mise à jour du produit:', error);
    res.status(400).json({ 
      message: 'Erreur lors de la mise à jour du produit',
      error: error.message 
    });
  }
};

// Supprimer un produit
exports.deleteProduct = async (req, res) => {
  try {
    console.log(`Suppression du produit avec ID: ${req.params.id}`);
    
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    // Supprimer les fichiers associés
    if (product.image && fs.existsSync(product.image)) {
      try {
        fs.unlinkSync(product.image);
        console.log('Image supprimée:', product.image);
      } catch (err) {
        console.warn('Erreur lors de la suppression de l\'image:', err);
      }
    }
    
    if (product.techSheet && fs.existsSync(product.techSheet)) {
      try {
        fs.unlinkSync(product.techSheet);
        console.log('Fiche technique supprimée:', product.techSheet);
      } catch (err) {
        console.warn('Erreur lors de la suppression de la fiche technique:', err);
      }
    }

    // Supprimer le produit de la base de données
    await Product.findByIdAndDelete(req.params.id);
    
    console.log('Produit supprimé avec succès');
    res.json({ message: 'Produit supprimé avec succès', id: req.params.id });
    
  } catch (error) {
    console.error('Erreur lors de la suppression du produit:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la suppression du produit',
      error: error.message 
    });
  }
};

// Route de test
exports.testRoute = (req, res) => {
  res.json({ 
    message: 'API Products fonctionne correctement!',
    timestamp: new Date().toISOString()
  });
};