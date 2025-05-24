// client/src/components/admin/AdminSidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaEnvelope, 
  FaUsers, 
  FaBox, 
  FaChartBar,
  FaCog,
  FaHome,
  FaSignOutAlt
} from 'react-icons/fa';
import '../../styles/admin/AdminSidebar.css';

const AdminSidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    {
      path: '/admin',
      icon: <FaTachometerAlt />,
      label: 'Dashboard',
      exact: true
    },
    {
      path: '/admin/contacts',
      icon: <FaEnvelope />,
      label: 'Messages',
      badge: true // Pour afficher le nombre de nouveaux messages
    },
    {
      path: '/admin/users',
      icon: <FaUsers />,
      label: 'Utilisateurs'
    },
    {
      path: '/admin/products',
      icon: <FaBox />,
      label: 'Produits'
    },
    {
      path: '/admin/analytics',
      icon: <FaChartBar />,
      label: 'Analytiques'
    },
    {
      path: '/admin/settings',
      icon: <FaCog />,
      label: 'Paramètres'
    }
  ];
  
  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    window.location.href = '/';
  };

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <img src="/assets/logo.png" alt="MTPS Admin" />
          <span>MTPS Admin</span>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        <ul className="nav-menu">
          {menuItems.map((item, index) => (
            <li key={index} className="nav-item">
              <Link 
                to={item.path} 
                className={`nav-link ${isActive(item.path, item.exact) ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
                {item.badge && (
                  <span className="nav-badge">5</span> // Nombre dynamique plus tard
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        <Link to="/" className="nav-link">
          <span className="nav-icon"><FaHome /></span>
          <span className="nav-label">Retour au site</span>
        </Link>
        
        <button onClick={handleLogout} className="nav-link logout-btn">
          <span className="nav-icon"><FaSignOutAlt /></span>
          <span className="nav-label">Déconnexion</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;