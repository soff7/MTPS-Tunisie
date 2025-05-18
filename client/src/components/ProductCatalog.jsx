import { useState } from 'react';
import { FaFileAlt } from 'react-icons/fa';
import '../styles/ProductCatalog.css';

const ProductCatalog = () => {
  const [activeTab, setActiveTab] = useState('all');

  const products = {
    pvc: [
      {
        id: 'pvc1',
        name: 'Tube PVC Pression',
        image: 'PVC-renforce-press.jpg',
        description: 'Tubes PVC haute pression pour applications industrielles avec résistance chimique optimale.',
        specs: {
          diametres: '16mm, 20mm, 25mm, 32mm, 40mm, 50mm, 63mm, 75mm, 90mm, 110mm',
          pressions: 'PN 10, PN 16',
          applications: 'Transport de fluides sous pression, installations industrielles'
        }
      },
      {
        id: 'pvc2',
        name: 'Tube PVC Évacuation',
        image:  'PVC-Agri-evacuation.jpg',
        description: 'Tubes PVC pour systèmes d\'évacuation avec excellente résistance à la corrosion.',
        specs: {
          diametres: '32mm, 40mm, 50mm, 75mm, 100mm, 110mm, 125mm, 160mm',
          pressions: 'PN 6',
          applications: 'Évacuation d\'eaux usées, drainage'
        }
      },
      {
        id: 'pvc3',
        name: 'Tube PVC Assainissement',
        image: 'PVC-assanissement.jpg',
        description: 'Tubes PVC Assainissement.',
        specs: {
          diametres: '10mm, 12mm, 16mm, 20mm, 25mm, 32mm, 40mm, 50mm',
          pressions: 'PN 10',
          applications: 'Visualisation de fluides, laboratoires, process industriels'
        }
      },
      {
        id: 'pvc4',
        name: 'Tube PVC Compact',
        image: 'Product4.jpg',
        description: 'Tubes PVC compact pour installations permanentes nécessitant une durabilité accrue.',
        specs: {
          diametres: '20mm, 25mm, 32mm, 40mm, 50mm, 63mm, 75mm, 90mm',
          pressions: 'PN 16, PN 20',
          applications: 'Infrastructures, installations enterrées, transport d\'eau'
        }
      },
      {
        id: 'pvc5',
        name: 'Tube PVC Armé',
        image: 'product5.jpg',
        description: 'Tubes PVC avec renforcement interne pour applications haute résistance.',
        specs: {
          diametres: '25mm, 32mm, 40mm, 50mm, 63mm, 75mm, 90mm, 110mm',
          pressions: 'PN 20, PN 25',
          applications: 'Industries chimiques, transport de fluides abrasifs'
        }
      }
    ],
    pe: [
      {
        id: 'pe1',
        name: 'Tube PE 100 Eau Potable',
        image: 'PE-Telecom.jpg',
        description: 'Tubes en polyéthylène haute densité certifiés pour le transport d\'eau potable.',
        specs: {
          diametres: '20mm, 25mm, 32mm, 40mm, 50mm, 63mm, 75mm, 90mm, 110mm, 125mm, 160mm',
          pressions: 'PN 10, PN 16',
          applications: 'Réseaux d\'eau potable, adduction d\'eau'
        }
      },
      {
        id: 'pe2',
        name: 'Tube PE Basse Pression',
        image: 'PE-pression.jpg',
        description: 'Tubes PE pour applications de drainage et irrigation à basse pression.',
        specs: {
          diametres: '20mm, 25mm, 32mm, 40mm, 50mm, 63mm, 75mm, 90mm',
          pressions: 'PN 4, PN 6',
          applications: 'Drainage, irrigation, agriculture'
        }
      },
      {
        id: 'pe3',
        name: 'Tube PE Gaz',
        image: 'PE-gaz.jpg',
        description: 'Tubes PE spécialement conçus pour les réseaux de distribution de gaz.',
        specs: {
          diametres: '32mm, 40mm, 50mm, 63mm, 75mm, 90mm, 110mm, 125mm, 160mm',
          pressions: 'SDR 11, SDR 17',
          applications: 'Transport de gaz naturel, réseaux de distribution'
        }
      },
      {
        id: 'pe4',
        name: 'Tube PE Multicouche',
        image: 'PE.jpg',
        description: 'Tubes PE multicouche avec barrière anti-oxygène pour chauffage et climatisation.',
        specs: {
          diametres: '16mm, 20mm, 25mm, 32mm, 40mm, 50mm',
          pressions: 'PN 16, PN 20',
          applications: 'Chauffage, climatisation, planchers chauffants'
        }
      },
      {
        id: 'pe5',
        name: 'Tube PE Industriel',
        image: 'PE-industr.jpg',
        description: 'Tubes PE haute résistance pour applications industrielles exigeantes.',
        specs: {
          diametres: '25mm, 32mm, 40mm, 50mm, 63mm, 75mm, 90mm, 110mm, 125mm, 160mm',
          pressions: 'PN 16, PN 20, PN 25',
          applications: 'Process industriels, transport de fluides corrosifs'
        }
      }
    ]
  };

  const getImagePath = (imgName) => {
    try {
      return `/assets/${imgName}`;
    } catch (error) {
      return '';
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const [openTechSheet, setOpenTechSheet] = useState(null);

  const toggleTechSheet = (productId) => {
    if (openTechSheet === productId) {
      setOpenTechSheet(null);
    } else {
      setOpenTechSheet(productId);
    }
  };

  const renderTechSheet = (product) => {
    return (
      <div className="tech-sheet">
        <h4>Spécifications techniques</h4>
        <div className="tech-spec-item">
          <span className="tech-spec-label">Diamètres disponibles:</span>
          <span className="tech-spec-value">{product.specs.diametres}</span>
        </div>
        <div className="tech-spec-item">
          <span className="tech-spec-label">Classes de pression:</span>
          <span className="tech-spec-value">{product.specs.pressions}</span>
        </div>
        <div className="tech-spec-item">
          <span className="tech-spec-label">Applications:</span>
          <span className="tech-spec-value">{product.specs.applications}</span>
        </div>
      </div>
    );
  };

  const renderProducts = () => {
    let filteredProducts = [];
    
    if (activeTab === 'all') {
      filteredProducts = [...products.pvc, ...products.pe];
    } else if (activeTab === 'pvc') {
      filteredProducts = products.pvc;
    } else if (activeTab === 'pe') {
      filteredProducts = products.pe;
    }

    return filteredProducts.map((product) => (
      <div className="product-card" key={product.id}>
        <img
          src={getImagePath(product.image)}
          alt={product.name}
          className="product-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '';
          }}
        />
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-description">{product.description}</p>
          <button 
            className="tech-sheet-button"
            onClick={() => toggleTechSheet(product.id)}
          >
            <FaFileAlt /> Fiche technique
          </button>
          {openTechSheet === product.id && renderTechSheet(product)}
        </div>
      </div>
    ));
  };

  return (
    <>
      <section className="product-catalog" id="products">
        {/* Effets visuels similaires aux autres sections */}
        <div className="product-particles"></div>
        <div className="product-overlay"></div>
        <div className="product-shape-1"></div>
        <div className="product-shape-2"></div>
        
        <div className="container">
          <div className="product-intro">

            <h2 className="product-title">Nos <span className="highlight">Produits</span></h2>
          </div>
          
          <div className="catalog-tabs">
            <button 
              className={`catalog-tab ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => handleTabChange('all')}
            >
              Tous les produits
            </button>
            <button 
              className={`catalog-tab ${activeTab === 'pvc' ? 'active' : ''}`}
              onClick={() => handleTabChange('pvc')}
              id="pvc"
            >
              Tubes PVC
            </button>
            <button 
              className={`catalog-tab ${activeTab === 'pe' ? 'active' : ''}`}
              onClick={() => handleTabChange('pe')}
              id="pe"
            >
              Tubes PE
            </button>
          </div>
          
          <div className="products-grid">
            {renderProducts()}
          </div>
        </div>
      </section>
      
      {/* Séparateur animé pour la transition vers la section suivante */}
      <div className="section-divider"></div>
    </>
  );
};

export default ProductCatalog;