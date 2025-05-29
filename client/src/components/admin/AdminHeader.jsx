import React, { useState, useEffect } from 'react';
import { FaBell, FaUser, FaSearch, FaChevronDown, FaSignOutAlt } from 'react-icons/fa';

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

  // Styles
  const styles = {
    header: {
      position: 'fixed',
      top: 0,
      left: 'var(--sidebar-width, 250px)',
      right: 0,
      height: 'var(--header-height, 70px)',
      backgroundColor: 'var(--admin-card-bg, #ffffff)',
      borderBottom: '1px solid var(--admin-border, #e2e8f0)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 2rem',
      zIndex: 999,
      boxShadow: 'var(--admin-shadow-sm, 0 1px 2px 0 rgba(0, 0, 0, 0.05))'
    },
    headerLeft: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.25rem'
    },
    pageTitle: {
      fontSize: '1.5rem',
      fontWeight: 700,
      color: 'var(--admin-text-primary, #1a202c)',
      margin: 0
    },
    breadcrumb: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.875rem',
      color: 'var(--admin-text-secondary, #718096)'
    },
    separator: {
      color: 'var(--admin-border, #e2e8f0)'
    },
    headerCenter: {
      flex: 1,
      maxWidth: '400px',
      margin: '0 2rem',
      '@media (max-width: 768px)': {
        display: 'none'
      }
    },
    searchBox: {
      position: 'relative',
      width: '100%'
    },
    searchInput: {
      width: '100%',
      padding: '0.5rem 1rem 0.5rem 2.5rem',
      border: '1px solid var(--admin-border, #e2e8f0)',
      borderRadius: '8px',
      fontSize: '0.875rem',
      backgroundColor: 'var(--admin-bg, #f7fafc)',
      transition: 'all 0.2s ease'
    },
    searchInputFocus: {
      outline: 'none',
      borderColor: 'var(--admin-primary, #2563eb)',
      boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.1)'
    },
    searchIcon: {
      position: 'absolute',
      left: '0.75rem',
      top: '50%',
      transform: 'translateY(-50%)',
      color: 'var(--admin-text-secondary, #718096)',
      fontSize: '0.875rem'
    },
    headerRight: {
      display: 'flex',
      alignItems: 'center'
    },
    headerActions: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      '@media (max-width: 480px)': {
        gap: '0.5rem'
      }
    },
    notificationBtn: {
      position: 'relative',
      background: 'none',
      border: 'none',
      padding: '0.5rem',
      borderRadius: '8px',
      color: 'var(--admin-text-secondary, #718096)',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      ':hover': {
        backgroundColor: 'var(--admin-bg, #f7fafc)',
        color: 'var(--admin-text-primary, #1a202c)'
      }
    },
    notificationBadge: {
      position: 'absolute',
      top: '0.25rem',
      right: '0.25rem',
      backgroundColor: 'var(--admin-danger, #ef4444)',
      color: 'white',
      borderRadius: '50%',
      width: '18px',
      height: '18px',
      fontSize: '0.75rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 600
    },
    profileMenu: {
      position: 'relative'
    },
    profileBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      background: 'none',
      border: 'none',
      padding: '0.5rem',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      ':hover': {
        backgroundColor: 'var(--admin-bg, #f7fafc)'
      }
    },
    profileAvatar: {
      width: '32px',
      height: '32px',
      backgroundColor: 'var(--admin-primary, #2563eb)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '0.875rem'
    },
    profileInfo: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '0.125rem',
      '@media (max-width: 768px)': {
        display: 'none'
      }
    },
    profileName: {
      fontSize: '0.875rem',
      fontWeight: 600,
      color: 'var(--admin-text-primary, #1a202c)'
    },
    profileRole: {
      fontSize: '0.75rem',
      color: 'var(--admin-text-secondary, #718096)'
    },
    dropdownIcon: {
      fontSize: '0.75rem',
      color: 'var(--admin-text-secondary, #718096)',
      marginLeft: '0.5rem'
    },
    profileDropdown: {
      position: 'absolute',
      top: 'calc(100% + 0.5rem)',
      right: 0,
      backgroundColor: 'var(--admin-card-bg, #ffffff)',
      border: '1px solid var(--admin-border, #e2e8f0)',
      borderRadius: '8px',
      boxShadow: 'var(--admin-shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1))',
      minWidth: '200px',
      zIndex: 1000,
      animation: 'fadeInDown 0.2s ease'
    },
    dropdownHeader: {
      padding: '1rem',
      borderBottom: '1px solid var(--admin-border, #e2e8f0)'
    },
    userDetails: {
      strong: {
        display: 'block',
        color: 'var(--admin-text-primary, #1a202c)',
        fontSize: '0.875rem',
        marginBottom: '0.25rem'
      },
      small: {
        color: 'var(--admin-text-secondary, #718096)',
        fontSize: '0.75rem'
      }
    },
    dropdownDivider: {
      height: '1px',
      backgroundColor: 'var(--admin-border, #e2e8f0)',
      margin: 0
    },
    dropdownMenu: {
      listStyle: 'none',
      padding: '0.5rem 0',
      margin: 0
    },
    dropdownItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      width: '100%',
      padding: '0.75rem 1rem',
      border: 'none',
      background: 'none',
      color: 'var(--admin-text-primary, #1a202c)',
      fontSize: '0.875rem',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
      textAlign: 'left',
      ':hover': {
        backgroundColor: 'var(--admin-bg, #f7fafc)'
      },
      lastChild: {
        color: 'var(--admin-danger, #ef4444)',
        ':hover': {
          backgroundColor: 'rgba(239, 68, 68, 0.05)'
        }
      }
    },
    // Responsive styles
    responsive: {
      '@media (max-width: 1024px)': {
        header: {
          left: 0
        }
      },
      '@media (max-width: 768px)': {
        header: {
          padding: '0 1rem'
        },
        pageTitle: {
          fontSize: '1.25rem'
        }
      },
      '@media (max-width: 480px)': {
        breadcrumb: {
          display: 'none'
        }
      }
    }
  };

  // Fonction pour gérer les styles combinés
  const getStyle = (baseStyle, additionalStyles = {}) => ({
    ...baseStyle,
    ...additionalStyles
  });

  return (
    <header style={styles.header}>
      <div style={styles.headerLeft}>
        <h1 style={styles.pageTitle}>Dashboard</h1>
        <div style={styles.breadcrumb}>
          <span>Admin</span>
          <span style={styles.separator}>/</span>
          <span>Dashboard</span>
        </div>
      </div>
      
      <div style={styles.headerCenter}>
        <div style={styles.searchBox}>
          <FaSearch style={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Rechercher..." 
            style={styles.searchInput}
            onFocus={(e) => e.target.style = {...styles.searchInput, ...styles.searchInputFocus}}
            onBlur={(e) => e.target.style = styles.searchInput}
          />
        </div>
      </div>
      
      <div style={styles.headerRight}>
        <div style={styles.headerActions}>
          <button style={styles.notificationBtn}>
            <FaBell />
            {notifications > 0 && (
              <span style={styles.notificationBadge}>{notifications}</span>
            )}
          </button>
          
          <div style={styles.profileMenu}>
            <button 
              style={getStyle(styles.profileBtn, isHovered ? { backgroundColor: 'var(--admin-bg, #f7fafc)' } : {})}
              onClick={toggleProfileMenu}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div style={styles.profileAvatar}>
                <FaUser />
              </div>
              <div style={styles.profileInfo}>
                <span style={styles.profileName}>
                  {user?.name || 'Administrateur'}
                </span>
                <span style={styles.profileRole}>
                  {user?.role === 'superadmin' ? 'Super Admin' : 'Admin'}
                </span>
              </div>
              <FaChevronDown style={styles.dropdownIcon} />
            </button>
            
            {showProfileMenu && (
              <div style={styles.profileDropdown}>
                <div style={styles.dropdownHeader}>
                  <div style={styles.userDetails}>
                    <strong>{user?.name}</strong>
                    <small>{user?.email}</small>
                  </div>
                </div>
                <div style={styles.dropdownDivider}></div>
                <ul style={styles.dropdownMenu}>
                  <li>
                    <button style={styles.dropdownItem}>
                      <FaUser /> Mon Profil
                    </button>
                  </li>
                  <li>
                    <button 
                      style={getStyle(styles.dropdownItem, styles.dropdownItem.lastChild)}
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

export default AdminHeader;