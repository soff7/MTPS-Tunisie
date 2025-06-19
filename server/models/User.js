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
    case 'Manager':
      return [
        'dashboard_access',
        'contacts_view',
        'reports_view'
      ];
    default:
      return ['dashboard_access'];
  }
};

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['SuperAdmin', 'Admin', 'Manager', 'User'],
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
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash du mot de passe avant sauvegarde
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
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

// Méthode pour vérifier le mot de passe
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
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

const User = mongoose.model('User', UserSchema);

module.exports = User;