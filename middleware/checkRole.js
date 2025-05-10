module.exports = (roles = []) => {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Non authentifié' });
      }
  
      // Convertir en tableau si un seul rôle est fourni
      if (typeof roles === 'string') {
        roles = [roles];
      }
  
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ success: false, message: 'Accès non autorisé pour ce rôle' });
      }
  
      next();
    };
  };