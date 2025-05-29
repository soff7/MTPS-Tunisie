import React, { useState, useEffect } from 'react';
import { FaFileAlt } from 'react-icons/fa';
import '../styles/ProductCatalog.css';

const ProductCatalog = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [products, setProducts] = useState([]);
  const [openTechSheet, setOpenTechSheet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/api/products`);
        if (!res.ok) throw new Error('Erreur de chargement des produits');
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error('Format de données invalide');
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const toggleTechSheet = (productId) => {
    setOpenTechSheet(openTechSheet === productId ? null : productId);
  };

  const renderTechSheet = (product) => {
    return (
      <div className="tech-sheet">
        <h4>Spécifications techniques</h4>
        <div className="tech-spec-item">
          <span className="tech-spec-label">Prix:</span>
          <span className="tech-spec-value">{product.price}€</span>
        </div>
        <div className="tech-spec-item">
          <span className="tech-spec-label">Catégorie:</span>
          <span className="tech-spec-value">{product.category}</span>
        </div>
        <div className="tech-spec-item">
          <span className="tech-spec-label">Stock:</span>
          <span className="tech-spec-value">{product.inStock ? 'Oui' : 'Non'}</span>
        </div>
      </div>
    );
  };

  const renderProducts = () => {
    let filtered = products;
    if (activeTab !== 'all') {
      filtered = products.filter(p => p.category.toLowerCase() === activeTab);
    }

    return filtered.map(product => (
      <div className="product-card" key={product._id || product.id}>
        <img
          src={`/assets/${product.image || 'default.jpg'}`}
          alt={product.name}
          className="product-image"
        />
        <div className="product-info">
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <button onClick={() => toggleTechSheet(product._id || product.id)}>
            <FaFileAlt /> Fiche technique
          </button>
          {openTechSheet === product._id && renderTechSheet(product)}
        </div>
      </div>
    ));
  };

  return (
    <section className="product-catalog" id="products">
      <div className="container">
        <h2 className="product-title">Nos <span className="highlight">Produits</span></h2>

        <div className="catalog-tabs">
          <button onClick={() => handleTabChange('all')} className={activeTab === 'all' ? 'active' : ''}>
            Tous
          </button>
          <button onClick={() => handleTabChange('pvc')} className={activeTab === 'pvc' ? 'active' : ''}>
            PVC
          </button>
          <button onClick={() => handleTabChange('pe')} className={activeTab === 'pe' ? 'active' : ''}>
            PE
          </button>
        </div>

        {loading ? (
          <p>Chargement des produits...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <div className="products-grid">{renderProducts()}</div>
        )}
      </div>
    </section>
  );
};

export default ProductCatalog;
