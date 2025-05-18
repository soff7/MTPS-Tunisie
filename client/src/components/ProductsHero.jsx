import { useState } from 'react';
import { FaSearch, FaArrowRight } from 'react-icons/fa';
import '../styles/ProductsHero.css'; // Assurez-vous de mettre à jour ce fichier CSS avec le style des Services

const ProductsHero = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    
    if (searchTerm.trim() === '') return;
    
    try {
      // Appel à votre API de recherche
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`);
      const data = await response.json();
      
      // Passez les résultats au composant parent
      onSearch(searchTerm, data.results);
    } catch (error) {
      console.error("Erreur lors de la recherche:", error);
      // Gérer l'erreur (afficher un message, etc.)
    }
  };

  return (
    <>
      <section className="products-hero">
        <div className="services-container">
          <div className="services-intro">
            <span className="expertise-badge">Catalogue</span>
            <h2 className="services-title">Nos <span className="highlighted">Produits</span></h2>
            <p className="services-description">
              Découvrez notre gamme complète de tubes en PVC et PE pour applications industrielles et distribution d'eau,
              fabriqués avec des matériaux de première qualité pour garantir durabilité et performance.
            </p>
            <form onSubmit={handleSearchSubmit} className="search-container">
              <input 
                type="text" 
                placeholder="Rechercher un produit..." 
                className="search-input" 
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <button type="submit" className="search-button"><FaSearch /></button>
            </form>
          </div>
          
          <div className="services-cards stats-grid">
            <div className="service-item stat-card">
              <div className="service-top">
                <div className="service-icon-wrapper">
                  <FaArrowRight className="service-icon" />
                </div>
                <div className="service-stats">
                  <span className="stat-number">10+</span>
                  <span className="stat-label">Produits différents</span>
                </div>
              </div>
            </div>
            
            <div className="service-item stat-card">
              <div className="service-top">
                <div className="service-icon-wrapper">
                  <FaArrowRight className="service-icon" />
                </div>
                <div className="service-stats">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">Qualité certifiée</span>
                </div>
              </div>
            </div>
            
            <div className="service-item stat-card">
              <div className="service-top">
                <div className="service-icon-wrapper">
                  <FaArrowRight className="service-icon" />
                </div>
                <div className="service-stats">
                  <span className="stat-number">48h</span>
                  <span className="stat-label">Délai de livraison</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="section-divider"></div>
    </>
  );
};

export default ProductsHero;