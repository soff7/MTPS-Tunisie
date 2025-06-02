const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const http = require('http');
const socketUtil = require('./utils/socket');
const multer = require('multer');

// Configuration de dotenv
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketUtil.init(server);

const PORT = process.env.PORT || 5000;

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Middleware pour le parsing des requêtes JSON - AVANT CORS
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

// Middleware CORS avec configuration plus permissive pour le développement
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

// Middleware de débogage amélioré
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  if (req.method === 'POST') {
    console.log('Body:', JSON.stringify(req.body, null, 2));
  }
  next();
});

// Connexion à MongoDB
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://MTPS-Tunisie:Sofldh99@mtps.i6xs7.mongodb.net/MTPS-Tunisie?retryWrites=true&w=majority&appName=Mtps";

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connecté avec succès!');
  })
  .catch(err => {
    console.error('Erreur de connexion MongoDB:', err.message);
    process.exit(1);
  });

// Route de test simple
app.get('/api/test', (req, res) => {
  res.json({ message: 'API fonctionnelle!' });
});

// Routes API
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', upload.fields([{ name: 'image' }, { name: 'techSheet' }]), require('./routes/products'));
app.use('/api/contacts', require('./routes/contact'));
app.use('/api/stats', require('./routes/stats'));
const usersRoutes = require('./routes/admin/users');

// Route principale
app.get('/', (req, res) => {
  res.send('API MTPS opérationnelle');
});

// Gestion des erreurs 404
app.use((req, res, next) => {
  console.log(`Route non trouvée: ${req.method} ${req.url}`);
  res.status(404).json({ success: false, message: 'Route non trouvée' });
});

// Gestionnaire d'erreurs global
app.use((err, req, res, next) => {
  console.error('Erreur serveur:', err);
  res.status(500).json({ 
    success: false, 
    message: 'Erreur serveur', 
    error: process.env.NODE_ENV === 'development' ? err.message : undefined 
  });
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('Un client est connecté:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client déconnecté:', socket.id);
  });
});

module.exports = { app, server, io };

// Démarrer le serveur avec socket.io
server.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
  console.log(`Test API: http://localhost:${PORT}/api/MTPS-Tunisie`);
});