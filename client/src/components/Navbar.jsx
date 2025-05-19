// client/src/components/Navbar.jsx - Correction des erreurs de React Hooks
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaPowerOff, FaSignInAlt, FaTachometerAlt } from 'react-icons/fa';
import '../styles/Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Vérifier si l'utilisateur est connecté et a des droits d'administrateur
  const isAuthenticated = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');
  const isAdmin = userRole && ['admin', 'superadmin'].includes(userRole);
  
  // Vérifier si on est sur une page d'authentification
  const isAuthPage = location.pathname === '/signin' || location.pathname === '/signup';
  // Vérifier si on est sur une page d'administration
  const isAdminPage = location.pathname.startsWith('/admin');
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    
    // Initialiser l'état de défilement au chargement
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Fermer le menu mobile lors du changement de route
  useEffect(() => {
    setMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
  }, [location.pathname]);
  
  // Si nous sommes sur une page admin, ne pas afficher la navbar standard
  if (isAdminPage) {
    return null;
  }
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    document.body.style.overflow = mobileMenuOpen ? 'auto' : 'hidden';
  };
  
  // Vérifier si le lien est actif
  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };
  
  // Fonction pour gérer le clic sur le logo
  const handleLogoClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };
  
  // Fonction modifiée pour gérer la déconnexion
  const handleLogout = (e) => {
    e.preventDefault();
    
    // Déconnexion
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    
    // Rediriger vers la page d'accueil
    navigate('/');
  };

  return (
    <header>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${isAuthPage ? 'auth-page' : ''}`}>
        <div className="container navbar-container">
          <Link 
            to="/" 
            className="logo" 
            aria-label="MTPS - Accueil"
            onClick={handleLogoClick}
          >
            <img src="/assets/logo.png" alt="MTPS Logo" className="logo-img" />
            {!isAuthPage && (
              <div className="logo-text">
                <span className="logo-sub">Manufacture de Tubes Plastiques et Services</span>
              </div>
            )}
          </Link>
          
          {/* Afficher la navigation uniquement si on n'est pas sur une page d'auth */}
          {!isAuthPage && (
            <>
              <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
                <Link 
                  to="/" 
                  className={`nav-link ${isActive('/') ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Accueil
                </Link>
                <Link 
                  to="/produits" 
                  className={`nav-link ${isActive('/produits') ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Produits
                </Link>
                <Link 
                  to="/services" 
                  className={`nav-link ${isActive('/services') ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Services
                </Link>
                <Link 
                  to="/apropos" 
                  className={`nav-link ${isActive('/apropos') ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  À propos
                </Link>
                <Link 
                  to="/contact" 
                  className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                
                {/* Boutons d'authentification pour mobile UNIQUEMENT */}
                <div className="mobile-auth-buttons">
                  {isAuthenticated ? (
                    <>
                      {/* Bouton dashboard pour mobile (visible uniquement si admin) */}
                      {isAdmin && (
                        <Link 
                          to="/admin" 
                          className="mobile-dashboard-btn"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <FaTachometerAlt className="dashboard-icon" /> Dashboard
                        </Link>
                      )}
                      {/* Bouton déconnexion pour mobile */}
                      <button 
                        className="mobile-logout-btn"
                        onClick={(e) => {
                          handleLogout(e);
                          setMobileMenuOpen(false);
                        }}
                      >
                        <FaPowerOff className="logout-icon" /> Déconnexion
                      </button>
                    </>
                  ) : (
                    // Boutons connexion/inscription pour mobile (visibles uniquement quand non connecté)
                    <>
                      <Link 
                        to="/signin" 
                        className="mobile-login-btn"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <FaSignInAlt className="login-icon" /> Connexion
                      </Link>
                      <Link 
                        to="/signup" 
                        className="mobile-signup-btn"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Inscription
                      </Link>
                    </>
                  )}
                </div>
              </div>
              
              <button 
                className="mobile-menu-toggle" 
                onClick={toggleMobileMenu}
                aria-expanded={mobileMenuOpen}
                aria-controls="nav-links"
                aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              >
                <span className={`menu-icon ${mobileMenuOpen ? 'open' : ''}`}></span>
              </button>
              
              {/* Boutons pour desktop */}
              <div className="desktop-buttons">
                {isAuthenticated ? (
                  <>
                    {isAdmin && (
                      <Link 
                        to="/admin" 
                        className="btn-dashboard"
                      >
                        <FaTachometerAlt className="dashboard-icon" /> Dashboard
                      </Link>
                    )}
                    {/* Seul bouton de déconnexion - rouge avec icône */}
                    <button 
                      className="logout-button"
                      onClick={handleLogout}
                    >
                      <FaPowerOff className="logout-icon" /> Déconnexion
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/signin" 
                      className="btn-signin"
                    >
                      Connexion
                    </Link>
                    <Link 
                      to="/signup" 
                      className="cta-button"
                    >
                      Inscription
                    </Link>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </nav>
      
      {/* Overlay pour fermer le menu en cliquant à l'extérieur */}
      {mobileMenuOpen && !isAuthPage && (
        <div 
          className="menu-overlay" 
          onClick={() => {
            setMobileMenuOpen(false);
            document.body.style.overflow = 'auto';
          }}
          aria-hidden="true"
        />
      )}
    </header>
  );
};

export default Navbar;