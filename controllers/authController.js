// server/controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Clé secrète pour JWT
const JWT_SECRET = process.env.JWT_SECRET || 'votre_cle_secrete_jwt';
const JWT_EXPIRE = '24h';

// Inscription utilisateur
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, message: 'Cet utilisateur existe déjà' });
    }

    // Créer un nouvel utilisateur
    user = new User({
      name,
      email,
      password
    });

    // Hasher le mot de passe
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Sauvegarder l'utilisateur
    await user.save();

    // Créer et retourner le JWT
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: JWT_EXPIRE },
      (err, token) => {
        if (err) throw err;
        res.json({ 
          success: true, 
          token,
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
};

// Connexion utilisateur
exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Identifiants invalides' });
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Identifiants invalides' });
    }

    // Créer et retourner le JWT
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: JWT_EXPIRE },
      (err, token) => {
        if (err) throw err;
        res.json({ 
          success: true, 
          token,
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
};

// Obtenir l'utilisateur actuel
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

// Add to your authController.js file

/**
 * Controller function to handle Google OAuth login/signup
 * This server-side approach avoids third-party cookie issues
 */
exports.googleAuth = async (req, res) => {
  // Import the Google OAuth library if needed
  const { OAuth2Client } = require('google-auth-library');
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  
  try {
    // Get the ID token from the request (if using a direct API approach)
    // OR set up passport with Google strategy for a redirect-based flow
    
    // Example of a redirect-based flow:
    res.redirect(
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${process.env.GOOGLE_CLIENT_ID}&` +
      `redirect_uri=${encodeURIComponent(`${process.env.API_URL}/auth/google/callback`)}&` +
      `response_type=code&` +
      `scope=email profile&` +
      `prompt=select_account`
    );
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({ success: false, message: 'Erreur lors de l\'authentification Google' });
  }
};

// Add to your authController.js file

/**
 * Controller function to handle Google OAuth login/signup
 * This server-side approach avoids third-party cookie issues
 */
exports.googleAuth = async (req, res) => {
  // Import the Google OAuth library if needed
  const { OAuth2Client } = require('google-auth-library');
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  
  try {
    // Redirect to Google's OAuth page
    res.redirect(
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${process.env.GOOGLE_CLIENT_ID}&` +
      `redirect_uri=${encodeURIComponent(`${process.env.API_URL}/auth/google/callback`)}&` +
      `response_type=code&` +
      `scope=email profile&` +
      `prompt=select_account`
    );
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({ success: false, message: 'Erreur lors de l\'authentification Google' });
  }
};

/**
 * Controller function to handle Google OAuth callback
 */
exports.googleCallback = async (req, res) => {
  const { OAuth2Client } = require('google-auth-library');
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  
  try {
    // Get the authorization code from the query parameters
    const { code } = req.query;
    
    // Exchange the code for tokens
    const { tokens } = await client.getToken({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.API_URL}/auth/google/callback`,
      grant_type: 'authorization_code'
    });
    
    // Verify the ID token
    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    
    // Get user info from the payload
    const googleUserInfo = ticket.getPayload();
    const { email, name, sub: googleId } = googleUserInfo;
    
    // Find or create the user in your database
    let user = await User.findOne({ email });
    
    if (!user) {
      // Create a new user with Google info
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(googleId + Date.now(), salt);
      
      user = new User({
        name,
        email,
        password: hashedPassword,
        googleId
      });
      
      await user.save();
    } else if (!user.googleId) {
      // Update existing user with Google ID if they didn't have one
      user.googleId = googleId;
      await user.save();
    }
    
    // Create JWT token
    const jwtPayload = {
      user: {
        id: user.id,
        role: user.role
      }
    };
    
    jwt.sign(
      jwtPayload,
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        
        // Redirect to frontend with token in query params
        // Alternative: set token in an HttpOnly cookie
        res.redirect(`${process.env.FRONTEND_URL}/auth-callback?token=${token}&userId=${user.id}`);
      }
    );
  } catch (error) {
    console.error('Google callback error:', error);
    res.redirect(`${process.env.FRONTEND_URL}/signin?error=google_auth_failed`);
  }
};