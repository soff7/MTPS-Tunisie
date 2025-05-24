// server/routes/admin/users.js - Routes pour la gestion des utilisateurs
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const auth = require('../../middleware/auth');

// Middleware pour vérifier les droits admin
const adminAuth = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || (user.role !== 'admin' && user.role !== 'superadmin')) {
      return res.status(403).json({ success: false, message: 'Accès refusé - Droits administrateur requis' });
    }
    req.adminUser = user;
    next();
  } catch (err) {
    console.error('Erreur vérification admin:', err);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

// @route   GET /api/admin/users
// @desc    Récupérer tous les utilisateurs
// @access  Private/Admin
router.get('/', auth, adminAuth, async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', role = '' } = req.query;
    
    // Construire les filtres de recherche
    let filter = {};
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (role && role !== 'all') {
      filter.role = role;
    }
    
    // Pagination
    const skip = (page - 1) * limit;
    
    // Récupérer les utilisateurs avec pagination
    const users = await User.find(filter)
      .select('-password') // Exclure le mot de passe
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    // Compter le total pour la pagination
    const total = await User.countDocuments(filter);
    
    res.json({
      success: true,
      data: {
        users,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (err) {
    console.error('Erreur récupération utilisateurs:', err);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

// @route   GET /api/admin/users/:id
// @desc    Récupérer un utilisateur par ID
// @access  Private/Admin
router.get('/:id', auth, adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
    }
    
    res.json({ success: true, data: user });
  } catch (err) {
    console.error('Erreur récupération utilisateur:', err);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

// @route   POST /api/admin/users
// @desc    Créer un nouvel utilisateur
// @access  Private/Admin
router.post('/', auth, adminAuth, async (req, res) => {
  try {
    const { name, email, password, role = 'user' } = req.body;
    
    // Validation des données
    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Nom, email et mot de passe sont requis' 
      });
    }
    
    // Vérifier si l'email existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'Un utilisateur avec cet email existe déjà' 
      });
    }
    
    // Vérifier les permissions pour créer des admins
    if ((role === 'admin' || role === 'superadmin') && req.adminUser.role !== 'superadmin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Seuls les super admins peuvent créer des administrateurs' 
      });
    }
    
    // Créer le nouvel utilisateur
    const user = new User({
      name,
      email,
      password,
      role
    });
    
    // Hasher le mot de passe
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    
    await user.save();
    
    // Retourner l'utilisateur sans le mot de passe
    const userResponse = await User.findById(user._id).select('-password');
    
    res.status(201).json({
      success: true,
      message: 'Utilisateur créé avec succès',
      data: userResponse
    });
  } catch (err) {
    console.error('Erreur création utilisateur:', err);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

// @route   PUT /api/admin/users/:id
// @desc    Mettre à jour un utilisateur
// @access  Private/Admin
router.put('/:id', auth, adminAuth, async (req, res) => {
  try {
    const { name, email, role, password } = req.body;
    
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
    }
    
    // Vérifier les permissions pour modifier des admins
    if ((user.role === 'admin' || user.role === 'superadmin') && req.adminUser.role !== 'superadmin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Seuls les super admins peuvent modifier des administrateurs' 
      });
    }
    
    if ((role === 'admin' || role === 'superadmin') && req.adminUser.role !== 'superadmin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Seuls les super admins peuvent attribuer des rôles d\'administrateur' 
      });
    }
    
    // Vérifier l'unicité de l'email si modifié
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ 
          success: false, 
          message: 'Un utilisateur avec cet email existe déjà' 
        });
      }
    }
    
    // Mettre à jour les champs
    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;
    
    // Mettre à jour le mot de passe si fourni
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }
    
    await user.save();
    
    // Retourner l'utilisateur mis à jour sans le mot de passe
    const updatedUser = await User.findById(user._id).select('-password');
    
    res.json({
      success: true,
      message: 'Utilisateur mis à jour avec succès',
      data: updatedUser
    });
  } catch (err) {
    console.error('Erreur mise à jour utilisateur:', err);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

// @route   DELETE /api/admin/users/:id
// @desc    Supprimer un utilisateur
// @access  Private/Admin
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
    }
    
    // Empêcher la suppression de son propre compte
    if (user._id.toString() === req.user.id) {
      return res.status(400).json({ 
        success: false, 
        message: 'Vous ne pouvez pas supprimer votre propre compte' 
      });
    }
    
    // Vérifier les permissions pour supprimer des admins
    if ((user.role === 'admin' || user.role === 'superadmin') && req.adminUser.role !== 'superadmin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Seuls les super admins peuvent supprimer des administrateurs' 
      });
    }
    
    await User.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'Utilisateur supprimé avec succès'
    });
  } catch (err) {
    console.error('Erreur suppression utilisateur:', err);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

// @route   GET /api/admin/users/stats/overview
// @desc    Statistiques des utilisateurs
// @access  Private/Admin
router.get('/stats/overview', auth, adminAuth, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const adminUsers = await User.countDocuments({ role: 'admin' });
    const superAdminUsers = await User.countDocuments({ role: 'superadmin' });
    const regularUsers = await User.countDocuments({ role: 'user' });
    
    // Utilisateurs récents (7 derniers jours)
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    const recentUsers = await User.countDocuments({ 
      createdAt: { $gte: lastWeek } 
    });
    
    res.json({
      success: true,
      data: {
        total: totalUsers,
        byRole: {
          admin: adminUsers,
          superadmin: superAdminUsers,
          user: regularUsers
        },
        recent: recentUsers
      }
    });
  } catch (err) {
    console.error('Erreur stats utilisateurs:', err);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

module.exports = router;