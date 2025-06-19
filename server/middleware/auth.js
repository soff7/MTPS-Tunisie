const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token') || req.header('Authorization')?.replace('Bearer ', '');

  // Check if no token
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Pas de token, accès refusé' 
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, keys.secretOrKey);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Token verification error:', err);
    res.status(401).json({ 
      success: false, 
      message: 'Token invalide' 
    });
  }
};