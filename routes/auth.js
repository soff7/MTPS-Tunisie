const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const passport = require('../config/passport');
const keys = require('../config/keys');
const auth = require('../middleware/auth');
const authController = require('../controllers/authController');

// @route   POST api/auth/register
// @desc    Register a user
// @access  Public
router.post('/register', authController.signup);

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', authController.signin);

// @route   GET api/auth/user
// @desc    Get current user
// @access  Private
router.get('/user', auth, authController.getCurrentUser);

// @route   POST api/auth/refresh-token
// @desc    Refresh access token
// @access  Public
router.post('/refresh-token', authController.refreshToken);

// @route   GET api/auth/users
// @desc    Get all users (admin only)
// @access  Private/Admin
router.get('/users', auth, async (req, res) => {
  try {
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
    const currentUser = await User.findById(req.user.id);
    if (currentUser.role !== 'admin' && currentUser.role !== 'superadmin') {
      return res.status(403).json({ success: false, message: 'Accès non autorisé' });
    }

    if (req.body.role === 'superadmin' && currentUser.role !== 'superadmin') {
      return res.status(403).json({ success: false, message: 'Seul un super admin peut créer un autre super admin' });
    }

    const { name, email, password, role } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, message: 'Cet email est déjà utilisé' });
    }

    user = new User({
      name,
      email,
      password,
      role: role || 'admin'
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

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
    const currentUser = await User.findById(req.user.id);
    if (currentUser.role !== 'admin' && currentUser.role !== 'superadmin') {
      return res.status(403).json({ success: false, message: 'Accès non autorisé' });
    }

    if (req.params.id === req.user.id) {
      return res.status(400).json({ success: false, message: 'Vous ne pouvez pas supprimer votre propre compte' });
    }

    const userToDelete = await User.findById(req.params.id);
    if (!userToDelete) {
      return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
    }
    
    if (userToDelete.role === 'superadmin' && currentUser.role !== 'superadmin') {
      return res.status(403).json({ success: false, message: 'Seul un super admin peut supprimer un autre super admin' });
    }

    await User.findByIdAndRemove(req.params.id);

    res.json({ success: true, message: 'Utilisateur supprimé avec succès' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

module.exports = router;
