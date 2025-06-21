const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const getDefaultPrivilegesByRole = (role) => {
  switch (role) {
    case 'SuperAdmin':
      return [
        'dashboard_access',
        'users_management',
        'users_create',
        'users_edit',
        'users_delete',
        'contacts_management',
        'system_settings',
        'reports_access',
        'full_admin_access'
      ];
    case 'Admin':
      return [
        'dashboard_access',
        'contacts_management',
        'reports_access',
        'basic_admin_access'
      ];
    default:
      return [];
  }
};

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Le nom est requis'],
    trim: true,
    minlength: [2, 'Le nom doit contenir au moins 2 caractères'],
    maxlength: [50, 'Le nom ne peut pas dépasser 50 caractères']
  },
  email: {
    type: String,
    required: [true, 'L\'email est requis'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Format d\'email invalide']
  },
  password: {
    type: String,
    required: [true, 'Le mot de passe est requis'],
    minlength: [6, 'Le mot de passe doit contenir au moins 6 caractères']
  },
  role: {
    type: String,
    enum: {
      values: ['SuperAdmin', 'Admin', 'User'],
      message: 'Rôle invalide'
    },
    default: 'User'
  },
  privileges: {
    type: [String],
    default: function() {
      return getDefaultPrivilegesByRole(this.role);
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index pour optimiser les requêtes
UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });
UserSchema.index({ isActive: 1 });

// Middleware pour mettre à jour updatedAt
UserSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Hash du mot de passe avant sauvegarde
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Mise à jour des privilèges quand le rôle change
UserSchema.pre('save', function(next) {
  if (this.isModified('role')) {
    this.privileges = getDefaultPrivilegesByRole(this.role);
  }
  next();
});

// Middleware pour findOneAndUpdate
UserSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: Date.now() });
  next();
});

// Méthode pour vérifier le mot de passe
UserSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Erreur lors de la vérification du mot de passe');
  }
};

// Méthodes de vérification de rôle
UserSchema.methods.isSuperAdmin = function() {
  return this.role === 'SuperAdmin';
};

UserSchema.methods.isAdmin = function() {
  return this.role === 'Admin' || this.isSuperAdmin();
};

// Méthode pour vérifier l'accès au dashboard
UserSchema.methods.hasDashboardAccess = function() {
  return this.isActive && (
    this.privileges.includes('dashboard_access') || 
    this.isAdmin()
  );
};

// Méthode pour vérifier les permissions
UserSchema.methods.hasPrivilege = function(privilege) {
  return this.isActive && (
    this.privileges.includes(privilege) ||
    this.isSuperAdmin()
  );
};

// Méthode pour obtenir les informations publiques de l'utilisateur
UserSchema.methods.getPublicProfile = function() {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    role: this.role,
    privileges: this.privileges,
    isActive: this.isActive,
    lastLogin: this.lastLogin,
    createdAt: this.createdAt
  };
};

// Méthode statique pour trouver les utilisateurs actifs
UserSchema.statics.findActive = function() {
  return this.find({ isActive: true });
};

// Méthode statique pour trouver par rôle
UserSchema.statics.findByRole = function(role) {
  return this.find({ role: role, isActive: true });
};

// Méthode pour mettre à jour la dernière connexion
UserSchema.methods.updateLastLogin = function() {
  this.lastLogin = new Date();
  return this.save();
};

// Transformation JSON pour exclure le mot de passe
UserSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
