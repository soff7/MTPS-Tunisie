import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaPlus, FaTrash, FaSpinner, FaFilePdf, FaImage, FaEdit } from 'react-icons/fa';

const ProductsContainer = styled.div`
  padding: 2rem;
  background-color: var(--admin-bg);
  min-height: calc(100vh - var(--header-height));
`;

const ProductsTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: var(--admin-text-primary);
`;

const AddButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: var(--admin-primary);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 2rem;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--admin-primary-dark);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ProductForm = styled.form`
  background-color: var(--admin-card-bg);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: var(--admin-shadow-sm);
  border: 1px solid var(--admin-border);
  margin-bottom: 2rem;
`;

const FormTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  color: var(--admin-text-primary);
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--admin-border);
  border-radius: 8px;
  margin-bottom: 1rem;
  font-family: inherit;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: var(--admin-primary);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  &:invalid {
    border-color: var(--admin-danger);
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--admin-border);
  border-radius: 8px;
  margin-bottom: 1rem;
  font-family: inherit;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: var(--admin-primary);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  &:invalid {
    border-color: var(--admin-danger);
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--admin-border);
  border-radius: 8px;
  margin-bottom: 1rem;
  font-family: inherit;
  resize: vertical;
  min-height: 100px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: var(--admin-primary);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const FileInputLabel = styled.label`
  display: block;
  margin-bottom: 1rem;
  color: var(--admin-text-secondary);
  font-weight: 500;
`;

const FileInputInfo = styled.span`
  display: block;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  color: var(--admin-text-secondary);
  font-weight: normal;
`;

const CurrentFileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  padding: 0.5rem;
  background-color: var(--admin-bg);
  border-radius: 4px;
  font-size: 0.875rem;
  color: var(--admin-text-secondary);
`;

const FormButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-right: 0.5rem;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SubmitButton = styled(FormButton)`
  background-color: var(--admin-primary);
  color: white;

  &:hover:not(:disabled) {
    background-color: var(--admin-primary-dark);
  }
`;

const CancelButton = styled(FormButton)`
  background-color: var(--admin-danger);
  color: white;

  &:hover:not(:disabled) {
    background-color: #dc2626;
  }
`;

const ProductsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const ProductCard = styled.div`
  background-color: var(--admin-card-bg);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: var(--admin-shadow-sm);
  border: 1px solid var(--admin-border);
  display: flex;
  flex-direction: column;
`;

const ProductName = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: var(--admin-text-primary);
  word-wrap: break-word;
`;

const ProductCategory = styled.p`
  color: var(--admin-text-secondary);
  margin-bottom: 0.5rem;
`;

const ProductImage = styled.img`
  max-width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin: 1rem 0;
`;

const ProductDescription = styled.p`
  color: var(--admin-text-secondary);
  margin-bottom: 1rem;
  flex-grow: 1;
  word-wrap: break-word;
`;

const PdfLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--admin-primary);
  text-decoration: none;
  margin-bottom: 1rem;

  &:hover {
    text-decoration: underline;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: auto;
`;

const EditButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #f59e0b;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
  flex: 1;

  &:hover {
    background-color: #d97706;
  }
`;

const DeleteButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: var(--admin-danger);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
  flex: 1;

  &:hover {
    background-color: #dc2626;
  }
`;

