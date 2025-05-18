import '../styles/ContactHero.css';

const ContactHero = () => {
  return (
    <section className="contact-hero">
      {/* Cercles décoratifs */}
      <div className="circle-decoration large"></div>
      <div className="circle-decoration medium"></div>
      
      <div className="contact-hero-container">
        <div className="expertise-badge">Contact</div>
        <h1 className="contact-hero-title">
          Contactez-<span className="highlighted">nous</span>
        </h1>
        <p className="contact-hero-description">
          Notre équipe est à votre disposition pour répondre à toutes vos questions
        </p>
      </div>
    </section>
  );
};

export default ContactHero;