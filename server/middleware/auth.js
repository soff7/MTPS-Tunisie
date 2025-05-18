const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = function(req, res, next) {
  // Récupérer le token depuis le header
  const authHeader = req.header('Authorization');
  
  // Vérifier si le token existe
  if (!authHeader) {
    return res.status(401).json({ success: false, message: 'Pas de token, autorisation refusée' });
  }
  
  // Format attendu: "Bearer [token]"
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ success: false, message: 'Format de token invalide' });
  }
  
  const token = parts[1];

  try {
    // Vérifier le token
    const decoded = jwt.verify(token, keys.secretOrKey);
    
    // Ajouter l'utilisateur au request
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Token error:', err.message);
    res.status(401).json({ success: false, message: 'Token non valide' });
  }
};