const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../config/keys');
const auth = require('../middleware/auth');

// @route   POST api/auth/register
// @desc    Register a user
// @access  Public
router.post('/register', async (req, res) => {
  console.log('Registration attempt:', req.body);
  
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Tous les champs sont requis' 
    });
  }

  if (password.length < 6) {
    return res.status(400).json({ 
      success: false, 
      message: 'Le mot de passe doit contenir au moins 6 caractères' 
    });
  }

  try {
    // Vérifier si l'utilisateur existe déjà
    let user = await User.findOne({ email: email.toLowerCase() });
    if (user) {
      return res.status(400).json({ 
        success: false, 
        message: 'Cet utilisateur existe déjà' 
      });
    }

    // Créer un nouvel utilisateur
    user = new User({
      name: name.trim(),
      email: email.toLowerCase(),
      password,
      role: 'user'  // Rôle par défaut
    });

    // Hasher le mot de passe
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Sauvegarder l'utilisateur
    await user.save();

    // Créer le payload JWT
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    // Générer le token
    jwt.sign(
      payload,
      keys.secretOrKey,
      { expiresIn: '24h' }, // Token valide 24h
      (err, token) => {
        if (err) {
          console.error('Erreur JWT:', err);
          return res.status(500).json({ 
            success: false, 
            message: 'Erreur lors de la génération du token' 
          });
        }
        
        console.log('User registered successfully:', user.email);
        
        res.status(201).json({
          success: true,
          message: 'Compte créé avec succès',
          token: token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          }
        });
      }
    );
  } catch (err) {
    console.error('Erreur registration:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur serveur lors de la création du compte' 
    });
  }
});

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
  console.log('Login attempt:', req.body.email);
  
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Email et mot de passe requis' 
    });
  }

  try {
    // Chercher l'utilisateur
    let user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ 
        success: false, 
        message: 'Identifiants invalides' 
      });
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ 
        success: false, 
        message: 'Identifiants invalides' 
      });
    }

    // Créer le payload JWT
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    // Générer le token
    jwt.sign(
      payload,
      keys.secretOrKey,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) {
          console.error('Erreur JWT:', err);
          return res.status(500).json({ 
            success: false, 
            message: 'Erreur lors de la génération du token' 
          });
        }
        
        console.log('User logged in successfully:', user.email);
        
        res.json({
          success: true,
          message: 'Connexion réussie',
          token: token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          }
        });
      }
    );
  } catch (err) {
    console.error('Erreur login:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur serveur lors de la connexion' 
    });
  }
});

// @route   GET api/auth/user
// @desc    Get current user
// @access  Private
router.get('/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'Utilisateur non trouvé' 
      });
    }
    
    res.json({
      success: true,
      user: user
    });
  } catch (err) {
    console.error('Erreur get user:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur serveur' 
    });
  }
});

// @route   POST api/auth/verify-token
// @desc    Verify if token is valid
// @access  Private
router.post('/verify-token', auth, (req, res) => {
  res.json({
    success: true,
    message: 'Token valide',
    user: req.user
  });
});

module.exports = router;