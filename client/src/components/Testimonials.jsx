import React from 'react';

const Customers = ({
  title = "Ils nous ont fait confiance",
  subtitle = "Notre activité ne se base pas sur une simple relation commerciale ; nous prenons soin de satisfaire nos clients et de créer une relation de confiance pour travailler avec chacun d'eux sur le long terme.",
  clients = [
    {
      name: 'Agence immobilière pour le logement',
      logo: '../assets/afh-logo.png',
      alt: 'CPG Logo'
    },
    {
      name: 'Office National de l\'Assainissement',
      logo: '../assets/logo-ONAS.png',
      alt: 'ONAS Logo'
    },
    {
      name: 'EGMS GLOULOU',
      logo: '../assets/egms.png',
      alt: 'egms Logo'
    },
    {
      name: 'SO.TEL SUD',
      logo: '../assets/SOTELSUD.png',
      alt: 'SO.TEL SUD Logo'
    },
    {
      name: 'STPC',
      logo: '../assets/stpc.png',
      alt: 'STPC Logo'
    },
    {
      name: 'CRDA',
      logo: '../assets/C.R.D.A-logo.jpg',
      alt: 'CRDA Logo'
    },

  ]
}) => {
  return (
    <>
      <section className="customers-section" id="customers" style={styles.section}>
        {/* Effets visuels d'arrière-plan */}
        <div style={styles.particles}></div>
        <div style={styles.overlay}></div>
        <div style={styles.shape1}></div>
        <div style={styles.shape2}></div>
        
        <div style={styles.container}>
          <div style={styles.content}>
            {/* Côté gauche - Texte */}
            <div style={styles.textSection}>
              <div style={styles.badge}>
                <div style={styles.badgeDot}></div>
                CLIENTS
              </div>
              
              <h2 style={styles.title}>
                {title}
              </h2>
              
              <p style={styles.subtitle}>
                {subtitle}
              </p>
            </div>
            
            {/* Côté droit - Logos des clients */}
            <div style={styles.logosSection}>
              <div style={styles.logosGrid}>
                {clients.map((client, index) => (
                  <div 
                    key={index} 
                    style={{
                      ...styles.logoCard,
                      animationDelay: `${index * 0.1}s`
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
                      e.currentTarget.style.borderColor = 'rgba(107, 201, 255, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.1)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                    }}
                  >
                    <div style={styles.logoContainer}>
                      {/* Tentative de chargement de l'image, sinon placeholder */}
                      <img 
                        src={client.logo} 
                        alt={client.alt}
                        style={styles.logoImage}
                        onError={(e) => {
                          // Si l'image ne charge pas, on affiche le placeholder
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                        onLoad={(e) => {
                          // Si l'image charge, on cache le placeholder
                          e.target.nextSibling.style.display = 'none';
                        }}
                      />
                      <div style={{...styles.logoPlaceholder, display: 'flex'}}>
                        {client.name.split(' ').map(word => word[0]).join('').slice(0, 3)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Séparateur animé */}
      <div style={styles.sectionDivider}>
        <div style={styles.shimmerEffect}></div>
      </div>
    </>
  );
};

const styles = {
  section: {
    position: 'relative',
    padding: '6rem 0',
    backgroundColor: '#191919',
    overflow: 'hidden',
    color: '#ffffff',
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center'
  },
  
  particles: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `
      radial-gradient(circle at 20% 30%, #6bc9ff 0.1px, transparent 1px),
      radial-gradient(circle at 80% 20%, #47eaff 0.1px, transparent 1px),
      radial-gradient(circle at 40% 70%, #6bc9ff 0.1px, transparent 1px),
      radial-gradient(circle at 60% 50%, #47eaff 0.1px, transparent 1px)
    `,
    backgroundSize: '180px 180px',
    zIndex: 0,
    opacity: 0.3,
    animation: 'float 15s infinite ease-in-out'
  },
  
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: `
      radial-gradient(circle at 75% 30%, rgba(107, 201, 255, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 25% 70%, rgba(71, 234, 255, 0.1) 0%, transparent 40%),
      linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, #191919 100%)
    `,
    zIndex: 0
  },
  
  shape1: {
    position: 'absolute',
    top: '-10%',
    right: '-5%',
    width: '40%',
    height: '40%',
    background: 'radial-gradient(circle, #6bc9ff 0%, transparent 70%)',
    opacity: 0.06,
    filter: 'blur(80px)',
    animation: 'pulse 8s infinite ease-in-out',
    zIndex: 0
  },
  
  shape2: {
    position: 'absolute',
    bottom: '-20%',
    left: 0,
    width: '50%',
    height: '50%',
    background: 'radial-gradient(ellipse, #47eaff 0%, transparent 70%)',
    opacity: 0.05,
    filter: 'blur(100px)',
    animation: 'pulse 12s infinite ease-in-out',
    animationDelay: '3s',
    zIndex: 0
  },
  
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1.5rem',
    width: '100%',
    position: 'relative',
    zIndex: 1
  },
  
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.2fr',
    gap: '4rem',
    alignItems: 'center',
    '@media (max-width: 992px)': {
      gridTemplateColumns: '1fr',
      gap: '3rem'
    }
  },
  
  textSection: {
    animation: 'fadeInUp 0.8s ease forwards'
  },
  
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: 'transparent',
    color: '#6bc9ff',
    fontWeight: 600,
    fontSize: '0.875rem',
    padding: '0.5rem 1.25rem',
    borderRadius: '2rem',
    marginBottom: '1.5rem',
    border: '1px solid #6bc9ff',
    transition: 'all 0.3s ease',
    letterSpacing: '1px'
  },
  
  badgeDot: {
    display: 'inline-block',
    width: '8px',
    height: '8px',
    backgroundColor: '#6bc9ff',
    borderRadius: '50%',
    marginRight: '0.5rem',
    position: 'relative'
  },
  
  title: {
    fontSize: '3rem',
    lineHeight: 1.2,
    fontWeight: 700,
    marginBottom: '1.5rem',
    color: '#ffffff',
    '@media (max-width: 768px)': {
      fontSize: '2.5rem'
    }
  },
  
  subtitle: {
    fontSize: '1.125rem',
    lineHeight: 1.6,
    color: '#9a9a9a',
    maxWidth: '500px',
    '@media (max-width: 768px)': {
      fontSize: '1rem'
    }
  },
  
  logosSection: {
    animation: 'fadeInUp 0.8s ease forwards',
    animationDelay: '0.2s',
    opacity: 0
  },
  
  logosGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: '1.5rem',
    '@media (max-width: 576px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '1rem'
    }
  },
  
  logoCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: '12px',
    padding: '2rem 1.5rem',
    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    animation: 'fadeInUp 0.6s ease forwards',
    opacity: 0,
    minHeight: '120px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  
  logoImage: {
    maxWidth: '180px',
    maxHeight: '160px',
    width: 'auto',
    height: 'auto',
    objectFit: 'contain',
    filter: 'brightness(0.9)',
    transition: 'all 0.3s ease'
  },
  
  logoPlaceholder: {
    width: '80px',
    height: '60px',
    background: 'linear-gradient(135deg, #6bc9ff, #47eaff)',
    borderRadius: '8px',
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: '1rem',
    boxShadow: '0 4px 15px rgba(107, 201, 255, 0.3)',
    transition: 'all 0.3s ease'
  },
  
  sectionDivider: {
    height: '3px',
    backgroundColor: '#121212',
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    zIndex: 5
  },
  
  shimmerEffect: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '3px',
    background: 'linear-gradient(90deg, transparent, #6bc9ff, transparent)',
    opacity: 0.6,
    animation: 'shimmer 3s infinite linear',
    backgroundSize: '200% 100%'
  }
};

// Ajout des animations CSS via une balise style
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 0.6; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.05); }
  }
  
  @keyframes shimmer {
    0% { background-position: -100% 0; }
    100% { background-position: 200% 0; }
  }
  
  .customers-section .logosSection {
    animation: fadeInUp 0.8s ease forwards;
    animation-delay: 0.2s;
    opacity: 0;
  }
  
  .customers-section .logoCard:nth-child(1) { animation-delay: 0.1s; }
  .customers-section .logoCard:nth-child(2) { animation-delay: 0.2s; }
  .customers-section .logoCard:nth-child(3) { animation-delay: 0.3s; }
  .customers-section .logoCard:nth-child(4) { animation-delay: 0.4s; }
  .customers-section .logoCard:nth-child(5) { animation-delay: 0.5s; }
  .customers-section .logoCard:nth-child(6) { animation-delay: 0.6s; }
  .customers-section .logoCard:nth-child(7) { animation-delay: 0.7s; }
  .customers-section .logoCard:nth-child(8) { animation-delay: 0.8s; }
  
  @media (max-width: 992px) {
    .customers-section .content {
      grid-template-columns: 1fr !important;
      gap: 3rem !important;
    }
    
    .customers-section .title {
      font-size: 2.5rem !important;
    }
  }
  
  @media (max-width: 768px) {
    .customers-section .title {
      font-size: 2rem !important;
    }
    
    .customers-section .subtitle {
      font-size: 1rem !important;
    }
    
    .customers-section .logosGrid {
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 1rem !important;
    }
    
    .customers-section .logoCard {
      padding: 1.5rem 1rem !important;
      min-height: 100px !important;
    }
    
    .customers-section .logoPlaceholder {
      width: 50px !important;
      height: 50px !important;
      font-size: 0.875rem !important;
    }
  }
`;

if (!document.head.querySelector('style[data-customers-styles]')) {
  styleSheet.setAttribute('data-customers-styles', 'true');
  document.head.appendChild(styleSheet);
}

export default Customers;