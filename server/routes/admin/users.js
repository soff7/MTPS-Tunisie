const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');

// Self-contained authentication middleware
const requireDashboardAccess = async (req, res, next) => {
  try {
    // Vérifier la présence du token
    const token = req.header('Authorization')?.replace('Bearer ', '') || 
                  req.header('x-auth-token') ||
                  req.cookies?.token;
    
    if (!token) {
      return res.status(401).json({ 
        message: 'Token d\'accès requis' 
      });
    }

    // Vérifier et décoder le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    // Récupérer l'utilisateur complet depuis la base de données
    const User = require('../../models/User');
    const user = await User.findById(decoded.id || decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ 
        message: 'Utilisateur non trouvé' 
      });
    }

    // Vérifier si l'utilisateur est actif
    if (!user.isActive) {
      return res.status(403).json({ 
        message: 'Compte utilisateur désactivé' 
      });
    }

    // Vérifier si l'utilisateur a accès au dashboard
    if (!user.hasDashboardAccess || !user.hasDashboardAccess()) {
      return res.status(403).json({ 
        message: 'Accès refusé. Privilèges insuffisants.' 
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Erreur d\'authentification:', error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Token invalide' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expiré' });
    }
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Middleware pour vérifier l'accès à une fonctionnalité spécifique
const checkFeatureAccess = (featureName) => {
  return async (req, res, next) => {
    try {
      await requireDashboardAccess(req, res, () => {
        const user = req.user;
        
        const featureAccess = {
          'users': user.isSuperAdmin && user.isSuperAdmin(),
          'contacts': (user.isAdmin && user.isAdmin()) || (user.hasPrivilege && user.hasPrivilege('contacts_management')),
          'reports': (user.hasPrivilege && user.hasPrivilege('reports_access')) || (user.isAdmin && user.isAdmin()),
          'settings': user.isSuperAdmin && user.isSuperAdmin(),
          'profile': true
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

// GET - Vérifier l'accès au dashboard
router.get('/check-access', requireDashboardAccess, async (req, res) => {
  try {
    const user = req.user;
    
    // Retourner les informations d'accès de l'utilisateur
    res.json({
      hasAccess: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        privileges: user.privileges,
        isActive: user.isActive
      },
      permissions: {
        canManageUsers: user.hasPrivilege('users_management') || user.isSuperAdmin(),
        canManageContacts: user.hasPrivilege('contacts_management') || user.isAdmin(),
        canViewReports: user.hasPrivilege('reports_access') || user.isAdmin(),
        canAccessSettings: user.hasPrivilege('system_settings') || user.isSuperAdmin(),
        dashboardFeatures: {
          users: user.isSuperAdmin(),
          contacts: user.isAdmin() || user.hasPrivilege('contacts_management'),
          reports: user.hasPrivilege('reports_access') || user.isAdmin(),
          settings: user.isSuperAdmin()
        }
      }
    });
  } catch (error) {
    console.error('Erreur lors de la vérification d\'accès:', error);
    res.status(500).json({ 
      message: 'Erreur serveur lors de la vérification d\'accès' 
    });
  }
});

// GET - Obtenir les statistiques du dashboard selon les privilèges
router.get('/stats', requireDashboardAccess, async (req, res) => {
  try {
    const user = req.user;
    const User = require('../../models/User');
    
    let stats = {
      welcome: `Bienvenue, ${user.name}`,
      role: user.role,
      lastLogin: user.lastLogin
    };

    // Statistiques pour SuperAdmin
    if (user.isSuperAdmin()) {
      const totalUsers = await User.countDocuments({ isActive: true });
      const totalAdmins = await User.countDocuments({ role: 'Admin', isActive: true });
      const totalSuperAdmins = await User.countDocuments({ role: 'SuperAdmin', isActive: true });
      
      stats.users = {
        total: totalUsers,
        admins: totalAdmins,
        superAdmins: totalSuperAdmins,
        managers: totalUsers - totalAdmins - totalSuperAdmins
      };
    }

    // Statistiques pour Admin
    if (user.isAdmin()) {
      // Ajouter les statistiques des contacts si le modèle existe
      try {
        const Contact = require('../../models/Contact');
        const totalContacts = await Contact.countDocuments();
        const recentContacts = await Contact.countDocuments({
          createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
        });
        
        stats.contacts = {
          total: totalContacts,
          recent: recentContacts
        };
      } catch (error) {
        // Le modèle Contact n'existe pas encore
        stats.contacts = {
          total: 0,
          recent: 0
        };
      }
    }

    res.json(stats);
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    res.status(500).json({ 
      message: 'Erreur serveur lors de la récupération des statistiques' 
    });
  }
});

// GET - Vérifier l'accès à une fonctionnalité spécifique
router.get('/feature/:featureName', requireDashboardAccess, async (req, res) => {
  try {
    const { featureName } = req.params;
    const user = req.user;
    
    const featureAccess = {
      'users': user.isSuperAdmin(),
      'contacts': user.isAdmin() || user.hasPrivilege('contacts_management'),
      'reports': user.hasPrivilege('reports_access') || user.isAdmin(),
      'settings': user.isSuperAdmin(),
      'profile': true // Tous les utilisateurs connectés peuvent voir leur profil
    };

    const hasAccess = featureAccess[featureName] || false;

    res.json({
      feature: featureName,
      hasAccess,
      userRole: user.role,
      message: hasAccess ? 'Accès autorisé' : 'Accès refusé'
    });
  } catch (error) {
    console.error('Erreur lors de la vérification de fonctionnalité:', error);
    res.status(500).json({ 
      message: 'Erreur serveur' 
    });
  }
});

module.exports = router;