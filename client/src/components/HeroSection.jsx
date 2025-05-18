import { useRef, useEffect } from 'react';
import '../styles/HeroSection.css';

const HeroSection = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const elements = heroRef.current.querySelectorAll('[data-animate]');
    elements.forEach((el, i) => {
      el.style.animationDelay = `${i * 0.1}s`;
      el.classList.add('animate-in');
    });
  }, []);

  return (
    <section ref={heroRef} className="hero-section">
      <div className="hero-content">
        <h1 data-animate className="hero-title">
          <span>Innovation</span> dans les <span>tubes plastiques</span>
        </h1>
        <p data-animate className="hero-subtitle">
          Solutions industrielles sur mesure pour vos besoins spécifiques
        </p>
        <div data-animate className="hero-buttons">
          <button className="primary-button">Découvrir nos produits</button>
          <button className="secondary-button">Contactez-nous</button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;