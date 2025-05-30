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
import './AdminSidebar.css';

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
      badge: true
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

  // Fonction pour combiner les classes
  const combineClassNames = (...classNames) => classNames.filter(Boolean).join(' ');

  return (
    <aside className="sidebar">
      <div className="sidebarHeader">
        <div className="sidebarLogo">
          <img 
            src="/assets/logo.png" 
            alt="MTPS Admin" 
            className="logoImg"
          />
          <span className="logoText">MTPS Admin</span>
        </div>
      </div>
      
      <nav className="sidebarNav">
        <ul className="navMenu">
          {menuItems.map((item, index) => (
            <li key={index} className="navItem">
              <Link 
                to={item.path} 
                className={combineClassNames(
                  'navLink',
                  isActive(item.path, item.exact) ? 'navLinkActive' : ''
                )}
              >
                <span className="navIcon">{item.icon}</span>
                <span className="navLabel">{item.label}</span>
                {item.badge && (
                  <span className="navBadge">5</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="sidebarFooter">
        <Link 
          to="/" 
          className="navLink footerNavLink"
        >
          <span className="navIcon"><FaHome /></span>
          <span className="navLabel">Retour au site</span>
        </Link>
        
        <button 
          onClick={handleLogout} 
          className="navLink logoutBtn"
        >
          <span className="navIcon"><FaSignOutAlt /></span>
          <span className="navLabel">Déconnexion</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
