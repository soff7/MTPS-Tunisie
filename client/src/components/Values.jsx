import React from 'react';
import { Link } from 'react-router-dom';
import { FaHandshake, FaLightbulb, FaLeaf, FaMedal, FaChartLine, FaArrowRight } from "react-icons/fa";
import '../styles/Values.css';

const Values = () => {
  const values = [
    {
      icon: <FaHandshake className="value-icon" />,
      title: 'Engagement client',
      description: 'Nous mettons nos clients au cœur de nos préoccupations et nous engageons à répondre à leurs besoins.',
      statNumber: "01",
      statLabel: "PRIORITÉ"
    },
    {
      icon: <FaLightbulb className="value-icon" />,
      title: 'Innovation',
      description: 'Nous investissons continuellement dans la recherche et le développement pour offrir des solutions innovantes.',
      statNumber: "15+",
      statLabel: "BREVETS"
    },
    {
      icon: <FaLeaf className="value-icon" />,
      title: 'Responsabilité environnementale',
      description: 'Nous nous engageons à réduire notre impact environnemental à chaque étape de notre processus.',
      statNumber: "30%",
      statLabel: "RÉDUCTION CO2"
    },
    {
      icon: <FaMedal className="value-icon" />,
      title: 'Excellence',
      description: 'Nous visons l\'excellence dans la qualité de nos produits et services.',
      statNumber: "ISO",
      statLabel: "CERTIFIÉ"
    },
    {
      icon: <FaChartLine className="value-icon" />,
      title: 'Croissance durable',
      description: 'Nous développons notre entreprise de manière responsable et pérenne.',
      statNumber: "20%",
      statLabel: "CROISSANCE"
    }
  ];

  return (
    <>
      <section className="values-section" id="values">
        {/* Effets visuels similaires au Hero et Services */}
        <div className="values-particles"></div>
        <div className="values-overlay"></div>
        <div className="values-shape-1"></div>
        <div className="values-shape-2"></div>
        
        {/* Hero Banner */}
        <div className="values-hero">
          <div className="container">
            <div className="values-intro">
              <span className="values-badge">
                <span className="badge-dot"></span>
                NOS VALEURS
              </span>
              <h1 className="values-title">Nos <span className="highlighted">Valeurs</span> Fondamentales</h1>
              <p className="values-subtitle">
                Les principes qui guident nos actions et nos décisions au quotidien pour offrir la meilleure qualité de service
              </p>
            </div>
          </div>
        </div>
        
        {/* Values Content */}
        <div className="values-content">
          <div className="container">
            <div className="values-grid">
              {values.map((value, index) => (
                <div className="value-card" key={index}>
                  <div className="value-icon-container">
                    <div className="value-icon-wrapper">
                      {value.icon}
                    </div>
                    <div className="value-stat">
                      <span className="stat-number">{value.statNumber}</span>
                      <span className="stat-label">{value.statLabel}</span>
                    </div>
                  </div>
                  <h3 className="value-title">{value.title}</h3>
                  <p className="value-description">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="values-cta">
          <div className="container">
            <h2>Découvrez comment nos valeurs se traduisent dans nos services</h2>
            <Link to="/services" className="cta-button">
              Voir nos services <FaArrowRight className="arrow-icon" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Séparateur animé pour la transition vers la section suivante */}
      <div className="section-divider"></div>
    </>
  );
};

export default Values;