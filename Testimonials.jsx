import React from 'react';
import '../styles/Testimonials.css';

const Testimonials = ({
  title = "Témoignages",
  testimonials = [
    {
      name: 'mon3em chatty',
      company: 'Industries ABC',
      text: 'MTPS nous fournit des tubes plastiques de qualité depuis 5 ans. Leur service est impeccable et leurs produits sont toujours fiables.',
      img: '/assets/team1.jpg'
    },
    {
      name: 'Marie Dupont',
      company: 'Société XYZ',
      text: 'Nous avons été impressionnés par le professionnalisme de MTPS et la qualité de leurs solutions sur mesure pour nos besoins spécifiques.',
      img: '/assets/team1.jpg'
    },
    {
      name: 'Mohamed Karray',
      company: 'Entreprise 123',
      text: 'Le support technique de MTPS nous a aidé à résoudre un problème complexe avec notre système de tuyauterie. Je les recommande vivement.',
      img: '/assets/team1.jpg'
    }
  ]
}) => {
  return (
    <>
      <section className="testimonials-section" id="testimonials">
        {/* Effets visuels similaires au Hero et Services */}
        <div className="testimonials-particles"></div>
        <div className="testimonials-overlay"></div>
        <div className="testimonials-shape-1"></div>
        <div className="testimonials-shape-2"></div>
        
        <div className="testimonials-container">
          <div className="testimonials-intro">
           
            <h2 className="testimonials-title">Nos <span className="highlight">Témoignages</span></h2>
            <p className="testimonials-subtitle">
              Découvrez ce que nos clients disent de nos services et de notre expertise
            </p>
          </div>
          
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div className="testimonial-card" key={index}>
                <div className="glow-effect"></div>
                <div className="testimonial-avatar">
                  <img src={testimonial.img} alt={testimonial.name} />
                </div>
                <div className="testimonial-text">
                  <p>"{testimonial.text}"</p>
                </div>
                <div className="testimonial-author">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Séparateur animé pour la transition vers la section suivante */}
      <div className="section-divider"></div>
    </>
  );
};

export default Testimonials;