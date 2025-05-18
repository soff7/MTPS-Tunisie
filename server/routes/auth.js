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
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, message: 'Cet utilisateur existe déjà' });
    }

    user = new User({
      name,
      email,
      password,
      role: 'user'  // Toujours définir le rôle par défaut à "user" pour les inscriptions
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    jwt.sign(
      payload,
      keys.secretOrKey,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({
          success: true,
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
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Identifiants invalides' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Identifiants invalides' });
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    jwt.sign(
      payload,
      keys.secretOrKey,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({
          success: true,
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
    if (!user) {
      return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

module.exports = router;