const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connexion à la base de données
connectDB();

// Fonction de diagnostic MongoDB
async function diagnosticMongoDB() {
  try {
    const Product = require('./models/Product');
    
    console.log('🔍 Diagnostic MongoDB...');
    console.log('État de la connexion:', mongoose.connection.readyState);
    console.log('Base de données connectée:', mongoose.connection.name);
    console.log('Host:', mongoose.connection.host);
    
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections disponibles:', collections.map(c => c.name));
    
    const productCount = await Product.countDocuments();
    console.log('Nombre de produits dans la DB:', productCount);
    
    const products = await Product.find();
    console.log('Produits trouvés:', products);
    
  } catch (error) {
    console.error('❌ Erreur lors du diagnostic:', error);
  }
}

// Middleware CORS
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://mtps-tunisie.vercel.app',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
}));

// Middleware pour parser JSON et URL-encoded data
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Servir les fichiers statiques (uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('Body:', req.body);
  }
  if (req.files && Object.keys(req.files).length > 0) {
    console.log('Files:', Object.keys(req.files));
  }
  next();
});

// Routes - ORDRE IMPORTANT
app.use('/api/products', require('./routes/products'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contact')); // Route corrigée

// Route de diagnostic
app.get('/api/diagnostic', async (req, res) => {
  try {
    await diagnosticMongoDB();
    res.json({ message: 'Diagnostic terminé, vérifiez les logs du serveur' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route de santé
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Serveur MTPS API fonctionne correctement',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: mongoose.connection.readyState === 1 ? 'Connecté' : 'Déconnecté'
  });
});

// Route racine
app.get('/', (req, res) => {
  res.json({ 
    message: 'API MTPS Tunisie',
    version: '1.0.0',
    endpoints: {
      products: '/api/products',
      auth: '/api/auth',
      contacts: '/api/contacts',
      health: '/api/health',
      diagnostic: '/api/diagnostic'
    }
  });
});

// Gestion des erreurs 404
app.use((req, res) => {
  console.log(`❌ Route non trouvée: ${req.method} ${req.path}`);
  res.status(404).json({ 
    message: 'Route non trouvée',
    path: req.path,
    method: req.method,
    availableRoutes: [
      'GET /',
      'GET /api/health',
      'GET /api/diagnostic',
      'GET /api/products',
      'POST /api/auth/login',
      'POST /api/auth/register',
      'GET /api/contacts',
      'POST /api/contacts',
      'PUT /api/contacts/:id/reply',
      'DELETE /api/contacts/:id'
    ]
  });
});

// Gestion globale des erreurs
app.use((err, req, res, next) => {
  console.error('Erreur serveur:', err);
  res.status(500).json({ 
    message: 'Erreur interne du serveur',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Une erreur est survenue'
  });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`📍 URL locale: http://localhost:${PORT}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📦 API Products: http://localhost:${PORT}/api/products`);
  console.log(`🔐 API Auth: http://localhost:${PORT}/api/auth`);
  console.log(`📧 API Contacts: http://localhost:${PORT}/api/contacts`);
  console.log(`🔍 Diagnostic: http://localhost:${PORT}/api/diagnostic`);
  
  // Lancer le diagnostic au démarrage
  setTimeout(diagnosticMongoDB, 2000);
});

// Gestion gracieuse de l'arrêt
process.on('SIGTERM', () => {
  console.log('👋 Arrêt gracieux du serveur...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('👋 Arrêt gracieux du serveur...');
  process.exit(0);
});

module.exports = app;