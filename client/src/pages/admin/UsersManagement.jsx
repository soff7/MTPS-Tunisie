import React, { useState, useEffect } from 'react';
import { FaUser, FaEdit, FaTrash, FaPlus, FaSearch, FaTimes, FaCheck } from 'react-icons/fa';

// Function to return the CSS string
const getUsersManagementCss = () => `
.users-management {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem; /* Added padding for smaller screens */
}

/* Header de la page */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  gap: 1rem;
}

.page-header h1 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--admin-text-primary);
  margin: 0 0 0.5rem 0;
}

.page-header p {
  color: var(--admin-text-secondary);
  font-size: 1rem;
  margin: 0;
}

/* Filtres et recherche */
.users-filters {
  background: var(--admin-card-bg);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: var(--admin-shadow-sm);
  border: 1px solid var(--admin-border);
}

.search-box {
  position: relative;
  margin-bottom: 1.5rem;
  max-width: 400px;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid var(--admin-border);
  border-radius: 8px;
  font-size: 0.875rem;
  background: var(--admin-bg);
  transition: all 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--admin-primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--admin-text-secondary);
  font-size: 0.875rem;
}

.role-filters {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--admin-border);
  background: var(--admin-bg);
  color: var(--admin-text-primary);
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.filter-btn:hover {
  background: var(--admin-border);
}

.filter-btn.active {
  background: var(--admin-primary);
  color: white;
  border-color: var(--admin-primary);
}

/* Table des utilisateurs */
.users-table {
  background: var(--admin-card-bg);
  border-radius: 12px;
  box-shadow: var(--admin-shadow-sm);
  border: 1px solid var(--admin-border);
  overflow: hidden;
}

.table-header {
  background: var(--admin-bg);
  padding: 1.5rem;
  border-bottom: 1px solid var(--admin-border);
}

.table-header h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--admin-text-primary);
  margin: 0;
}

.table-wrapper {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  padding: 1rem 1.5rem;
  text-align: left;
  border-bottom: 1px solid var(--admin-border);
}

.data-table th {
  background: var(--admin-bg);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--admin-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.data-table td {
  font-size: 0.875rem;
  color: var(--admin-text-primary);
}

.data-table tbody tr:hover {
  background: var(--admin-bg);
}

.data-table tbody tr:last-child td {
  border-bottom: none;
}

/* Info utilisateur */
.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-avatar {
  width: 32px;
  height: 32px;
  background: var(--admin-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.875rem;
}

/* Badges de rôle */
.role-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
}

.role-badge.role-superadmin {
  background: rgba(139, 92, 246, 0.1);
  color: #8b5cf6;
}

.role-badge.role-admin {
  background: rgba(37, 99, 235, 0.1);
  color: var(--admin-primary);
}

.role-badge.role-user {
  background: rgba(107, 114, 128, 0.1);
  color: #6b7280;
}

/* Boutons d'action */
.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  min-width: 32px;
  height: 32px;
  gap: 0.5rem;
}

.btn-sm {
  padding: 0.375rem;
  min-width: 28px;
  height: 28px;
}

.btn-primary {
  background: var(--admin-primary);
  color: white;
}

.btn-primary:hover {
  background: var(--admin-primary-dark);
}

.btn-secondary {
  background: var(--admin-bg);
  color: var(--admin-text-primary);
  border: 1px solid var(--admin-border);
}

.btn-secondary:hover {
  background: var(--admin-border);
}

.btn-danger {
  background: var(--admin-danger);
  color: white;
}

.btn-danger:hover {
  background: #dc2626;
}

/* États vides */
.no-users {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--admin-text-secondary);
}

.no-users svg {
  color: var(--admin-border);
  margin-bottom: 1rem;
}

.no-users h3 {
  font-size: 1.25rem;
  color: var(--admin-text-primary);
  margin: 1rem 0 0.5rem 0;
}

.no-users p {
  margin: 0;
  line-height: 1.6;
}

/* États de chargement et erreur */
.users-loading,
.users-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  gap: 1rem;
  background: var(--admin-card-bg);
  border-radius: 12px;
  box-shadow: var(--admin-shadow-sm);
  border: 1px solid var(--admin-border);
}

.users-error p {
  color: var(--admin-danger);
  margin: 0;
  font-weight: 500;
}

.retry-btn {
  background: var(--admin-primary);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.retry-btn:hover {
  background: var(--admin-primary-dark);
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.modal-content {
  background: var(--admin-card-bg);
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--admin-shadow-lg);
  animation: modalSlideIn 0.3s ease;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid var(--admin-border);
}

.modal-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--admin-text-primary);
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  color: var(--admin-text-secondary);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.modal-close:hover {
  background: var(--admin-bg);
  color: var(--admin-text-primary);
}

.modal-body {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--admin-text-primary);
  margin-bottom: 0.5rem;
}

.form-input,
.form-select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--admin-border);
  border-radius: 6px;
  font-size: 0.875rem;
  background: var(--admin-card-bg);
  color: var(--admin-text-primary);
  transition: all 0.2s ease;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: var(--admin-primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.form-select {
  cursor: pointer;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1.5rem;
  border-top: 1px solid var(--admin-border);
  gap: 1rem;
}

/* Responsive */
@media (max-width: 1200px) {
  .data-table th,
  .data-table td {
    padding: 0.75rem;
  }
}

@media (max-width: 768px) {
  .users-management {
    padding: 0;
  }
  
  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .role-filters {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }
  
  .data-table th,
  .data-table td {
    padding: 0.5rem;
    font-size: 0.75rem;
  }
  
  .user-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .user-avatar {
    width: 24px;
    height: 24px;
    font-size: 0.75rem;
  }
  
  .modal-overlay {
    padding: 1rem;
  }
  
  .modal-footer {
    flex-direction: column-reverse;
    gap: 1rem;
    align-items: stretch;
  }
  
  .modal-footer .btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .page-header h1 {
    font-size: 1.5rem;
  }
  
  .users-filters {
    padding: 1rem;
  }
  
  .role-filters {
    grid-template-columns: 1fr;
  }
  
  .table-header {
    padding: 1rem;
  }
}
`;

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
    // Inject the CSS into the DOM when the component mounts
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = getUsersManagementCss();
    document.head.appendChild(styleSheet);

    fetchUsers();

    // Clean up the style tag when the component unmounts
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');

      const response = await fetch(`${API_BASE_URL}/api/users`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors du chargement des utilisateurs');
      }

      const data = await response.json();
      setUsers(data);
      setIsLoading(false);
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
        password: '' // Don't pre-fill password for security
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

    // Simple validation
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
        // Update user
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/api/users/${selectedUser._id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            role: formData.role,
            password: formData.password || undefined
          })
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la mise à jour de l\'utilisateur');
        }

        const updatedUser = await response.json();

        setUsers(users.map(user =>
          user._id === selectedUser._id ? updatedUser : user
        ));
      } else {
        // Create new user
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/api/users`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            role: formData.role,
            password: formData.password
          })
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la création de l\'utilisateur');
        }

        const newUser = await response.json();

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
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression de l\'utilisateur');
      }

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

  // Filter users
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