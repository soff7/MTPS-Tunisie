import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Vérifier si l'utilisateur est connecté et a des droits d'administrateur
  const isAuthenticated = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');
  const isAdmin = userRole && ['admin', 'superadmin', 'manager'].includes(userRole);
  
  // Vérifier si on est sur une page d'authentification
  const isAuthPage = location.pathname === '/signin' || location.pathname === '/signup' || location.pathname === '/auth-callback';
  
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
  
  // Fonction modifiée pour gérer la connexion/déconnexion
  const handleAuthAction = (e) => {
    e.preventDefault();
    
    if (isAuthenticated) {
      // Déconnexion
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      localStorage.removeItem('user');
      
      // Rediriger vers la page d'accueil
      navigate('/');
    } else {
      // Rediriger vers la page de connexion
      navigate('/signin');
    }
  };
  
  // Fonction pour naviguer vers le dashboard
  const handleDashboardClick = (e) => {
    e.preventDefault();
    if (isAdmin) {
      window.location.href = 'http://localhost:8080/dashboard';
    }
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
            <img src="/assets/logo.png" alt="" className="logo-img" />
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
                
                {/* Boutons conditionnels pour mobile */}
                {isAuthenticated && (
                  <>
                    {isAdmin && (
                      <button 
                        className="nav-link mobile-nav-btn"
                        onClick={handleDashboardClick}
                      >
                        Dashboard
                      </button>
                    )}
                    <button 
                      className="nav-link mobile-nav-btn"
                      onClick={handleAuthAction}
                    >
                      Déconnexion
                    </button>
                  </>
                )}
                
                {!isAuthenticated && (
                  <>
                    <Link 
                      to="/signup" 
                      className="cta-button mobile-cta"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Inscription
                    </Link>
                  </>
                )}
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
                      <button 
                        className="btn-dashboard"
                        onClick={handleDashboardClick}
                      >
                        Dashboard
                      </button>
                    )}
                    <button 
                      className="cta-button"
                      onClick={handleAuthAction}
                    >
                      Déconnexion
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