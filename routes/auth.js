const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const passport = require('../config/passport');
const keys = require('../config/keys');
const auth = require('../middleware/auth');

// @route   POST api/auth/register
// @desc    Register a user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Vérifier si l'utilisateur existe déjà
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, message: 'Cet email est déjà utilisé' });
    }

    // Créer un nouvel utilisateur
    user = new User({
      name,
      email,
      password,
      role: 'user' // Par défaut, les nouveaux utilisateurs ont le rôle 'user'
    });

    // Hacher le mot de passe
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Enregistrer l'utilisateur
    await user.save();

    // Créer le payload JWT
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    // Générer le token JWT
    jwt.sign(
      payload,
      keys.secretOrKey,
      { expiresIn: '1d' },
      (err, token) => {
        if (err) throw err;
        res.json({
          success: true,
          token: 'Bearer ' + token,
          user: payload
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Email ou mot de passe incorrect' });
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Email ou mot de passe incorrect' });
    }

    // Créer le payload JWT
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    // Générer le token JWT
    jwt.sign(
      payload,
      keys.secretOrKey,
      { expiresIn: '1d' },
      (err, token) => {
        if (err) throw err;
        res.json({
          success: true,
          token: 'Bearer ' + token,
          user: payload
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

// @route   GET api/auth/user
// @desc    Get current user
// @access  Private
router.get('/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ success: true, user });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

// @route   GET api/auth/users
// @desc    Get all users (admin only)
// @access  Private/Admin
router.get('/users', auth, async (req, res) => {
  try {
    // Vérifier si l'utilisateur est admin
    const currentUser = await User.findById(req.user.id);
    if (currentUser.role !== 'admin' && currentUser.role !== 'superadmin') {
      return res.status(403).json({ success: false, message: 'Accès non autorisé' });
    }

    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

// @route   POST api/auth/create-admin
// @desc    Create a new admin user (admin only)
// @access  Private/Admin
router.post('/create-admin', auth, async (req, res) => {
  try {
    // Vérifier si l'utilisateur est admin
    const currentUser = await User.findById(req.user.id);
    if (currentUser.role !== 'admin' && currentUser.role !== 'superadmin') {
      return res.status(403).json({ success: false, message: 'Accès non autorisé' });
    }

    // Seul un superadmin peut créer un autre superadmin
    if (req.body.role === 'superadmin' && currentUser.role !== 'superadmin') {
      return res.status(403).json({ success: false, message: 'Seul un super admin peut créer un autre super admin' });
    }

    const { name, email, password, role } = req.body;

    // Vérifier si l'utilisateur existe déjà
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, message: 'Cet email est déjà utilisé' });
    }

    // Créer un nouvel utilisateur admin
    user = new User({
      name,
      email,
      password,
      role: role || 'admin'
    });

    // Hacher le mot de passe
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Enregistrer l'utilisateur
    await user.save();

    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

// @route   DELETE api/auth/users/:id
// @desc    Delete a user (admin only)
// @access  Private/Admin
router.delete('/users/:id', auth, async (req, res) => {
  try {
    // Vérifier si l'utilisateur est admin
    const currentUser = await User.findById(req.user.id);
    if (currentUser.role !== 'admin' && currentUser.role !== 'superadmin') {
      return res.status(403).json({ success: false, message: 'Accès non autorisé' });
    }

    // Vérifier si l'utilisateur essaie de se supprimer lui-même
    if (req.params.id === req.user.id) {
      return res.status(400).json({ success: false, message: 'Vous ne pouvez pas supprimer votre propre compte' });
    }

    // Vérifier si l'utilisateur à supprimer est un superadmin
    const userToDelete = await User.findById(req.params.id);
    if (!userToDelete) {
      return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
    }
    
    // Seul un superadmin peut supprimer un autre superadmin
    if (userToDelete.role === 'superadmin' && currentUser.role !== 'superadmin') {
      return res.status(403).json({ success: false, message: 'Seul un super admin peut supprimer un autre super admin' });
    }

    // Supprimer l'utilisateur
    await User.findByIdAndRemove(req.params.id);

    res.json({ success: true, message: 'Utilisateur supprimé avec succès' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

module.exports = router;