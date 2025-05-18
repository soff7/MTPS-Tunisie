import { Link } from 'react-router-dom';
import '../styles/CallToAction.css';

const CallToAction = ({
  title = "Prêt à discuter de votre projet?",
  description = "Contactez notre équipe d'experts pour trouver la meilleure solution pour vos besoins en tubes plastiques.",
  buttonText = "Nous contacter",
  buttonLink = "/contact",
  variant = "primary"
}) => {
  return (
    <>
      <section className={`cta section-padding bg-${variant}`} id="cta">
        <div className="container">
          <div className="cta-content">
            <h2>{title}</h2>
            <p>{description}</p>
            <Link to={buttonLink} className={`btn btn-${variant === 'primary' ? 'light' : 'primary'}`}>
              {buttonText}
            </Link>
          </div>
        </div>
      </section>
      
      {/* Séparateur animé pour la transition vers la section suivante */}
      <div className="section-divider"></div>
    </>
  );
};

export default CallToAction;