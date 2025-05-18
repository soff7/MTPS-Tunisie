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
  origin: 'http://localhost:3000', // Spécifiez exactement l'origine de votre frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'],
  credentials: true // Important pour les cookies/authentification
}));

// Parse JSON request body
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Middleware de débogage pour les requêtes
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Connexion à MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connecté');
    console.log('Base de données connectée:', mongoose.connection.db.databaseName);
  })
  .catch(err => {
    console.error('Erreur MongoDB:', err.message);
  });

// Routes API
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/contacts', require('./routes/contact'));
app.use('/api/stats', require('./routes/stats'));

// Route principale
app.get('/', (req, res) => {
  res.send('API MTPS opérationnelle');
});

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route non trouvée' });
});

// Démarrage du serveur
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));