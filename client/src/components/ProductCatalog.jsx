import React, { useState, useEffect } from 'react';
import { FaFileAlt, FaFilePdf } from 'react-icons/fa';
import '../styles/ProductCatalog.css';

const ProductCatalog = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [flippedCards, setFlippedCards] = useState(new Set());

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
  }, [API_BASE_URL]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // إعادة تعيين البطاقات المقلوبة عند تغيير التبويب
    setFlippedCards(new Set());
  };

  // التحكم في قلب البطاقة للأجهزة التي لا تدعم hover
  const handleCardClick = (productId) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  // ✅ تحسين تحميل الملف مع معالجة أفضل للأخطاء
  const handleTechSheetDownload = (product, event) => {
    // منع انتشار الحدث لتجنب قلب البطاقة
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    
    if (product.techSheet) {
      try {
        const fileUrl = `${API_BASE_URL}/${product.techSheet}`;
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = `${product.name || 'fiche-technique'}.pdf`;
        link.target = '_blank'; // فتح في نافذة جديدة كبديل
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // إشعار بنجاح العملية
        console.log(`Téléchargement initié pour: ${product.name}`);
      } catch (error) {
        console.error('Erreur lors du téléchargement:', error);
        alert('Erreur lors du téléchargement du fichier');
      }
    } else {
      alert('Fiche technique non disponible pour ce produit');
    }
  };

  const renderTechSheet = (product) => (
    <div className="tech-sheet-content">
      <h4>Spécifications techniques</h4>
      <div className="tech-spec-item">
        <span className="tech-spec-label">Catégorie:</span>
        <span className="tech-spec-value">{product.category}</span>
      </div>
      {product.techSheet && (
        <div className="tech-spec-item">
          <button 
            className="tech-sheet-download-button"
            onClick={(e) => handleTechSheetDownload(product, e)}
            onMouseDown={(e) => e.stopPropagation()}
            type="button"
            aria-label={`Télécharger la fiche technique PDF pour ${product.name}`}
            title="Cliquez pour télécharger la fiche technique"
          >
            <div className="tech-sheet-download-link">
              <FaFilePdf className="pdf-icon" />
              <span>Télécharger PDF</span>
            </div>
          </button>
        </div>
      )}
      <div className="tech-spec-item">
        <span className="tech-spec-label">Description:</span>
        <span className="tech-spec-value">{product.description}</span>
      </div>
    </div>
  );

  const renderProducts = () => {
    let filtered = products;
    if (activeTab !== 'all') {
      filtered = products.filter(p => p.category.toLowerCase() === activeTab);
    }

    return filtered.map(product => {
      const productId = product._id || product.id;
      const isFlipped = flippedCards.has(productId);
      
      return (
        <div 
          className={`flip-card ${isFlipped ? 'flipped' : ''}`} 
          key={productId}
          onClick={() => handleCardClick(productId)}
          role="button"
          tabIndex={0}
          aria-label={`Voir les détails de ${product.name}`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleCardClick(productId);
            }
          }}
        >
          <div className="card-content">
            {/* Back Side - Tech Sheet */}
            <div className="card-back">
              <div className="back-content">
                <FaFileAlt size={50} color="#6bc9ff" />
                <strong>Fiche Technique</strong>
                {renderTechSheet(product)}
              </div>
            </div>
            
            {/* Front Side - Product Info */}
            <div className="card-front">
              <div className="card-background">
                <div className="floating-circle"></div>
                <div className="floating-circle circle-right"></div>
                <div className="floating-circle circle-bottom"></div>
              </div>
              
              <div className="front-content">
                <small className="product-badge">{product.category}</small>
                
                <div className="product-image-container">
                  <img
                    src={product.image ? `${API_BASE_URL}/${product.image}` : '/assets/default.jpg'}
                    alt={product.name}
                    className="product-image"
                    onError={(e) => {
                      e.target.src = '/assets/default.jpg';
                    }}
                  />
                </div>
                
                <div className="product-description">
                  <div className="product-title">
                    <h3>{product.name}</h3>
                  </div>
                  <p className="product-footer">
                    Disponible &nbsp; 
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <section className="product-catalog" id="products">
      <div className="container">
        <div className="catalog-tabs">
          <button 
            onClick={() => handleTabChange('all')} 
            className={`catalog-tab ${activeTab === 'all' ? 'active' : ''}`}
          >
            Tous
          </button>
          <button 
            onClick={() => handleTabChange('pvc')} 
            className={`catalog-tab ${activeTab === 'pvc' ? 'active' : ''}`}
          >
            PVC
          </button>
          <button 
            onClick={() => handleTabChange('pehd')} 
            className={`catalog-tab ${activeTab === 'pehd' ? 'active' : ''}`}
          >
            PEHD
          </button>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Chargement des produits...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p className="error">{error}</p>
          </div>
        ) : (
          <div className="products-grid">{renderProducts()}</div>
        )}
      </div>
    </section>
  );
};

export default ProductCatalog;