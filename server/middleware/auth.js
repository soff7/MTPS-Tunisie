const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = (req, res, next) => {
  // Récupérer le token depuis l'en-tête Authorization
  const authHeader = req.header('Authorization');
  let token = null;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7); // Enlever "Bearer "
  }

  // Vérifier si aucun token n'est fourni
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Accès refusé. Aucun token fourni.' 
    });
  }

  try {
    // Vérifier le token
    const decoded = jwt.verify(token, keys.secretOrKey);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Erreur de vérification du token:', err.message);
    
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false, 
        message: 'Token expiré' 
      });
    } else if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false, 
        message: 'Token invalide' 
      });
    } else {
      return res.status(401).json({ 
        success: false, 
        message: 'Erreur d\'authentification' 
      });
    }
  }
};