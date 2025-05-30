import React, { useState, useEffect } from 'react';
import { FaBell, FaUser, FaSearch, FaChevronDown, FaSignOutAlt } from 'react-icons/fa';
import './AdminHeader.css';

const AdminHeader = () => {
  const [user, setUser] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);
  
  const toggleProfileMenu = () => setShowProfileMenu(!showProfileMenu);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    window.location.href = '/';
  };

  return (
    <header className="header">
      <div className="headerLeft">
        <h1 className="pageTitle">Dashboard</h1>
        <div className="breadcrumb">
          <span>Admin</span>
          <span className="separator">/</span>
          <span>Dashboard</span>
        </div>
      </div>
      
      <div className="headerCenter">
        <div className="searchBox">
          <FaSearch className="searchIcon" />
          <input 
            type="text" 
            placeholder="Rechercher..." 
            className="searchInput"
          />
        </div>
      </div>
      
      <div className="headerRight">
        <div className="headerActions">
          <button className="notificationBtn">
            <FaBell />
            {notifications > 0 && (
              <span className="notificationBadge">{notifications}</span>
            )}
          </button>
          
          <div className="profileMenu">
            <button 
              className="profileBtn"
              onClick={toggleProfileMenu}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={isHovered ? { backgroundColor: 'var(--admin-bg, #f7fafc)' } : {}}
            >
              <div className="profileAvatar">
                <FaUser />
              </div>
              <div className="profileInfo">
                <span className="profileName">
                  {user?.name || 'Administrateur'}
                </span>
                <span className="profileRole">
                  {user?.role === 'superadmin' ? 'Super Admin' : 'Admin'}
                </span>
              </div>
              <FaChevronDown className="dropdownIcon" />
            </button>
            
            {showProfileMenu && (
              <div className="profileDropdown">
                <div className="dropdownHeader">
                  <div className="userDetails">
                    <strong>{user?.name}</strong>
                    <small>{user?.email}</small>
                  </div>
                </div>
                <div className="dropdownDivider"></div>
                <ul className="dropdownMenu">
                  <li>
                    <button className="dropdownItem">
                      <FaUser /> Mon Profil
                    </button>
                  </li>
                  <li>
                    <button 
                      className="dropdownItem lastChild"
                      onClick={handleLogout}
                    >
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

// ✅ Exportation par défaut à ne pas oublier
export default AdminHeader;
