import React from 'react';
import { FaHistory, FaUsers, FaLightbulb } from 'react-icons/fa';
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
      description: '35+ ans d\'expertise dans la fabrication de tubes plastiques industriels.'
    },
    {
      icon: <FaUsers className="value-icon" />,
      title: 'Collaboration',
      description: 'Nous travaillons en étroite relation avec nos clients pour des solutions sur mesure.'
    }
  ];

  const timeline = [
    { year: '1990', event: 'Fondation de MTPS avec une spécialisation en solutions plastiques industrielles' },
    { year: '2000', event: 'Expansion des capacités de production et certification ISO 9001' },
    { year: '2010', event: 'Lancement de notre gamme de produits éco-responsables' },
    { year: '2020', event: 'Ouverture de notre nouveau centre de R&D' },
    { year: 'Aujourd\'hui', event: 'Leader reconnu avec une présence internationale' }
  ];

  return (
    <div className="about-container">
      {/* Hero Section avec background image */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-badge">Fabricant Tunisien</div>
          <h1 className="hero-title">MTPS TUNISIE</h1>
          <p className="hero-subtitle">
            Leader tunisien dans la fabrication de tubes PVC et PEHD pour les secteurs 
            du BTP, de l'assainissement et des réseaux techniques depuis 1990.
          </p>
          
          {/* Statistiques */}
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-number">35+</div>
              <div className="stat-label">ANNÉES D'EXPÉRIENCE</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">400</div>
              <div className="stat-label">DIAMÈTRE MAX (MM)</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">50+</div>
              <div className="stat-label">CLIENTS SATISFAITS</div>
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="history-section">
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
      </section>

      {/* Values Section */}
      <section className="values-section">
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
      </section>
    </div>
  );
};

export default About;