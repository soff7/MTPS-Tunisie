const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../config/keys');
const auth = require('../middleware/auth');

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
  console.log('=== LOGIN ATTEMPT DEBUG ===');
  console.log('Request body:', req.body);
  
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    console.log('❌ Missing email or password');
    return res.status(400).json({ 
      success: false, 
      message: 'Email et mot de passe requis' 
    });
  }

  try {
    // Search for user (case-insensitive email)
    const searchEmail = email.toLowerCase().trim();
    console.log('Searching for email:', searchEmail);
    
    let user = await User.findOne({ 
      email: { $regex: new RegExp('^' + searchEmail + '$', 'i') }
    });
    
    console.log('User found:', user ? 'YES' : 'NO');
    
    if (!user) {
      console.log('❌ User not found for email:', searchEmail);
      return res.status(400).json({ 
        success: false, 
        message: 'Identifiants invalides' 
      });
    }

    console.log('✅ User found:');
    console.log('- ID:', user._id);
    console.log('- Name:', user.name);
    console.log('- Email in DB:', user.email);
    console.log('- Role:', user.role);
    console.log('- isActive:', user.isActive);

    // Check if account is active
    if (user.isActive === false) {
      console.log('❌ User account is inactive');
      return res.status(400).json({
        success: false,
        message: 'Compte utilisateur désactivé'
      });
    }

    // Verify password
    console.log('Comparing passwords...');
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password comparison result:', isMatch);
    
    if (!isMatch) {
      console.log('❌ Password mismatch for user:', searchEmail);
      return res.status(400).json({ 
        success: false, 
        message: 'Identifiants invalides' 
      });
    }

    console.log('✅ Password match successful');

    // Create JWT payload
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    console.log('Creating JWT with payload:', payload);

    // Generate token
    jwt.sign(
      payload,
      keys.secretOrKey,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) {
          console.error('❌ JWT Error:', err);
          return res.status(500).json({ 
            success: false, 
            message: 'Erreur lors de la génération du token' 
          });
        }
        
        console.log('✅ User logged in successfully:', user.email);
        
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
    console.error('❌ Login error:', err);
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

// @route   POST api/auth/register
// @desc    Register new user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Nom, email et mot de passe sont requis'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Un utilisateur avec cet email existe déjà'
      });
    }

    // Create new user
    const newUser = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: password, // will be hashed by User model pre-save hook
      role: 'User',
      isActive: true
    });

    await newUser.save();

    // Create JWT payload
    const payload = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    };

    // Generate token
    jwt.sign(
      payload,
      keys.secretOrKey,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: 'Erreur lors de la génération du token'
          });
        }

        res.json({
          success: true,
          message: 'Inscription réussie',
          token: token,
          user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role
          }
        });
      }
    );
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de l\'inscription'
    });
  }
});

module.exports = router;
