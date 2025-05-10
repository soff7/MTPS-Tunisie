import { FaIndustry, FaTools, FaUserCog, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/Services.css';

const Services = () => {
  const services = [
    {
      icon: <FaIndustry className="service-icon" />,
      title: 'Fabrication industrielle',
      description: 'Production de tubes plastiques de haute qualité pour diverses applications industrielles.',
      year: '15+',
      highlight: 'ans d\'expérience',
      link: '/apropos'
    },
    {
      icon: <FaTools className="service-icon" />,
      title: 'Solutions sur mesure',
      description: 'Conception et fabrication de tubes plastiques selon vos spécifications techniques.',
      year: '200+',
      highlight: 'projets réalisés',
      link: '/produits'
    },
    {
      icon: <FaUserCog className="service-icon" />,
      title: 'Support technique',
      description: 'Expertise et conseils techniques pour choisir les meilleures solutions pour vos besoins.',
      year: '24/7',
      highlight: 'assistance',
      link: '/contact'
    }
  ];
  
  return (
    <>
      <section className="services-section" id="services">
        <div className="services-particles"></div>
        <div className="services-overlay"></div>
        <div className="services-shape-1"></div>
        <div className="services-shape-2"></div>
        
        <div className="services-container">
          <div className="services-intro">
            <span className="expertise-badge">
              <span className="badge-dot"></span>
              EXPERTISE
            </span>
            <h2 className="services-title">Nos <span className="highlighted">Services</span></h2>
            <p className="services-description">
              MTPS propose une gamme complète de services pour répondre à vos besoins en tubes plastiques industriels
            </p>
          </div>
          
          <div className="services-cards">
            {services.map((service, index) => (
              <div className="service-item" key={index}>
                <div className="service-top">
                  <div className="service-icon-wrapper">{service.icon}</div>
                  <div className="service-stats">
                    <span className="stat-number">{service.year}</span>
                    <span className="stat-label">{service.highlight}</span>
                  </div>
                </div>
                <h3 className="service-name">{service.title}</h3>
                <p className="service-details">{service.description}</p>
                <Link to={service.link} className="service-cta">
                  Découvrir <FaArrowRight className="cta-arrow" />
                </Link>
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

export default Services;