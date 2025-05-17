const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const { errors } = require('celebrate');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db'); // Importez la fonction de connexion

const app = express();

// Connexion à MongoDB (utilisez la fonction du fichier db.js)
connectDB();

// Configuration de sécurité
app.use(helmet());

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

// CORS config
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? ['https://mtps-tunisie.com', 'https://www.mtps-tunisie.com']
    : 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Body parsing
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Logging simple
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/auth', require('./routes/googleAuth'));
app.use('/api/contacts', require('./routes/contact'));
app.use('/api/products', require('./routes/products'));
app.use('/api/stats', require('./routes/stats'));

// Serve statique en production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
  });
}

// Gestion des erreurs
app.use(errors());

app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route non trouvée'
  });
});

app.use((err, req, res, next) => {
  console.error('🚨 Erreur:', err.stack);
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'Erreur serveur' : err.message;
  res.status(statusCode).json({
    status: 'error',
    message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Serveur prêt sur le port ${PORT}`);
});

// Fermeture propre
process.on('SIGTERM', () => {
  console.log('🛑 Arrêt du serveur');
  server.close(() => {
    mongoose.connection.close();
    console.log('Process terminé');
    process.exit(0);
  });
});