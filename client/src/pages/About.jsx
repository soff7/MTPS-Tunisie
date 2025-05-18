import React from 'react';
import { FaHistory, FaUsers, FaLightbulb, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/About.css'; // Assurez-vous d'avoir ce fichier CSS pour le style

const About = () => {
  const values = [
    {
      icon: <FaLightbulb className="value-icon" />,
      title: 'Innovation',
      description: 'Nous repoussons les limites technologiques pour offrir des solutions plastiques avancées.'
    },
    {
      icon: <FaHistory className="value-icon" />,
      title: 'Expérience',
      description: '15 ans d\'expertise dans la fabrication de tubes plastiques industriels.'
    },
    {
      icon: <FaUsers className="value-icon" />,
      title: 'Collaboration',
      description: 'Nous travaillons en étroite relation avec nos clients pour des solutions sur mesure.'
    }
  ];

  const timeline = [
    { year: '2005', event: 'Fondation de MTPS avec une spécialisation en solutions plastiques industrielles' },
    { year: '2010', event: 'Expansion des capacités de production et certification ISO 9001' },
    { year: '2015', event: 'Lancement de notre gamme de produits éco-responsables' },
    { year: '2020', event: 'Ouverture de notre nouveau centre de R&D' },
    { year: 'Aujourd\'hui', event: 'Leader reconnu avec une présence internationale' }
  ];

  return (
    <section className="about-section">
      {/* Hero Section */}
      <div className="about-hero">
        <div className="container">
          <div className="about-intro">
            <span className="expertise-badge">NOTRE HISTOIRE</span>
            <h1 className="about-title">À propos de <span className="highlighted">MTPS</span></h1>
            <p className="about-subtitle">
              Spécialiste dans la fabrication de tubes plastiques industriels depuis plus de 15 ans
            </p>
            <div className="about-stats">
              <div className="stat-item">
                <span className="stat-number">15+</span>
                <span className="stat-label">Années d'expérience</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">200+</span>
                <span className="stat-label">Clients satisfaits</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Experts techniques</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* History Section */}
      <div className="about-history">
        <div className="container">
          <div className="section-header">
            <div className="section-icon">
              <FaHistory />
            </div>
            <h2 className="section-title">Notre <span className="highlighted">Parcours</span></h2>
          </div>
          <p className="section-description">
            Découvrez l'évolution de notre entreprise et notre engagement constant pour l'excellence.
          </p>
          <div className="timeline">
            {timeline.map((item, index) => (
              <div className="timeline-item" key={index}>
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h3>{item.year}</h3>
                  <p>{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="about-values">
        <div className="container">
          <div className="section-header">
            <div className="section-icon">
              <FaLightbulb />
            </div>
            <h2 className="section-title">Nos <span className="highlighted">Valeurs</span></h2>
          </div>
          <p className="section-description">
            Les principes fondamentaux qui guident chacune de nos actions et décisions.
          </p>
          <div className="values-grid">
            {values.map((value, index) => (
              <div className="value-card" key={index}>
                <div className="value-icon-container">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team CTA */}
      <div className="team-cta">
        <div className="container">
          <h2 className="cta-title">Rencontrez notre <span className="highlighted">équipe</span> d'experts</h2>
          <Link to="/team" className="cta-button">
            Découvrir l'équipe <FaArrowRight className="arrow-icon" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;