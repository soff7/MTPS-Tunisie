// client/src/pages/admin/ProductsManagement.jsx
import React, { useState, useEffect } from 'react';
import { FaBox, FaEdit, FaTrash, FaPlus, FaSearch, FaTimes, FaCheck, FaEye, FaFileAlt } from 'react-icons/fa';
import '../../styles/admin/ProductsManagement.css';

const ProductsManagement = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Pour le formulaire d'ajout/modification de produit
  const [formData, setFormData] = useState({
    name: '',
    category: 'PVC',
    description: '',
    status: 'disponible',
    imageUrl: '',
    specifications: {
      diameters: '',
      pressures: '',
      applications: ''
    }
  });
  const [isEditing, setIsEditing] = useState(false);
  
  useEffect(() => {
    fetchProducts();
  }, []);
  
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      // Données réelles basées sur votre catalogue MTPS
      const realProducts = [
        {
          _id: '1',
          name: 'Tube PVC Pression',
          category: 'PVC',
          description: 'Tubes PVC haute pression pour applications industrielles avec résistance chimique optimale.',
          status: 'disponible',
          imageUrl: 'PVC-renforce-press.jpg',
          specifications: {
            diameters: '16mm, 20mm, 25mm, 32mm, 40mm, 50mm, 63mm, 75mm, 90mm, 110mm',
            pressures: 'PN 10, PN 16',
            applications: 'Transport de fluides sous pression, installations industrielles'
          },
          createdAt: new Date('2024-01-15').toISOString()
        },
        {
          _id: '2',
          name: 'Tube PVC Évacuation',
          category: 'PVC',
          description: 'Tubes PVC pour systèmes d\'évacuation avec excellente résistance à la corrosion.',
          status: 'disponible',
          imageUrl: 'PVC-Agri-evacuation.jpg',
          specifications: {
            diameters: '32mm, 40mm, 50mm, 75mm, 100mm, 110mm, 125mm, 160mm',
            pressures: 'PN 6',
            applications: 'Évacuation d\'eaux usées, drainage'
          },
          createdAt: new Date('2024-01-20').toISOString()
        },
        {
          _id: '3',
          name: 'Tube PVC Assainissement',
          category: 'PVC',
          description: 'Tubes PVC Assainissement pour infrastructure urbaine.',
          status: 'disponible',
          imageUrl: 'PVC-assanissement.jpg',
          specifications: {
            diameters: '10mm, 12mm, 16mm, 20mm, 25mm, 32mm, 40mm, 50mm',
            pressures: 'PN 10',
            applications: 'Assainissement urbain, réseaux collectifs'
          },
          createdAt: new Date('2024-01-25').toISOString()
        },
        {
          _id: '4',
          name: 'Tube PVC Compact',
          category: 'PVC',
          description: 'Tubes PVC compact pour installations permanentes nécessitant une durabilité accrue.',
          status: 'disponible',
          imageUrl: 'Product4.jpg',
          specifications: {
            diameters: '20mm, 25mm, 32mm, 40mm, 50mm, 63mm, 75mm, 90mm',
            pressures: 'PN 16, PN 20',
            applications: 'Infrastructures, installations enterrées, transport d\'eau'
          },
          createdAt: new Date('2024-02-01').toISOString()
        },
        {
          _id: '5',
          name: 'Tube PVC Armé',
          category: 'PVC',
          description: 'Tubes PVC avec renforcement interne pour applications haute résistance.',
          status: 'disponible',
          imageUrl: 'product5.jpg',
          specifications: {
            diameters: '25mm, 32mm, 40mm, 50mm, 63mm, 75mm, 90mm, 110mm',
            pressures: 'PN 20, PN 25',
            applications: 'Industries chimiques, transport de fluides abrasifs'
          },
          createdAt: new Date('2024-02-05').toISOString()
        },
        {
          _id: '6',
          name: 'Tube PE 100 Eau Potable',
          category: 'PE',
          description: 'Tubes en polyéthylène haute densité certifiés pour le transport d\'eau potable.',
          status: 'disponible',
          imageUrl: 'PE-Telecom.jpg',
          specifications: {
            diameters: '20mm, 25mm, 32mm, 40mm, 50mm, 63mm, 75mm, 90mm, 110mm, 125mm, 160mm',
            pressures: 'PN 10, PN 16',
            applications: 'Réseaux d\'eau potable, adduction d\'eau'
          },
          createdAt: new Date('2024-02-10').toISOString()
        },
        {
          _id: '7',
          name: 'Tube PE Basse Pression',
          category: 'PE',
          description: 'Tubes PE pour applications de drainage et irrigation à basse pression.',
          status: 'disponible',
          imageUrl: 'PE-pression.jpg',
          specifications: {
            diameters: '20mm, 25mm, 32mm, 40mm, 50mm, 63mm, 75mm, 90mm',
            pressures: 'PN 4, PN 6',
            applications: 'Drainage, irrigation, agriculture'
          },
          createdAt: new Date('2024-02-15').toISOString()
        },
        {
          _id: '8',
          name: 'Tube PE Gaz',
          category: 'PE',
          description: 'Tubes PE spécialement conçus pour les réseaux de distribution de gaz.',
          status: 'disponible',
          imageUrl: 'PE-gaz.jpg',
          specifications: {
            diameters: '32mm, 40mm, 50mm, 63mm, 75mm, 90mm, 110mm, 125mm, 160mm',
            pressures: 'SDR 11, SDR 17',
            applications: 'Transport de gaz naturel, réseaux de distribution'
          },
          createdAt: new Date('2024-02-20').toISOString()
        },
        {
          _id: '9',
          name: 'Tube PE Multicouche',
          category: 'PE',
          description: 'Tubes PE multicouche avec barrière anti-oxygène pour chauffage et climatisation.',
          status: 'disponible',
          imageUrl: 'PE.jpg',
          specifications: {
            diameters: '16mm, 20mm, 25mm, 32mm, 40mm, 50mm',
            pressures: 'PN 16, PN 20',
            applications: 'Chauffage, climatisation, planchers chauffants'
          },
          createdAt: new Date('2024-02-25').toISOString()
        },
        {
          _id: '10',
          name: 'Tube PE Industriel',
          category: 'PE',
          description: 'Tubes PE haute résistance pour applications industrielles exigeantes.',
          status: 'disponible',
          imageUrl: 'PE-industr.jpg',
          specifications: {
            diameters: '25mm, 32mm, 40mm, 50mm, 63mm, 75mm, 90mm, 110mm, 125mm, 160mm',
            pressures: 'PN 16, PN 20, PN 25',
            applications: 'Process industriels, transport de fluides corrosifs'
          },
          createdAt: new Date('2024-03-01').toISOString()
        }
      ];
      
      setProducts(realProducts);
      setIsLoading(false);
    } catch (err) {
      console.error('Erreur fetch products:', err);
      setError('Erreur de connexion au serveur');
      setIsLoading(false);
    }
  };
  
  const openProductModal = (product = null) => {
    if (product) {
      setSelectedProduct(product);
      setFormData({
        name: product.name,
        category: product.category,
        description: product.description,
        status: product.status,
        imageUrl: product.imageUrl,
        specifications: product.specifications
      });
      setIsEditing(true);
    } else {
      setSelectedProduct(null);
      setFormData({
        name: '',
        category: 'PVC',
        description: '',
        status: 'disponible',
        imageUrl: '',
        specifications: {
          diameters: '',
          pressures: '',
          applications: ''
        }
      });
      setIsEditing(false);
    }
    setShowModal(true);
  };
  
  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    setFormData({
      name: '',
      category: 'PVC',
      description: '',
      status: 'disponible',
      imageUrl: '',
      specifications: {
        diameters: '',
        pressures: '',
        applications: ''
      }
    });
    setIsEditing(false);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('specifications.')) {
      const specField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [specField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation simple
    if (!formData.name || !formData.description) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    try {
      if (isEditing) {
        // Mise à jour produit
        console.log('Mise à jour produit:', formData);
        setProducts(products.map(product => 
          product._id === selectedProduct._id 
            ? { ...product, ...formData }
            : product
        ));
      } else {
        // Création nouveau produit
        console.log('Création produit:', formData);
        const newProduct = {
          _id: Date.now().toString(),
          ...formData,
          createdAt: new Date().toISOString()
        };
        setProducts([...products, newProduct]);
      }
      
      closeModal();
    } catch (err) {
      console.error('Erreur sauvegarde:', err);
      alert('Erreur lors de la sauvegarde');
    }
  };
  
  const deleteProduct = async (productId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      return;
    }
    
    try {
      console.log('Suppression produit:', productId);
      setProducts(products.filter(product => product._id !== productId));
    } catch (err) {
      console.error('Erreur suppression:', err);
      alert('Erreur lors de la suppression');
    }
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'disponible': return 'status-available';
      case 'rupture': return 'status-out';
      case 'arrivage': return 'status-incoming';
      case 'commande': return 'status-order';
      default: return 'status-available';
    }
  };
  
  const getStatusLabel = (status) => {
    switch (status) {
      case 'disponible': return 'Disponible';
      case 'rupture': return 'Rupture de stock';
      case 'arrivage': return 'En arrivage';
      case 'commande': return 'Sur commande';
      default: return status;
    }
  };
  
  // Filtrer les produits
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });
  
  if (isLoading) {
    return (
      <div className="products-loading">
        <div className="loading-spinner"></div>
        <p>Chargement des produits...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="products-error">
        <p>Erreur: {error}</p>
        <button onClick={fetchProducts} className="retry-btn">
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="products-management">
      <div className="page-header">
        <div>
          <h1>Gestion des Produits</h1>
          <p>Gérez votre catalogue de tubes plastiques industriels</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => openProductModal()}
        >
          <FaPlus /> Ajouter Produit
        </button>
      </div>
      
      <div className="products-filters">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Rechercher par nom ou description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-selects">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">Toutes les catégories ({products.length})</option>
            <option value="PVC">Tubes PVC ({products.filter(p => p.category === 'PVC').length})</option>
            <option value="PE">Tubes PE ({products.filter(p => p.category === 'PE').length})</option>
          </select>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">Tous les statuts</option>
            <option value="disponible">Disponible</option>
            <option value="rupture">Rupture de stock</option>
            <option value="arrivage">En arrivage</option>
            <option value="commande">Sur commande</option>
          </select>
        </div>
      </div>
      
      <div className="products-table">
        <div className="table-header">
          <h2>Produits ({filteredProducts.length})</h2>
        </div>
        
        {filteredProducts.length === 0 ? (
          <div className="no-products">
            <FaBox size={48} />
            <h3>Aucun produit trouvé</h3>
            <p>
              {searchTerm || categoryFilter !== 'all' || statusFilter !== 'all'
                ? 'Aucun produit ne correspond à vos critères de recherche.' 
                : 'Aucun produit enregistré pour le moment.'
              }
            </p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Nom du produit</th>
                  <th>Catégorie</th>
                  <th>Statut</th>
                  <th>Diamètres</th>
                  <th>Applications</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product._id}>
                    <td>
                      <div className="product-image">
                        <img
                          src={`/assets/${product.imageUrl}`}
                          alt={product.name}
                          onError={(e) => {
                            e.target.src = '/assets/placeholder-product.jpg';
                          }}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="product-name">
                        <strong>{product.name}</strong>
                        <small>{product.description.substring(0, 50)}...</small>
                      </div>
                    </td>
                    <td>
                      <span className={`category-badge category-${product.category.toLowerCase()}`}>
                        {product.category}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${getStatusColor(product.status)}`}>
                        {getStatusLabel(product.status)}
                      </span>
                    </td>
                    <td className="diameters-cell">
                      {product.specifications.diameters.split(',').slice(0, 3).join(', ')}
                      {product.specifications.diameters.split(',').length > 3 && '...'}
                    </td>
                    <td className="applications-cell">
                      {product.specifications.applications.substring(0, 30)}...
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="btn btn-sm btn-primary"
                          onClick={() => openProductModal(product)}
                          title="Modifier"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          className="btn btn-sm btn-danger"
                          onClick={() => deleteProduct(product._id)}
                          title="Supprimer"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Modal d'ajout/modification */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content product-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{isEditing ? 'Modifier Produit' : 'Ajouter Produit'}</h3>
              <button className="modal-close" onClick={closeModal}>
                <FaTimes />
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Nom du produit *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Catégorie *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="form-select"
                      required
                    >
                      <option value="PVC">Tubes PVC</option>
                      <option value="PE">Tubes PE</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="form-textarea"
                    rows="3"
                    required
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Statut *</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="form-select"
                      required
                    >
                      <option value="disponible">Disponible</option>
                      <option value="rupture">Rupture de stock</option>
                      <option value="arrivage">En arrivage</option>
                      <option value="commande">Sur commande</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Image (nom du fichier)</label>
                    <input
                      type="text"
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="ex: PVC-renforce-press.jpg"
                    />
                  </div>
                </div>
                
                <h4>Spécifications techniques</h4>
                
                <div className="form-group">
                  <label className="form-label">Diamètres disponibles</label>
                  <input
                    type="text"
                    name="specifications.diameters"
                    value={formData.specifications.diameters}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="ex: 16mm, 20mm, 25mm, 32mm..."
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Classes de pression</label>
                  <input
                    type="text"
                    name="specifications.pressures"
                    value={formData.specifications.pressures}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="ex: PN 10, PN 16"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Applications</label>
                  <textarea
                    name="specifications.applications"
                    value={formData.specifications.applications}
                    onChange={handleInputChange}
                    className="form-textarea"
                    rows="2"
                    placeholder="ex: Transport de fluides sous pression, installations industrielles"
                  />
                </div>
              </div>
              
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Annuler
                </button>
                <button type="submit" className="btn btn-primary">
                  <FaCheck /> {isEditing ? 'Mettre à jour' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsManagement;