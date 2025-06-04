import { useState, useEffect } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import '../styles/Map.css';

const Map = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );
    
    const mapSection = document.querySelector('.map-section');
    if (mapSection) {
      observer.observe(mapSection);
    }
    
    return () => {
      if (mapSection) {
        observer.unobserve(mapSection);
      }
    };
  }, []);

  return (
    <section className={`map-section ${isVisible ? 'visible' : ''}`}>
      {/* Cercle décoratif */}
      <div className="circle-decoration-map large"></div>
      
      <div className="map-container">
        <h2 className="section-title">Notre Localisation</h2>
        
        <div className="map-frame-container">
          <iframe
            title="MTPS Localisation"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3080.635126393559!2d10.3216003755916!3d35.67707697258849!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fde9ff22bad9b3%3A0x5f4447fa09b01303!2sMTPS!5e1!3m2!1sen!2stn!4v1749052051621!5m2!1sen!2stn"
            width="100%"
            height="500"
            className="map-frame"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Map;