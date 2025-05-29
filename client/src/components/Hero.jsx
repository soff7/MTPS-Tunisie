// client/src/components/Hero.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaPhone, FaChevronDown } from 'react-icons/fa';
import TranslatedText from './TranslatedText';
import { translationService } from '../utils/translations';
import '../styles/Hero.css';

const slides = [
  {
    id: 1,
    image: 'url(/assets/bg1.png)',
    titleKey: 'hero.title.main',
    descriptionKey: 'hero.description.main',
    showButton: true,
    buttonTextKey: 'hero.btn.readmore',
    buttonLink: '/apropos',
    showSecondaryButton: true,
    secondaryButtonTextKey: 'hero.btn.contact',
    secondaryButtonLink: '/contact'
  },
  {
    id: 2,
    image: 'url(/assets/bg3.png)',
    titleKey: 'hero.title.secondary',
    descriptionKey: 'hero.description.secondary',
    showButton: true,
    buttonTextKey: 'hero.btn.products',
    buttonLink: '/produits',
  },
];

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState(translationService.getCurrentLanguage());
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const timer = setTimeout(() => setIsVisible(true), 100);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);
  
  useEffect(() => {
    const handleLanguageChange = (newLanguage) => setCurrentLanguage(newLanguage);
    translationService.addListener(handleLanguageChange);
    return () => translationService.removeListener(handleLanguageChange);
  }, []);
  
  const handleScrollDown = () => {
    const nextSection = document.querySelector('.section-divider')?.nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const goToSlide = (index) => setCurrentSlide(index);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const currentSlideData = slides[currentSlide];

  return (
    <>
      <section className={`hero ${isVisible ? 'visible' : ''}`}>
        <div className="hero-slides">
          {slides.map((slide, index) => (
            <div 
              key={slide.id}
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: slide.image }}
              aria-hidden={index !== currentSlide}
            >
              <div className="slide-overlay"></div>
            </div>
          ))}
        </div>
        
        <div className="hero-navigation">
          <button className="nav-btn prev-btn" onClick={prevSlide} aria-label="Slide précédent">
            ‹
          </button>
          <button className="nav-btn next-btn" onClick={nextSlide} aria-label="Slide suivant">
            ›
          </button>
        </div>
        
        <div className="hero-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Aller au slide ${index + 1}`}
              aria-current={index === currentSlide}
            />
          ))}
        </div>
        
        <div className="hero-particles"></div>
        <div className="hero-overlay" style={{ transform: `translateY(${scrollY * 0.1}px)` }}></div>
        
        <div className="container hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              <TranslatedText tKey={currentSlideData.titleKey} />
            </h1>
            
            <p className="hero-description">
              <TranslatedText tKey={currentSlideData.descriptionKey} />
            </p>
            
            <div className="hero-btns">
              {currentSlideData.showButton && (
                <Link 
                  to={currentSlideData.buttonLink} 
                  className="btn btn-primary"
                  aria-label={`${translationService.t(currentSlideData.buttonTextKey)} - ${translationService.t(currentSlideData.titleKey)}`}
                >
                  <TranslatedText tKey={currentSlideData.buttonTextKey} />
                  <FaArrowRight className="icon-arrow" />
                </Link>
              )}
              
              {currentSlideData.showSecondaryButton && (
                <Link 
                  to={currentSlideData.secondaryButtonLink} 
                  className="btn btn-secondary"
                  aria-label={translationService.t(currentSlideData.secondaryButtonTextKey)}
                >
                  <FaPhone className="icon-phone" />
                  <TranslatedText tKey={currentSlideData.secondaryButtonTextKey} />
                </Link>
              )}
            </div>
          </div>
          
          <button 
            className="hero-scroll-indicator" 
            onClick={handleScrollDown}
            aria-label="Défiler vers le bas"
          >
            <span className="scroll-text">
              <TranslatedText tKey="hero.scroll" />
            </span>
            <FaChevronDown className="scroll-arrow" />
          </button>
        </div>
      </section>
      <div className="section-divider"></div>
    </>
  );
};

export default Hero;