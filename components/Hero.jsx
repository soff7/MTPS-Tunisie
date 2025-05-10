import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaPhone, FaIndustry, FaTools, FaRecycle } from 'react-icons/fa';
import '../styles/Hero.css';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  // Effet de parallaxe au défilement
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    // Animation d'entrée du composant
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);
  
  // Statistiques avec animation de comptage
  const stats = [
    { number: '500', label: 'Clients satisfaits', icon: <FaIndustry /> },
    { number: '50', label: 'Produits innovants', icon: <FaTools /> },
    { number: '15', label: "Années d'expertise", icon: <FaRecycle /> }
  ];
  
  // Fonction pour gérer le défilement vers le bas
  const handleScrollDown = () => {
    const nextSection = document.querySelector('.section-divider')?.nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section className={`hero ${isVisible ? 'visible' : ''}`}>
        <div className="hero-particles"></div>
        <div 
          className="hero-overlay" 
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        ></div>
        
        <div className="container hero-container">
          <div className="hero-content">
            <span className="hero-badge">
              <span className="badge-dot"></span>
              Innovation & Qualité
            </span>
            
            <h1 className="hero-title">
              <span className="hero-title-line accent">Solutions plastiques</span>
              <span className="hero-title-line">pour l'industrie moderne</span>
            </h1>
            
            <p className="hero-text">
              MTPS combine expertise technique et innovation pour fournir des solutions
              plastiques sur mesure répondant aux exigences les plus strictes de l'industrie.
            </p>
            
            <div className="hero-btns">
              <Link to="/produits" className="btn btn-primary">
                EXPLORER NOS PRODUITS
                <FaArrowRight className="icon-arrow" />
              </Link>
              <Link to="/contact" className="btn btn-secondary">
                <FaPhone className="icon-phone" />
                CONTACT RAPIDE
              </Link>
            </div>
          </div>
          
          <div className="hero-shape-1"></div>
          <div className="hero-shape-2"></div>
          
          <div className="hero-stats">
            {stats.map((stat, index) => (
              <div className="stat-item" key={index}>
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-content">
                  <span className="stat-number">
                    {stat.number}<span className="stat-plus">+</span>
                  </span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="hero-scroll-indicator" onClick={handleScrollDown}>
            <div className="scroll-arrow"></div>
            <span>Découvrir</span>
          </div>
        </div>
      </section>
      <div className="section-divider"></div>
    </>
  );
};

export default Hero;