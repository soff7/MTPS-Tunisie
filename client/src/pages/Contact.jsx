import { useEffect } from 'react';
import ContactHero from '../components/ContactHero';
import ContactForm from '../components/ContactForm';
import ContactInfo from '../components/ContactInfo';
import Map from '../components/Map';
import '../styles/Contact.css';

const Contact = () => {
  // Effet pour faire défiler la page vers le haut lors du chargement
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="contact-page">
      <ContactHero />
      
      <div className="contact-content">
        <div className="contact-form-section">
          <ContactForm />
        </div>
        
        <div className="contact-info-section">
          <ContactInfo />
        </div>
      </div>
      
      <Map />
    </div>
  );
};

export default Contact;