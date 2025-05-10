import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import '../styles/ProductsHero.css';

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
    <section className="products-hero">
      <div className="hero-container">
        <div className="hero-content">
          <span className="hero-label">CATALOGUE</span>
          <h1 className="hero-title">Nos Produits.</h1>
          <p className="hero-description">
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
        <div className="stats-container">
          <div className="stat-item">
            <h3 className="stat-number">10+</h3>
            <p className="stat-label">Produits différents</p>
          </div>
          <div className="stat-item">
            <h3 className="stat-number">100%</h3>
            <p className="stat-label">Qualité certifiée</p>
          </div>
          <div className="stat-item">
            <h3 className="stat-number">48h</h3>
            <p className="stat-label">Délai de livraison</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsHero;