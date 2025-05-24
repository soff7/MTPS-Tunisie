// client/src/components/admin/AdminHeader.jsx
import React, { useState, useEffect } from 'react';
import { FaBell, FaUser, FaSearch, FaChevronDown, FaSignOutAlt } from 'react-icons/fa';
import '../../styles/admin/AdminHeader.css';

const AdminHeader = () => {
  const [user, setUser] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifications, setNotifications] = useState(3); // Exemple
  
  useEffect(() => {
    // Récupérer les infos utilisateur
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);
  
  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    window.location.href = '/';
  };

  return (
    <header className="admin-header">
      <div className="header-left">
        <h1 className="page-title">Dashboard</h1>
        <div className="breadcrumb">
          <span>Admin</span>
          <span className="separator">/</span>
          <span>Dashboard</span>
        </div>
      </div>
      
      <div className="header-center">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Rechercher..." 
            className="search-input"
          />
        </div>
      </div>
      
      <div className="header-right">
        <div className="header-actions">
          <button className="notification-btn">
            <FaBell />
            {notifications > 0 && (
              <span className="notification-badge">{notifications}</span>
            )}
          </button>
          
          <div className="profile-menu">
            <button 
              className="profile-btn"
              onClick={toggleProfileMenu}
            >
              <div className="profile-avatar">
                <FaUser />
              </div>
              <div className="profile-info">
                <span className="profile-name">
                  {user?.name || 'Administrateur'}
                </span>
                <span className="profile-role">
                  {user?.role === 'superadmin' ? 'Super Admin' : 'Admin'}
                </span>
              </div>
              <FaChevronDown className="dropdown-icon" />
            </button>
            
            {showProfileMenu && (
              <div className="profile-dropdown">
                <div className="dropdown-header">
                  <div className="user-details">
                    <strong>{user?.name}</strong>
                    <small>{user?.email}</small>
                  </div>
                </div>
                <div className="dropdown-divider"></div>
                <ul className="dropdown-menu">
                  <li>
                    <button className="dropdown-item">
                      <FaUser /> Mon Profil
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      <FaSignOutAlt /> Déconnexion
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;