const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: var(--admin-text-secondary);

  .spinner {
    animation: spin 1s linear infinite;
    margin-right: 0.5rem;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const Error = styled.div`
  color: var(--admin-danger);
  padding: 1rem;
  background-color: rgba(239, 68, 68, 0.1);
  border-radius: 8px;
  margin-bottom: 1rem;
  border-left: 4px solid var(--admin-danger);
`;

const Success = styled.div`
  color: #059669;
  padding: 1rem;
  background-color: rgba(5, 150, 105, 0.1);
  border-radius: 8px;
  margin-bottom: 1rem;
  border-left: 4px solid #059669;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: var(--admin-text-secondary);

  h3 {
    margin-bottom: 0.5rem;
    color: var(--admin-text-primary);
  }
`;

const ProductsManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    image: null,
    techSheet: null
  });

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchProducts();
  }, []);

  // Clear messages after 5 seconds
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      console.log('Fetching products from:', `${API_BASE_URL}/api/products`);
      const res = await fetch(`${API_BASE_URL}/api/products`);
      if (!res.ok) throw new Error(`Échec de la récupération des produits (${res.status})`);
      const data = await res.json();
      console.log('Products data:', data);
      setProducts(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      description: '',
      image: null,
      techSheet: null
    });
    setEditingProduct(null);
    setShowAddForm(false);
    setError(null);
    setSuccess(null);
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Le nom du produit est requis');
      return false;
    }
    if (!formData.category) {
      setError('La catégorie est requise');
      return false;
    }
    return true;
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setSubmitting(true);
    setError(null);
    
    console.log('Adding product with data:', formData);
    
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name.trim());
    formDataToSend.append('category', formData.category);
    formDataToSend.append('description', formData.description.trim());
    if (formData.image) formDataToSend.append('image', formData.image);
    if (formData.techSheet) formDataToSend.append('techSheet', formData.techSheet);

    try {
      const res = await fetch(`${API_BASE_URL}/api/products`, {
        method: 'POST',
        body: formDataToSend
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `Erreur HTTP: ${res.status}`);
      }
      
      const addedProduct = await res.json();
      console.log('Product added successfully:', addedProduct);
      setProducts(prev => [...prev, addedProduct]);
      setSuccess('Produit ajouté avec succès');
      resetForm();
    } catch (err) {
      console.error('Error adding product:', err);
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setSubmitting(true);
    setError(null);
    
    console.log('Editing product with data:', formData, 'Product ID:', editingProduct._id);
    
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name.trim());
    formDataToSend.append('category', formData.category);
    formDataToSend.append('description', formData.description.trim());
    if (formData.image) formDataToSend.append('image', formData.image);
    if (formData.techSheet) formDataToSend.append('techSheet', formData.techSheet);

    try {
      const res = await fetch(`${API_BASE_URL}/api/products/${editingProduct._id}`, {
        method: 'PUT',
        body: formDataToSend
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `Erreur HTTP: ${res.status}`);
      }
      
      const updatedProduct = await res.json();
      console.log('Product updated successfully:', updatedProduct);
      setProducts(prev => 
        prev.map(p => p._id === editingProduct._id ? updatedProduct : p)
      );
      setSuccess('Produit modifié avec succès');
      resetForm();
    } catch (err) {
      console.error('Error updating product:', err);
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/products/${productId}`, {
        method: 'DELETE'
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `Erreur HTTP: ${res.status}`);
      }
      
      console.log('Product deleted successfully');
      setProducts(prev => prev.filter(p => p._id !== productId));
      setSuccess('Produit supprimé avec succès');
    } catch (err) {
      console.error('Error deleting product:', err);
      setError(err.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log('Input changed:', name, value);
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear errors when user starts typing
    if (error) setError(null);
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    
    if (file) {
      // Validate file size (2MB limit for images, 5MB for PDFs)
      const maxSize = name === 'image' ? 2 * 1024 * 1024 : 5 * 1024 * 1024;
      if (file.size > maxSize) {
        setError(`Le fichier est trop volumineux. Taille maximale: ${name === 'image' ? '2MB' : '5MB'}`);
        e.target.value = '';
        return;
      }
    }
    
    console.log('File changed:', name, file);
    setFormData(prev => ({ ...prev, [name]: file }));
    
    // Clear errors when user selects a file
    if (error) setError(null);
  };

  const startEdit = (product) => {
    console.log('Starting edit for product:', product);
    setEditingProduct(product);
    setFormData({
      name: product.name || '',
      category: product.category || '',
      description: product.description || '',
      image: null,
      techSheet: null
    });
    setShowAddForm(false);
    setError(null);
    setSuccess(null);
  };

  const toggleAddForm = () => {
    console.log('Toggling add form');
    if (showAddForm || editingProduct) {
      resetForm();
    } else {
      setShowAddForm(true);
      setEditingProduct(null);
      setError(null);
      setSuccess(null);
    }
  };

  const renderForm = () => {
    const isEditing = !!editingProduct;
    const title = isEditing ? 'Modifier le Produit' : 'Ajouter un Nouveau Produit';
    const submitHandler = isEditing ? handleEditProduct : handleAddProduct;
    const submitText = isEditing ? 'Modifier' : 'Ajouter';

    console.log('Rendering form - isEditing:', isEditing, 'formData:', formData);

    return (
      <ProductForm onSubmit={submitHandler}>
        <FormTitle>{title}</FormTitle>
        
        <FormInput
          type="text"
          name="name"
          placeholder="Nom du produit"
          value={formData.name}
          onChange={handleInputChange}
          required
          maxLength={100}
        />
        
        <FormSelect
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          required
        >
          <option value="">Sélectionner une catégorie</option>
          <option value="PVC">PVC</option>
          <option value="PEHD">PEHD</option>
        </FormSelect>
        
        <FormTextarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          maxLength={1000}
        />
        
        <FileInputLabel>
          Image du produit
          <FormInput
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
          />
          <FileInputInfo>Format recommandé: JPG, PNG (max 2MB)</FileInputInfo>
          {isEditing && editingProduct.image && (
            <CurrentFileInfo>
              <FaImage />
              Image actuelle: {editingProduct.image.split('/').pop()}
            </CurrentFileInfo>
          )}
        </FileInputLabel>
        
        <FileInputLabel>
          Fiche technique (PDF)
          <FormInput
            type="file"
            name="techSheet"
            accept="application/pdf"
            onChange={handleFileChange}
          />
          <FileInputInfo>Format: PDF uniquement (max 5MB)</FileInputInfo>
          {isEditing && editingProduct.techSheet && (
            <CurrentFileInfo>
              <FaFilePdf />
              Fiche technique actuelle: {editingProduct.techSheet.split('/').pop()}
            </CurrentFileInfo>
          )}
        </FileInputLabel>
        
        <SubmitButton type="submit" disabled={submitting}>
          {submitting ? <FaSpinner className="spinner" /> : (isEditing ? <FaEdit /> : <FaPlus />)} 
          {submitting ? 'En cours...' : submitText}
        </SubmitButton>
        
        <CancelButton type="button" onClick={resetForm} disabled={submitting}>
          Annuler
        </CancelButton>
      </ProductForm>
    );
  };

  return (
    <ProductsContainer>
      <ProductsTitle>Gestion des Produits</ProductsTitle>
      
      {error && <Error>{error}</Error>}
      {success && <Success>{success}</Success>}

      <AddButton onClick={toggleAddForm} disabled={submitting}>
        <FaPlus /> {(showAddForm || editingProduct) ? 'Annuler' : 'Ajouter un Produit'}
      </AddButton>

      {(showAddForm || editingProduct) && renderForm()}

      {loading ? (
        <Loading>
          <FaSpinner className="spinner" />
          Chargement...
        </Loading>
      ) : products.length === 0 ? (
        <EmptyState>
          <h3>Aucun produit trouvé</h3>
          <p>Commencez par ajouter votre premier produit.</p>
        </EmptyState>
      ) : (
        <ProductsList>
          {products.map(product => (
            <ProductCard key={product._id}>
              <ProductName>{product.name}</ProductName>
              <ProductCategory>
                <strong>Catégorie:</strong> {product.category}
              </ProductCategory>
              
              {product.image && (
                <ProductImage 
                  src={`${API_BASE_URL}/${product.image}`} 
                  alt={product.name}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              )}
              
              {product.techSheet && (
                <PdfLink 
                  href={`${API_BASE_URL}/${product.techSheet}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <FaFilePdf /> Fiche technique
                </PdfLink>
              )}
              
              <ProductDescription>{product.description}</ProductDescription>
              
              <ActionButtons>
                <EditButton onClick={() => startEdit(product)}>
                  <FaEdit /> Modifier
                </EditButton>
                <DeleteButton onClick={() => handleDelete(product._id)}>
                  <FaTrash /> Supprimer
                </DeleteButton>
              </ActionButtons>
            </ProductCard>
          ))}
        </ProductsList>
      )}
    </ProductsContainer>
  );
};

export default ProductsManagement;