import React, { useState, useEffect } from 'react';
import { FaFileAlt } from 'react-icons/fa';
import { io } from 'socket.io-client';
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

    const socket = io(API_BASE_URL, {
      transports: ['websocket'],
      reconnectionAttempts: 5,
      timeout: 10000
    });

    socket.on('productCreated', (product) => {
      setProducts(prevProducts => [product, ...prevProducts]);
    });

    socket.on('productUpdated', (updatedProduct) => {
      setProducts(prevProducts =>
        prevProducts.map(product =>
          product._id === updatedProduct._id ? updatedProduct : product
        )
      );
    });

    socket.on('productDeleted', ({ id }) => {
      setProducts(prevProducts =>
        prevProducts.filter(product => product._id !== id)
      );
    });

    return () => {
      socket.disconnect();
    };
  }, [API_BASE_URL]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const toggleTechSheet = (productId) => {
    setOpenTechSheet(openTechSheet === productId ? null : productId);
  };

  const renderTechSheet = (product) => (
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
          {openTechSheet === (product._id || product.id) && renderTechSheet(product)}
        </div>
      </div>
    ));
  };

  return (
    <section className="product-catalog" id="products">
      <div className="container">
        <h2 className="product-title">
          Nos <span className="highlight">Produits</span>
        </h2>

        <div className="catalog-tabs">
          <button onClick={() => handleTabChange('all')} className={activeTab === 'all' ? 'active' : ''}>
            Tous
          </button>
          <button onClick={() => handleTabChange('rectangulaire')} className={activeTab === 'rectangulaire' ? 'active' : ''}>
            Rectangulaire
          </button>
          <button onClick={() => handleTabChange('carre')} className={activeTab === 'carre' ? 'active' : ''}>
            Carré
          </button>
          <button onClick={() => handleTabChange('rond')} className={activeTab === 'rond' ? 'active' : ''}>
            Rond
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
