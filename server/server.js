const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connexion à la base de données
connectDB().then(() => {
  // Diagnostic après connexion réussie
  setTimeout(diagnosticMongoDB, 1000);
}).catch(err => {
  console.error('❌ Échec de la connexion à MongoDB:', err.message);
  process.exit(1);
});

// Fonction de diagnostic MongoDB améliorée
async function diagnosticMongoDB() {
  try {
    console.log('\n🔍 Début du diagnostic MongoDB...');
    
    // Vérification de la connexion
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Connexion MongoDB non établie');
    }
    
    console.log('✅ État de la connexion:', getConnectionState(mongoose.connection.readyState));
    console.log('📊 Base de données:', mongoose.connection.name);
    console.log('🌐 Host:', mongoose.connection.host);
    
    // Liste des collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('🗂 Collections disponibles:', collections.map(c => c.name));
    
    // Vérification des modèles
    const Product = require('./models/Product');
    const productCount = await Product.countDocuments();
    console.log(`📦 Nombre de produits: ${productCount}`);
    
    console.log('✅ Diagnostic MongoDB terminé avec succès\n');
  } catch (error) {
    console.error('❌ Erreur lors du diagnostic:', error.message);
    if (error.stack) console.error(error.stack);
  }
}

// Helper pour les états de connexion
function getConnectionState(state) {
  const states = {
    0: 'Déconnecté',
    1: 'Connecté',
    2: 'Connexion en cours',
    3: 'Déconnexion en cours',
    4: 'Connexion invalide'
  };
  return states[state] || `État inconnu (${state})`;
}

// Configuration CORS améliorée
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://mtps-tunisie.vercel.app',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Middleware pour parser JSON et URL-encoded data
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Servir les fichiers statiques
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware de logging amélioré
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// Routes principales
app.use('/api/products', require('./routes/products'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contact'));
app.use('/auth', require('./routes/admin/users'));

// Route de diagnostic sécurisée (seulement en développement)
app.get('/api/diagnostic', async (req, res) => {
  if (process.env.NODE_ENV !== 'development') {
    return res.status(403).json({ message: 'Accès refusé' });
  }
  
  try {
    await diagnosticMongoDB();
    res.json({ message: 'Diagnostic terminé, vérifiez les logs du serveur' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route de santé améliorée
app.get('/api/health', (req, res) => {
  const healthCheck = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: getConnectionState(mongoose.connection.readyState),
    memoryUsage: process.memoryUsage(),
    environment: process.env.NODE_ENV || 'development'
  };
  res.json(healthCheck);
});

// Route racine avec documentation
app.get('/', (req, res) => {
  res.json({
    message: 'API MTPS Tunisie',
    version: '1.0.0',
    documentation: 'https://github.com/your-repo/docs',
    endpoints: {
      products: { methods: ['GET', 'POST', 'PUT', 'DELETE'], path: '/api/products' },
      auth: { methods: ['POST'], path: '/api/auth' },
      contacts: { methods: ['GET', 'POST', 'PUT', 'DELETE'], path: '/api/contacts' },
      health: { methods: ['GET'], path: '/api/health' },
      diagnostic: { methods: ['GET'], path: '/api/diagnostic', note: 'Disponible seulement en développement' }
    }
  });
});

// Gestion des erreurs 404 améliorée
app.use((req, res) => {
  console.log(`❌ Route non trouvée: ${req.method} ${req.path}`);
  res.status(404).json({
    error: 'Route non trouvée',
    path: req.path,
    method: req.method,
    suggestions: [
      { method: 'GET', path: '/api/products' },
      { method: 'POST', path: '/api/auth/login' },
      { method: 'GET', path: '/api/health' }
    ]
  });
});

// Gestion globale des erreurs améliorée
app.use((err, req, res, next) => {
  console.error('🔥 Erreur serveur:', {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    path: req.path,
    method: req.method
  });

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: err.message || 'Une erreur est survenue',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Démarrage du serveur seulement si la connexion DB est réussie
mongoose.connection.once('open', () => {
  app.listen(PORT, () => {
    console.log(`\n🚀 Serveur démarré sur le port ${PORT}`);
    console.log(`📍 URL locale: http://localhost:${PORT}`);
    console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
    console.log(`📦 API Products: http://localhost:${PORT}/api/products`);
    console.log(`🔐 API Auth: http://localhost:${PORT}/api/auth`);
    console.log(`📧 API Contacts: http://localhost:${PORT}/api/contacts`);
    console.log(`🌿 Environnement: ${process.env.NODE_ENV || 'development'}\n`);
  });
});

// Gestion gracieuse de l'arrêt
['SIGINT', 'SIGTERM'].forEach(signal => {
  process.on(signal, () => {
    console.log(`\n👋 Reçu ${signal}, arrêt gracieux du serveur...`);
    mongoose.connection.close(false, () => {
      console.log('✅ Connexion MongoDB fermée');
      process.exit(0);
    });
  });
});

module.exports = app;