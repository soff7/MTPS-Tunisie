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

  // Styles
  const styles = {
    sidebar: {
      position: 'fixed',
      left: 0,
      top: 0,
      width: 'var(--sidebar-width, 250px)',
      height: '100vh',
      backgroundColor: 'var(--admin-sidebar-bg, #1e293b)',
      color: 'var(--admin-text-light, #f8fafc)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      boxShadow: 'var(--admin-shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1))',
      fontFamily: "'Inter', sans-serif",
      fontSize: '14px',
      '@media (max-width: 1024px)': {
        transform: 'translateX(-100%)',
        transition: 'transform 0.3s ease',
      },
      '@media (max-width: 768px)': {
        width: '100%',
      }
    },
    sidebarOpen: {
      transform: 'translateX(0)'
    },
    sidebarHeader: {
      padding: '1.5rem',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      backgroundColor: 'var(--admin-sidebar-bg, #1e293b)'
    },
    sidebarLogo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    },
    logoImg: {
      width: '32px',
      height: '32px',
      borderRadius: '6px'
    },
    logoText: {
      fontSize: '1.25rem',
      fontWeight: 700,
      color: 'var(--admin-text-light, #f8fafc)',
      fontFamily: "'Inter', sans-serif",
      '@media (max-width: 768px)': {
        fontSize: '1.1rem'
      }
    },
    sidebarNav: {
      flex: 1,
      padding: '1rem 0',
      overflowY: 'auto',
      backgroundColor: 'var(--admin-sidebar-bg, #1e293b)',
      '&::-webkit-scrollbar': {
        width: '6px'
      },
      '&::-webkit-scrollbar-track': {
        background: 'rgba(255, 255, 255, 0.05)'
      },
      '&::-webkit-scrollbar-thumb': {
        background: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '3px'
      },
      '&::-webkit-scrollbar-thumb:hover': {
        background: 'rgba(255, 255, 255, 0.3)'
      }
    },
    navMenu: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    navItem: {
      margin: 0
    },
    navLink: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '1rem 1.5rem',
      color: 'rgba(255, 255, 255, 0.7)',
      textDecoration: 'none',
      fontSize: '0.875rem',
      fontWeight: 500,
      transition: 'all 0.2s ease',
      borderLeft: '3px solid transparent',
      fontFamily: "'Inter', sans-serif",
      backgroundColor: 'transparent',
      '@media (max-width: 768px)': {
        padding: '1rem 1.5rem'
      }
    },
    navLinkHover: {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      color: 'var(--admin-text-light, #f8fafc)',
      borderLeftColor: 'rgba(255, 255, 255, 0.2)'
    },
    navLinkActive: {
      backgroundColor: 'rgba(37, 99, 235, 0.1)',
      color: '#60a5fa',
      borderLeftColor: '#60a5fa',
      fontWeight: 600
    },
    navIcon: {
      fontSize: '1.1rem',
      flexShrink: 0,
      width: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    navLabel: {
      flex: 1,
      fontFamily: "'Inter', sans-serif"
    },
    navBadge: {
      backgroundColor: 'var(--admin-danger, #ef4444)',
      color: 'white',
      borderRadius: '10px',
      padding: '0.125rem 0.375rem',
      fontSize: '0.75rem',
      fontWeight: 600,
      minWidth: '18px',
      textAlign: 'center'
    },
    sidebarFooter: {
      padding: '1rem',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      marginTop: 'auto',
      backgroundColor: 'var(--admin-sidebar-bg, #1e293b)'
    },
    footerNavLink: {
      justifyContent: 'flex-start',
      color: 'rgba(255, 255, 255, 0.7) !important',
      padding: '0.75rem 1rem',
      borderRadius: '6px',
      borderLeft: 'none',
      marginBottom: '0.5rem',
      ':hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderLeft: 'none'
      }
    },
    logoutBtn: {
      justifyContent: 'flex-start',
      color: 'rgba(255, 255, 255, 0.7) !important',
      border: 'none',
      cursor: 'pointer',
      backgroundColor: 'transparent',
      width: '100%',
      textAlign: 'left',
      padding: '0.75rem 1rem',
      fontFamily: "'Inter', sans-serif",
      fontSize: '0.875rem',
      ':hover': {
        backgroundColor: 'rgba(239, 68, 68, 0.1) !important',
        color: 'var(--admin-danger, #ef4444) !important'
      }
    }
  };

  // Fonction pour combiner les styles
  const combineStyles = (...styleObjects) => Object.assign({}, ...styleObjects);

  return (
    <aside style={styles.sidebar}>
      <div style={styles.sidebarHeader}>
        <div style={styles.sidebarLogo}>
          <img 
            src="/assets/logo.png" 
            alt="MTPS Admin" 
            style={styles.logoImg}
          />
          <span style={styles.logoText}>MTPS Admin</span>
        </div>
      </div>
      
      <nav style={styles.sidebarNav}>
        <ul style={styles.navMenu}>
          {menuItems.map((item, index) => (
            <li key={index} style={styles.navItem}>
              <Link 
                to={item.path} 
                style={combineStyles(
                  styles.navLink,
                  isActive(item.path, item.exact) ? styles.navLinkActive : {},
                  {
                    ':hover': styles.navLinkHover
                  }
                )}
              >
                <span style={styles.navIcon}>{item.icon}</span>
                <span style={styles.navLabel}>{item.label}</span>
                {item.badge && (
                  <span style={styles.navBadge}>5</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div style={styles.sidebarFooter}>
        <Link 
          to="/" 
          style={combineStyles(styles.navLink, styles.footerNavLink)}
        >
          <span style={styles.navIcon}><FaHome /></span>
          <span style={styles.navLabel}>Retour au site</span>
        </Link>
        
        <button 
          onClick={handleLogout} 
          style={combineStyles(styles.navLink, styles.logoutBtn)}
        >
          <span style={styles.navIcon}><FaSignOutAlt /></span>
          <span style={styles.navLabel}>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;