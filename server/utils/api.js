const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const jwt = require('jsonwebtoken');

// Self-contained authentication middleware
const requireDashboardAccess = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '') || 
                  req.header('x-auth-token') ||
                  req.cookies?.token;
    
    if (!token) {
      return res.status(401).json({ 
        message: 'Token d\'accès requis' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const user = await User.findById(decoded.id || decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ 
        message: 'Utilisateur non trouvé' 
      });
    }

    if (!user.isActive) {
      return res.status(403).json({ 
        message: 'Compte utilisateur désactivé' 
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

// Middleware pour vérifier les droits SuperAdmin
const requireSuperAdmin = async (req, res, next) => {
  try {
    if (!req.user || !req.user.isSuperAdmin()) {
      return res.status(403).json({
        message: 'Accès refusé. Droits SuperAdmin requis.'
      });
    }
    next();
  } catch (error) {
    console.error('Erreur vérification SuperAdmin:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// GET /api/users - Récupérer tous les utilisateurs
router.get('/', requireDashboardAccess, requireSuperAdmin, async (req, res) => {
  try {
    const users = await User.find({ isActive: true })
      .select('-password')
      .sort({ createdAt: -1 });
    
    console.log(`${users.length} utilisateurs trouvés`);
    res.json(users);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    res.status(500).json({ 
      message: 'Erreur serveur lors de la récupération des utilisateurs',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// POST /api/users - Créer un nouvel utilisateur
router.post('/', requireDashboardAccess, requireSuperAdmin, async (req, res) => {
  try {
    const { name, email, password, role = 'Admin' } = req.body;
    
    // Validation des données
    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Nom, email et mot de passe sont requis'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: 'Le mot de passe doit contenir au moins 6 caractères'
      });
    }

    // Vérifier si l'email existe déjà
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        message: 'Un utilisateur avec cet email existe déjà'
      });
    }

    // Validation du rôle
    const validRoles = ['Admin', 'SuperAdmin', 'Manager', 'User'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({
        message: 'Rôle invalide'
      });
    }

    // Seul SuperAdmin peut créer d'autres SuperAdmin
    if (role === 'SuperAdmin' && !req.user.isSuperAdmin()) {
      return res.status(403).json({
        message: 'Seul un SuperAdmin peut créer d\'autres SuperAdmin'
      });
    }

    // Créer l'utilisateur
    const newUser = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      role
    });

    await newUser.save();
    
    // Retourner l'utilisateur sans le mot de passe
    const userResponse = await User.findById(newUser._id).select('-password');
    
    console.log('Nouvel utilisateur créé:', userResponse.email);
    res.status(201).json(userResponse);
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        message: 'Un utilisateur avec cet email existe déjà'
      });
    }
    
    res.status(500).json({ 
      message: 'Erreur serveur lors de la création de l\'utilisateur',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// PUT /api/users/:id - Modifier un utilisateur
router.put('/:id', requireDashboardAccess, requireSuperAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role } = req.body;
    
    // Validation des données
    if (!name || !email) {
      return res.status(400).json({
        message: 'Nom et email sont requis'
      });
    }

    // Vérifier si l'utilisateur existe
    const userToUpdate = await User.findById(id);
    if (!userToUpdate) {
      return res.status(404).json({
        message: 'Utilisateur non trouvé'
      });
    }

    // Empêcher la modification d'un SuperAdmin par un autre utilisateur
    if (userToUpdate.role === 'SuperAdmin' && userToUpdate._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: 'Impossible de modifier un autre SuperAdmin'
      });
    }

    // Validation du rôle si fourni
    if (role) {
      const validRoles = ['Admin', 'SuperAdmin', 'Manager', 'User'];
      if (!validRoles.includes(role)) {
        return res.status(400).json({
          message: 'Rôle invalide'
        });
      }

      // Seul SuperAdmin peut assigner le rôle SuperAdmin
      if (role === 'SuperAdmin' && !req.user.isSuperAdmin()) {
        return res.status(403).json({
          message: 'Seul un SuperAdmin peut assigner le rôle SuperAdmin'
        });
      }
    }

    // Vérifier l'unicité de l'email
    const existingUser = await User.findOne({ 
      email: email.toLowerCase(),
      _id: { $ne: id }
    });
    if (existingUser) {
      return res.status(400).json({
        message: 'Un utilisateur avec cet email existe déjà'
      });
    }

    // Mettre à jour l'utilisateur
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        ...(role && { role })
      },
      { new: true, runValidators: true }
    ).select('-password');

    console.log('Utilisateur modifié:', updatedUser.email);
    res.json(updatedUser);
  } catch (error) {
    console.error('Erreur lors de la modification de l\'utilisateur:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        message: 'Un utilisateur avec cet email existe déjà'
      });
    }
    
    res.status(500).json({ 
      message: 'Erreur serveur lors de la modification de l\'utilisateur',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// DELETE /api/users/:id - Supprimer un utilisateur
router.delete('/:id', requireDashboardAccess, requireSuperAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Vérifier si l'utilisateur existe
    const userToDelete = await User.findById(id);
    if (!userToDelete) {
      return res.status(404).json({
        message: 'Utilisateur non trouvé'
      });
    }

    // Empêcher la suppression d'un SuperAdmin
    if (userToDelete.role === 'SuperAdmin') {
      return res.status(403).json({
        message: 'Impossible de supprimer un SuperAdmin'
      });
    }

    // Empêcher l'auto-suppression
    if (userToDelete._id.toString() === req.user._id.toString()) {
      return res.status(403).json({
        message: 'Vous ne pouvez pas supprimer votre propre compte'
      });
    }

    // Supprimer l'utilisateur (soft delete)
    await User.findByIdAndUpdate(id, { 
      isActive: false,
      email: `deleted_${Date.now()}_${userToDelete.email}` // Éviter les conflits d'email
    });

    console.log('Utilisateur supprimé:', userToDelete.email);
    res.json({ 
      message: 'Utilisateur supprimé avec succès',
      deletedUser: {
        id: userToDelete._id,
        name: userToDelete.name,
        email: userToDelete.email
      }
    });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur:', error);
    res.status(500).json({ 
      message: 'Erreur serveur lors de la suppression de l\'utilisateur',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/users/:id - Récupérer un utilisateur spécifique
router.get('/:id', requireDashboardAccess, async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findById(id).select('-password');
    if (!user || !user.isActive) {
      return res.status(404).json({
        message: 'Utilisateur non trouvé'
      });
    }

    // Vérifier les permissions
    if (!req.user.isSuperAdmin() && req.user._id.toString() !== id) {
      return res.status(403).json({
        message: 'Accès refusé'
      });
    }

    res.json(user);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur:', error);
    res.status(500).json({ 
      message: 'Erreur serveur lors de la récupération de l\'utilisateur'
    });
  }
});

module.exports = router;