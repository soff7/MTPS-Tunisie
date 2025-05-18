import { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import '../styles/ContactInfo.css';

const ContactInfo = () => {
  const [activeItem, setActiveItem] = useState(null);
  
  const handleMouseEnter = (index) => {
    setActiveItem(index);
  };
  
  const handleMouseLeave = () => {
    setActiveItem(null);
  };
  
  const contactDetails = [
    {
      icon: <FaMapMarkerAlt />,
      title: "Adresse",
      details: ["Zone Industrielle", "Rue de l'Industrie, Tunisie"]
    },
    {
      icon: <FaPhone />,
      title: "Téléphone",
      details: ["+216 70 000 000", "+216 71 000 000"]
    },
    {
      icon: <FaEnvelope />,
      title: "Email",
      details: ["contact@mtps.tn", "commercial@mtps.tn"]
    },
    {
      icon: <FaClock />,
      title: "Heures d'ouverture",
      details: ["Lundi - Vendredi: 8h00 - 17h00", "Samedi: 8h00 - 13h00"]
    }
  ];

  return (
    <div className="contact-info">
      <h2>Nos Coordonnées</h2>
      
      {contactDetails.map((item, index) => (
        <div 
          className={`info-item ${activeItem === index ? 'active' : ''}`}
          key={index}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="info-icon">
            {item.icon}
          </div>
          <div className="info-content">
            <h3>{item.title}</h3>
            {item.details.map((detail, idx) => (
              <p key={idx}>{detail}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactInfo;