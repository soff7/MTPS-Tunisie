import { FaCheckCircle, FaLeaf, FaShieldAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/Features.css';

const Features = () => {
  const features = [
    {
      icon: <FaCheckCircle className="feature-icon" />,
      title: 'Qualité garantie',
      description: 'Nos produits répondent aux normes de qualité les plus strictes pour assurer une performance optimale.',
      stat: '100%',
      highlight: 'satisfaction',
    },
    {
      icon: <FaLeaf className="feature-icon" />,
      title: 'Éco-responsable',
      description: 'Matériaux recyclables et processus de fabrication respectueux de l\'environnement pour un avenir durable.',
      stat: '80%',
      highlight: 'recyclable',
    },
    {
      icon: <FaShieldAlt className="feature-icon" />,
      title: 'Durabilité',
      description: 'Tubes résistants conçus pour durer dans les conditions industrielles les plus exigeantes.',
      stat: '10+',
      highlight: 'ans de garantie',
    }
  ];
  
  return (
    <>
      <section className="features-section" id="features">
        {/* Effets visuels similaires au Hero et Services */}
        <div className="features-particles"></div>
        <div className="features-overlay"></div>
        <div className="features-shape-1"></div>
        <div className="features-shape-2"></div>
        
        <div className="features-container">
          <div className="features-intro">
           
            <h2 className="features-title">Pourquoi choisir <span className="highlight">MTPS</span>?</h2>
            <p className="features-subtitle">
              Découvrez les caractéristiques qui distinguent nos solutions de tubes plastiques industriels
            </p>
          </div>
          
          <div className="features-cards">
            {features.map((feature, index) => (
              <div className="feature-item" key={index}>
                <div className="feature-top">
                  <div className="feature-icon-wrapper">{feature.icon}</div>
                  <div className="feature-stats">
                    <span className="stat-number">{feature.stat}</span>
                    <span className="stat-label">{feature.highlight}</span>
                  </div>
                </div>
                <h3 className="feature-name">{feature.title}</h3>
                <p className="feature-details">{feature.description}</p>
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

export default Features;