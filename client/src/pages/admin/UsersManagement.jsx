// client/src/pages/admin/UsersManagement.jsx
import React, { useState, useEffect } from 'react';
import { FaUser, FaEdit, FaTrash, FaPlus, FaSearch, FaTimes, FaCheck } from 'react-icons/fa';
import '../../styles/admin/UsersManagement.css';

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  
  // Pour le formulaire d'ajout/modification d'utilisateur
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user',
    password: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  
  useEffect(() => {
    // Note: Comme nous n'avons pas encore d'endpoint pour récupérer tous les utilisateurs,
    // nous allons simuler avec des données de test
    fetchUsers();
  }, []);
  
  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      // Simulation de données utilisateurs pour la démonstration
      // Dans un vrai projet, vous feriez un appel API ici
      const mockUsers = [
        {
          _id: '1',
          name: 'Admin Principal',
          email: 'admin@mtps.tn',
          role: 'admin',
          createdAt: new Date('2024-01-15').toISOString()
        },
        {
          _id: '2',
          name: 'Super Admin',
          email: 'superadmin@mtps.tn',
          role: 'superadmin',
          createdAt: new Date('2024-01-10').toISOString()
        },
        {
          _id: '3',
          name: 'Utilisateur Test',
          email: 'user@test.com',
          role: 'user',
          createdAt: new Date('2024-02-01').toISOString()
        }
      ];
      
      // Simuler un délai de chargement
      setTimeout(() => {
        setUsers(mockUsers);
        setIsLoading(false);
      }, 1000);
      
    } catch (err) {
      console.error('Erreur fetch users:', err);
      setError('Erreur de connexion au serveur');
      setIsLoading(false);
    }
  };
  
  const openUserModal = (user = null) => {
    if (user) {
      setSelectedUser(user);
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        password: ''
      });
      setIsEditing(true);
    } else {
      setSelectedUser(null);
      setFormData({
        name: '',
        email: '',
        role: 'user',
        password: ''
      });
      setIsEditing(false);
    }
    setShowModal(true);
  };
  
  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
    setFormData({
      name: '',
      email: '',
      role: 'user',
      password: ''
    });
    setIsEditing(false);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation simple
    if (!formData.name || !formData.email) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    if (!isEditing && !formData.password) {
      alert('Le mot de passe est requis pour un nouvel utilisateur');
      return;
    }
    
    try {
      if (isEditing) {
        // Mise à jour utilisateur
        console.log('Mise à jour utilisateur:', formData);
        // Ici vous feriez l'appel API pour mettre à jour
        
        // Simulation de mise à jour
        setUsers(users.map(user => 
          user._id === selectedUser._id 
            ? { ...user, name: formData.name, email: formData.email, role: formData.role }
            : user
        ));
      } else {
        // Création nouvel utilisateur
        console.log('Création utilisateur:', formData);
        // Ici vous feriez l'appel API pour créer
        
        // Simulation de création
        const newUser = {
          _id: Date.now().toString(),
          name: formData.name,
          email: formData.email,
          role: formData.role,
          createdAt: new Date().toISOString()
        };
        setUsers([...users, newUser]);
      }
      
      closeModal();
    } catch (err) {
      console.error('Erreur sauvegarde:', err);
      alert('Erreur lors de la sauvegarde');
    }
  };
  
  const deleteUser = async (userId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      return;
    }
    
    try {
      console.log('Suppression utilisateur:', userId);
      // Ici vous feriez l'appel API pour supprimer
      
      // Simulation de suppression
      setUsers(users.filter(user => user._id !== userId));
    } catch (err) {
      console.error('Erreur suppression:', err);
      alert('Erreur lors de la suppression');
    }
  };
  
  const getRoleLabel = (role) => {
    switch (role) {
      case 'superadmin': return 'Super Admin';
      case 'admin': return 'Admin';
      case 'user': return 'Utilisateur';
      default: return role;
    }
  };
  
  const getRoleColor = (role) => {
    switch (role) {
      case 'superadmin': return 'role-superadmin';
      case 'admin': return 'role-admin';
      case 'user': return 'role-user';
      default: return 'role-user';
    }
  };
  
  // Filtrer les utilisateurs
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });
  
  if (isLoading) {
    return (
      <div className="users-loading">
        <div className="loading-spinner"></div>
        <p>Chargement des utilisateurs...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="users-error">
        <p>Erreur: {error}</p>
        <button onClick={fetchUsers} className="retry-btn">
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="users-management">
      <div className="page-header">
        <div>
          <h1>Gestion des Utilisateurs</h1>
          <p>Gérez les utilisateurs et leurs permissions</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => openUserModal()}
        >
          <FaPlus /> Ajouter Utilisateur
        </button>
      </div>
      
      <div className="users-filters">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Rechercher par nom ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="role-filters">
          <button 
            className={`filter-btn ${roleFilter === 'all' ? 'active' : ''}`}
            onClick={() => setRoleFilter('all')}
          >
            Tous ({users.length})
          </button>
          <button 
            className={`filter-btn ${roleFilter === 'superadmin' ? 'active' : ''}`}
            onClick={() => setRoleFilter('superadmin')}
          >
            Super Admins ({users.filter(u => u.role === 'superadmin').length})
          </button>
          <button 
            className={`filter-btn ${roleFilter === 'admin' ? 'active' : ''}`}
            onClick={() => setRoleFilter('admin')}
          >
            Admins ({users.filter(u => u.role === 'admin').length})
          </button>
          <button 
            className={`filter-btn ${roleFilter === 'user' ? 'active' : ''}`}
            onClick={() => setRoleFilter('user')}
          >
            Utilisateurs ({users.filter(u => u.role === 'user').length})
          </button>
        </div>
      </div>
      
      <div className="users-table">
        <div className="table-header">
          <h2>Utilisateurs ({filteredUsers.length})</h2>
        </div>
        
        {filteredUsers.length === 0 ? (
          <div className="no-users">
            <FaUser size={48} />
            <h3>Aucun utilisateur trouvé</h3>
            <p>
              {searchTerm || roleFilter !== 'all' 
                ? 'Aucun utilisateur ne correspond à vos critères de recherche.' 
                : 'Aucun utilisateur enregistré pour le moment.'
              }
            </p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Rôle</th>
                  <th>Date d'inscription</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <div className="user-info">
                        <div className="user-avatar">
                          <FaUser />
                        </div>
                        <span>{user.name}</span>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`role-badge ${getRoleColor(user.role)}`}>
                        {getRoleLabel(user.role)}
                      </span>
                    </td>
                    <td>
                      {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="btn btn-sm btn-primary"
                          onClick={() => openUserModal(user)}
                          title="Modifier"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          className="btn btn-sm btn-danger"
                          onClick={() => deleteUser(user._id)}
                          title="Supprimer"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Modal d'ajout/modification */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{isEditing ? 'Modifier Utilisateur' : 'Ajouter Utilisateur'}</h3>
              <button className="modal-close" onClick={closeModal}>
                <FaTimes />
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Nom complet *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Rôle *</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="form-select"
                    required
                  >
                    <option value="user">Utilisateur</option>
                    <option value="admin">Admin</option>
                    <option value="superadmin">Super Admin</option>
                  </select>
                </div>
                
                {!isEditing && (
                  <div className="form-group">
                    <label className="form-label">Mot de passe *</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                )}
                
                {isEditing && (
                  <div className="form-group">
                    <label className="form-label">Nouveau mot de passe (optionnel)</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Laisser vide pour conserver le mot de passe actuel"
                    />
                  </div>
                )}
              </div>
              
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Annuler
                </button>
                <button type="submit" className="btn btn-primary">
                  <FaCheck /> {isEditing ? 'Mettre à jour' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersManagement;