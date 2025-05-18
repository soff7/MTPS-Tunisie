const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../config/keys');

const router = express.Router();

// Configuration de la stratégie Google OAuth
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID || keys.googleClientID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || keys.googleClientSecret,
  callbackURL: "/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Vérifier si l'utilisateur existe déjà
    let user = await User.findOne({ email: profile.emails[0].value });
    
    if (user) {
      // Utilisateur existant, générer un token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        keys.secretOrKey,
        { expiresIn: '1h' }
      );
      
      return done(null, { user, token });
    } else {
      // Nouvel utilisateur, le créer
      const newUser = new User({
        name: profile.displayName,
        email: profile.emails[0].value,
        password: 'google-auth', // Mot de passe placeholder pour les utilisateurs Google
        role: 'user' // Rôle par défaut
      });
      
      await newUser.save();
      
      const token = jwt.sign(
        { id: newUser.id, email: newUser.email },
        keys.secretOrKey,
        { expiresIn: '1h' }
      );
      
      return done(null, { user: newUser, token });
    }
  } catch (err) {
    return done(err, null);
  }
}));

// Route pour initier l'authentification Google
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Route de callback Google
router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const { user, token } = req.user;
    
    // Stocker les informations utilisateur dans le localStorage côté client
    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };
    
    // Redirection vers le frontend avec le token
    if (user.role === 'admin' || user.role === 'superadmin' || user.role === 'manager') {
      // Rediriger vers le dashboard si c'est un admin
      res.redirect(`http://localhost:3000/auth-callback?token=${token}&userData=${encodeURIComponent(JSON.stringify(userData))}&redirect=dashboard`);
    } else {
      // Rediriger vers la page contact pour les utilisateurs normaux
      res.redirect(`http://localhost:3000/auth-callback?token=${token}&userData=${encodeURIComponent(JSON.stringify(userData))}&redirect=contact`);
    }
  }
);

module.exports = router;