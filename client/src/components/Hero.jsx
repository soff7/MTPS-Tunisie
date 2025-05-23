import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaPhone, FaIndustry, FaTools, FaRecycle } from 'react-icons/fa';
import '../styles/Hero.css';

// Tableau des slides avec leurs données complètes
const slides = [
  {
    id: 1,
    image: 'url(/assets/bg1.png)',
    title: "Solutions plastiques pour l'industrie moderne",
    description: "MTPS combine expertise technique et innovation pour fournir des solutions plastiques sur mesure répondant aux exigences les plus strictes de l'industrie.",
    showButton: true,
    buttonText: "Read More",
    buttonLink: "/apropos", // Lien vers la page À propos
    showSecondaryButton: true,
    secondaryButtonText: "CONTACT US",
    secondaryButtonLink: "/contact"
  },
  {
    id: 2,
    image: 'url(/assets/bg3.png)',
    title: "MTPS Tubes",
    description: "Où la force rencontre la flexibilité pour vos besoins en plastique.",
    showButton: true,
    buttonText: "Nos Produits",
    buttonLink: "/produits", // Lien vers la page Produits
  
  },
];

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Effet pour le carrousel automatique (6 secondes)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);
  
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
  
  // Fonction pour gérer le défilement vers le bas
  const handleScrollDown = () => {
    const nextSection = document.querySelector('.section-divider')?.nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Fonction pour naviguer manuellement entre les slides
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Fonction pour le slide suivant
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // Fonction pour le slide précédent
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <>
      <section className={`hero ${isVisible ? 'visible' : ''}`}>
        {/* Background slides */}
        <div className="hero-slides">
          {slides.map((slide, index) => (
            <div 
              key={slide.id}
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: slide.image }}
            >
              <div className="slide-overlay"></div>
            </div>
          ))}
        </div>
        
        {/* Contrôles de navigation du carrousel */}
        <div className="hero-navigation">
          <button 
            className="nav-btn prev-btn" 
            onClick={prevSlide}
            aria-label="Slide précédent"
          >
            ‹
          </button>
          <button 
            className="nav-btn next-btn" 
            onClick={nextSlide}
            aria-label="Slide suivant"
          >
            ›
          </button>
        </div>
        
        {/* Indicateurs de slide */}
        <div className="hero-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Aller au slide ${index + 1}`}
            />
          ))}
        </div>
        
        <div className="hero-particles"></div>
        <div 
          className="hero-overlay" 
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        ></div>
        
        <div className="container hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              {slides[currentSlide].title}
            </h1>
            
            <p className="hero-description">
              {slides[currentSlide].description}
            </p>
            
            <div className="hero-btns">
              {/* Bouton principal avec lien dynamique */}
              {slides[currentSlide].showButton && (
                <Link 
                  to={slides[currentSlide].buttonLink} 
                  className="btn btn-primary"
                  aria-label={`${slides[currentSlide].buttonText} - ${slides[currentSlide].title}`}
                >
                  {slides[currentSlide].buttonText}
                  <FaArrowRight className="icon-arrow" />
                </Link>
              )}
              
              {/* Bouton secondaire avec lien dynamique */}
              {slides[currentSlide].showSecondaryButton && (
                <Link 
                  to={slides[currentSlide].secondaryButtonLink} 
                  className="btn btn-secondary"
                  aria-label={slides[currentSlide].secondaryButtonText}
                >
                  <FaPhone className="icon-phone" />
                  {slides[currentSlide].secondaryButtonText}
                </Link>
              )}
            </div>
          </div>
          
          {/* Indicateur de défilement */}
          <div 
            className="hero-scroll-indicator" 
            onClick={handleScrollDown}
            role="button"
            tabIndex={0}
            aria-label="Défiler vers le bas"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleScrollDown();
              }
            }}
          >
            <div className="scroll-arrow"></div>
            <span>Scroll down</span>
          </div>
        </div>
      </section>
      <div className="section-divider"></div>
    </>
  );
};

export default Hero;