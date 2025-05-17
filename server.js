const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Configuration de dotenv
dotenv.config();

// Si la variable d'environnement n'est pas définie, utilisez celle-ci directement
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://MTPS-Tunisie:Sofldh99@mtps.i6xs7.mongodb.net/MTPS-Tunisie?retryWrites=true&w=majority&appName=Mtps";

const app = express();
const PORT = process.env.PORT || 5000;

// Configuration CORS
app.use(cors({
  origin: '*', // En développement, autorise toutes les origines
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse JSON request body
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Middleware de débogage pour les requêtes
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  if (req.url.includes('/api/contacts') && req.method === 'POST') {
    console.log('=== DÉBOGAGE FORMULAIRE CONTACT ===');
    console.log('Corps de la requête:', JSON.stringify(req.body, null, 2));
    console.log('================================');
  }
  next();
});

// Connexion à MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connecté');
    // Afficher le nom de la base de données
    console.log('Base de données connectée:', mongoose.connection.db.databaseName);
    
    // Liste des collections
    mongoose.connection.db.listCollections().toArray((err, collections) => {
      if (err) {
        console.error('Erreur lors de la liste des collections:', err);
      } else {
        console.log('Collections disponibles:', collections.map(c => c.name));
      }
    });
  })
  .catch(err => {
    console.error('Erreur MongoDB:', err.message);
  });
  const statsRoutes = require('./routes/stats');

const authRoutes = require('./routes/auth');

// Routes API sans la route auth pour le moment
app.use('/api/products', require('./routes/products'));
app.use('/api/contacts', require('./routes/contact'));

app.use('/api/stats', statsRoutes);

// Register auth routes
app.use('/api/auth', authRoutes);

// Route simplifiée pour tester l'OAuth Google
// app.get('/api/auth/google', (req, res) => {
//   res.send('Route Google OAuth (en cours d\'implémentation). ID Client: 830113887425-qr543sq31mgihjpkkc9gjhkc01papker.apps.googleusercontent.com');
// });

// Route de test directe
app.post('/test-contact', (req, res) => {
  console.log('Route test-contact appelée');
  console.log('Body reçu:', req.body);
  res.status(200).json({ message: 'Test réussi', data: req.body });
});

// Route principale
app.get('/', (req, res) => {
  res.send('API MTPS opérationnelle');
});

// Gestion des erreurs 404
app.use((req, res) => {
  console.log(`Route non trouvée: ${req.method} ${req.url}`);
  res.status(404).send(`Cannot ${req.method} ${req.url}`);
});

// Démarrage du serveur
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));