import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaPlus, FaTrash, FaSpinner, FaFilePdf, FaImage } from 'react-icons/fa';

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
`;

const AddProductForm = styled.form`
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

  &:focus {
    outline: none;
    border-color: var(--admin-primary);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--admin-border);
  border-radius: 8px;
  margin-bottom: 1rem;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: var(--admin-primary);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
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
`;

const FileInputInfo = styled.span`
  display: block;
  font-size: 0.875rem;
  margin-top: 0.25rem;
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
`;

const SubmitButton = styled(FormButton)`
  background-color: var(--admin-primary);
  color: white;

  &:hover {
    background-color: var(--admin-primary-dark);
  }
`;

const CancelButton = styled(FormButton)`
  background-color: var(--admin-danger);
  color: white;

  &:hover {
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
`;

const ProductName = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: var(--admin-text-primary);
`;

const ProductCategory = styled.p`
  color: var(--admin-text-secondary);
  margin-bottom: 0.5rem;
`;

const ProductImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1rem 0;
`;

const ProductDescription = styled.p`
  color: var(--admin-text-secondary);
  margin-bottom: 1rem;
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
`;

const Error = styled.div`
  color: var(--admin-danger);
  padding: 1rem;
  background-color: rgba(239, 68, 68, 0.1);
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const ProductsManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
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

  const fetchProducts = async () => {
    try {
      console.log('Fetching products from:', `${API_BASE_URL}/api/products`);
      const res = await fetch(`${API_BASE_URL}/api/products`);
      if (!res.ok) throw new Error('Échec de la récupération des produits');
      const data = await res.json();
      console.log('Products data:', data);
      setProducts(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('category', newProduct.category);
    formData.append('description', newProduct.description);
    if (newProduct.image) formData.append('image', newProduct.image);
    if (newProduct.techSheet) formData.append('techSheet', newProduct.techSheet);

    try {
      const res = await fetch(`${API_BASE_URL}/api/products`, {
        method: 'POST',
        body: formData
      });
      const addedProduct = await res.json();
      setProducts(prev => [...prev, addedProduct]);
      setShowAddForm(false);
      setNewProduct({
        name: '',
        category: '',
        description: '',
        image: null,
        techSheet: null
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await fetch(`${API_BASE_URL}/api/products/${productId}`, {
        method: 'DELETE'
      });
      setProducts(prev => prev.filter(p => p._id !== productId));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: files[0] }));
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  return (
    <ProductsContainer>
      <ProductsTitle>Gestion des Produits</ProductsTitle>
      
      {error && <Error>{error}</Error>}

      <AddButton onClick={toggleAddForm}>
        <FaPlus /> Ajouter un Produit
      </AddButton>

      {showAddForm && (
        <AddProductForm onSubmit={handleAddProduct}>
          <FormTitle>Ajouter un Nouveau Produit</FormTitle>
          
          <FormInput
            type="text"
            name="name"
            placeholder="Nom du produit"
            value={newProduct.name}
            onChange={handleInputChange}
            required
          />
          
          <FormSelect
            name="category"
            value={newProduct.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Sélectionner une catégorie</option>
            <option value="PVC-U">PVC-U</option>
            <option value="PE80">PE80</option>
            <option value="PEHD">PEHD</option>
          </FormSelect>
          
          <FormTextarea
            name="description"
            placeholder="Description"
            value={newProduct.description}
            onChange={handleInputChange}
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
          </FileInputLabel>
          
          <FileInputLabel>
            Fiche technique (PDF)
            <FormInput
              type="file"
              name="techSheet"
              accept="application/pdf"
              onChange={handleFileChange}
            />
            <FileInputInfo>Format: PDF uniquement</FileInputInfo>
          </FileInputLabel>
          
          <SubmitButton type="submit">
            <FaPlus /> Ajouter
          </SubmitButton>
          
          <CancelButton type="button" onClick={toggleAddForm}>
            Annuler
          </CancelButton>
        </AddProductForm>
      )}

      {loading ? (
        <Loading>
          <FaSpinner className="spinner" />
          Chargement...
        </Loading>
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
              
              <DeleteButton onClick={() => handleDelete(product._id)}>
                <FaTrash /> Supprimer
              </DeleteButton>
            </ProductCard>
          ))}
        </ProductsList>
      )}
    </ProductsContainer>
  );
};

export default ProductsManagement;