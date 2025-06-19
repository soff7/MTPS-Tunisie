const { authenticateToken } = require('./auth');

// Middleware pour vérifier l'accès au dashboard
const requireDashboardAccess = async (req, res, next) => {
  try {
    await authenticateToken(req, res, () => {
      if (!req.user?.hasDashboardAccess()) {
        return res.status(403).json({ 
          message: 'Accès refusé. Privilèges insuffisants.' 
        });
      }
      next();
    });
  } catch (error) {
    console.error('Erreur dans requireDashboardAccess:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Middleware pour vérifier l'accès à une fonctionnalité spécifique
const checkFeatureAccess = (featureName) => {
  return async (req, res, next) => {
    try {
      await authenticateToken(req, res, () => {
        const user = req.user;
        
        // Définir les règles d'accès pour chaque fonctionnalité
        const featureAccess = {
          'users': user.isSuperAdmin && user.isSuperAdmin(),
          'contacts': (user.isAdmin && user.isAdmin()) || (user.hasPrivilege && user.hasPrivilege('contacts_management')),
          'reports': (user.hasPrivilege && user.hasPrivilege('reports_access')) || (user.isAdmin && user.isAdmin()),
          'settings': user.isSuperAdmin && user.isSuperAdmin(),
          'profile': true // Tous les utilisateurs connectés peuvent voir leur profil
        };

        const hasAccess = featureAccess[featureName] || false;

        if (!hasAccess) {
          return res.status(403).json({
            message: `Accès refusé à la fonctionnalité: ${featureName}`,
            feature: featureName,
            userRole: user.role
          });
        }

        next();
      });
    } catch (error) {
      console.error(`Erreur dans checkFeatureAccess pour ${featureName}:`, error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  };
};

module.exports = { 
  requireDashboardAccess, 
  checkFeatureAccess 
};