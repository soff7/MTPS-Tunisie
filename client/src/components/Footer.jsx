import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaMapMarkerAlt, FaPhone, FaEnvelope, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Fonction pour remonter en haut de page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Liens de navigation principaux
  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Produits', path: '/produits' },
    { name: 'Services', path: '/services' },
    { name: 'À propos', path: '/apropos' }, // URL sans accent
    { name: 'Contact', path: '/contact' }
  ];

  // Liens légaux pour le bas du footer
  const legalLinks = [
    { name: 'Confidentialité', path: '/privacy' },
    { name: 'Conditions', path: '/terms' },
    { name: 'Cookies', path: '/cookies' }
  ];

  // Liens des réseaux sociaux avec URLs
  const socialMediaLinks = [
    { icon: <FaFacebookF />, label: 'Facebook', url: 'VOTRE_LIEN_FACEBOOK' }, // REMPLACEZ PAR VOTRE VRAI LIEN
    { icon: <FaLinkedinIn />, label: 'LinkedIn', url: 'VOTRE_LIEN_LINKEDIN' }, // REMPLACEZ PAR VOTRE VRAI LIEN
    { icon: <FaTwitter />, label: 'Twitter', url: 'VOTRE_LIEN_TWITTER' }      // REMPLACEZ PAR VOTRE VRAI LIEN
  ];

  // Liste des services pour la section Services
  const serviceItems = [
    'Fabrication sur mesure',
    'Conseil technique',
    'Contrôle qualité',
    'Livraison express',
    'Support 24/7'
  ];

  return (
    <>
      {/* Séparateur animé avant le footer */}
      <div className="section-divider"></div>
      
      <footer className="footer" id="footer">
        

        {/* Section Principale du Footer */}
        <div className="footer-main">
          <div className="container">
            <div className="footer-grid">

              {/* Colonne "À propos" */}
              <div className="footer-col footer-about">
                <div className="footer-logo">
                  <img src="/assets/logo.png" alt="MTPS Logo" />
                </div>
                <p>
                  Leader dans la fabrication de tubes plastiques industriels avec plus de 15 ans d'expérience.
                </p>
                <div className="social-links">
                  {socialMediaLinks.map((social, index) => (
                    <a
                      href={social.url}
                      key={index}
                      aria-label={social.label}
                      className="social-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Colonne Navigation */}
              <div className="footer-col">
                <h4>Navigation</h4>
                <ul className="footer-links">
                  {navLinks.map((link, index) => (
                    <li key={index}>
                      <Link
                        to={link.path}
                        className="footer-link"
                        onClick={scrollToTop}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Colonne Services */}
              <div className="footer-col">
                <h4>Services</h4>
                <ul className="footer-links">
                  {serviceItems.map((service, index) => (
                    <li key={index}>
                      <Link
                        to={`/services#${service.toLowerCase().replace(/ /g, '-')}`}
                        className="footer-link"
                        onClick={scrollToTop}
                      >
                        {service}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Colonne Contact */}
              <div className="footer-col">
                <h4>Contact</h4>
                <ul className="footer-contact">
                  <li>
                    <FaMapMarkerAlt className="icon" />
                    <span>Zone Industrielle, Tunisie</span>
                  </li>
                  <li>
                    <FaPhone className="icon" />
                    <a href="tel:+21670000000" className="footer-link contact-link">+216 70 000 000</a>
                  </li>
                  <li>
                    <FaEnvelope className="icon" />
                    <a href="mailto:contact@mtps.tn" className="footer-link contact-link">contact@mtps.tn</a>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>

        {/* Section Inférieure du Footer */}
        <div className="footer-bottom">
          <div className="container">
            <div className="footer-bottom-content">
              <p>&copy; {currentYear} MTPS. Tous droits réservés.</p>
              <div className="legal-links">
                {legalLinks.map((link, index) => (
                  <Link
                    to={link.path}
                    key={index}
                    onClick={scrollToTop}
                    className="footer-link"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;