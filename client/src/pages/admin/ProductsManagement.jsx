import React, { Component } from 'react';
import { io } from 'socket.io-client';

class ProductsManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loading: true,
      error: null,
      formData: {
        name: '',
        description: '',
        price: '',
        category: '',
        stock: 0,
        imageUrl: ''
      },
      isSubmitting: false
    };

    this.socket = null;
    this.API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  }

  componentDidMount() {
    this.fetchProducts();

    this.socket = io(this.API_BASE_URL);

    this.socket.on('productCreated', (product) => {
      this.setState(prevState => ({
        products: [product, ...prevState.products]
      }));
    });

    this.socket.on('productUpdated', (updatedProduct) => {
      this.setState(prevState => ({
        products: prevState.products.map(product =>
          product._id === updatedProduct._id ? updatedProduct : product
        )
      }));
    });

    this.socket.on('productDeleted', ({ id }) => {
      this.setState(prevState => ({
        products: prevState.products.filter(product => product._id !== id)
      }));
    });
  }

  componentWillUnmount() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  fetchProducts = async () => {
    try {
      this.setState({ loading: true, error: null });

      const response = await fetch(`${this.API_BASE_URL}/api/products`);
      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (jsonError) {
          console.error("Error parsing error response:", jsonError);
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error("Unexpected data format: The /api/products API response is not an array.");
      }

      this.setState({ products: data, loading: false });
    } catch (error) {
      console.error('Error fetching products:', error);
      this.setState({ error: error.message || 'Error loading products', loading: false });
    }
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [name]: value
      }
    }));
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      this.setState({ isSubmitting: true, error: null });

      const { name, description, price, category, stock, imageUrl } = this.state.formData;

      if (!name || !description || !price || !category || stock === '' || !imageUrl) {
        throw new Error('All fields are required');
      }

      const token = localStorage.getItem('token');
      const headers = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${this.API_BASE_URL}/api/products`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          name,
          description,
          price: parseFloat(price),
          category,
          stock: parseInt(stock, 10),
          imageUrl
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error creating product');
      }

      const result = await response.json();

      if (result.success) {
        this.setState({
          formData: { name: '', description: '', price: '', category: '', stock: 0, imageUrl: '' }
        });
        await this.fetchProducts();
        alert('Product created successfully!');
      } else {
        throw new Error(result.message || 'Error creating product');
      }
    } catch (error) {
      console.error('Error:', error);
      this.setState({ error: error.message });
    } finally {
      this.setState({ isSubmitting: false });
    }
  };

  render() {
    const { products, loading, error, formData, isSubmitting } = this.state;

    const styles = `
      .products-management { max-width: 1200px; margin: auto; padding: 20px; font-family: Arial; }
      .loading { text-align: center; padding: 50px; font-size: 18px; color: #666; }
      .error-message { color: #dc3545; background: #ffebee; padding: 15px; border-radius: 5px; margin-bottom: 25px; display: flex; justify-content: space-between; align-items: center; }
      .error-message button { background: none; border: none; color: #dc3545; font-size: 18px; cursor: pointer; }
      .add-product-form { background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 30px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
      .form-group { margin-bottom: 20px; }
      .form-group label { display: block; margin-bottom: 8px; font-weight: 600; color: #495057; }
      .form-group input, .form-group textarea, .form-group select { width: 100%; padding: 10px; border: 1px solid #ced4da; border-radius: 4px; font-size: 16px; }
      .form-group textarea { min-height: 100px; resize: vertical; }
      button[type="submit"] { background-color: #28a745; color: white; padding: 12px 20px; border: none; border-radius: 4px; font-size: 16px; cursor: pointer; transition: background-color 0.3s; }
      button[type="submit"]:hover { background-color: #218838; }
      button[type="submit"]:disabled { background-color: #6c757d; cursor: not-allowed; }
      .products-list h2 { color: #343a40; margin-bottom: 20px; }
      .products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
      .product-card { border: 1px solid #dee2e6; padding: 20px; border-radius: 8px; background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
      .product-card h3 { margin-top: 0; color: #007bff; }
      .product-card p { margin: 8px 0; color: #495057; }
      .product-actions { display: flex; margin-top: 15px; }
      .product-actions button { padding: 8px 15px; border: none; border-radius: 4px; font-size: 14px; cursor: pointer; margin-right: 10px; }
      .delete-btn { background-color: #dc3545; color: white; }
      .delete-btn:hover { background-color: #c82333; }
      .edit-btn { background-color: #17a2b8; color: white; }
      .edit-btn:hover { background-color: #138496; }
      @media (max-width: 768px) { .products-grid { grid-template-columns: 1fr; } .add-product-form { padding: 15px; } }
    `;

    if (loading) return <div className="loading">Loading products...</div>;

    return (
      <>
        <style>{styles}</style>
        <div className="products-management">
          <h1>Product Management</h1>

          {error && (
            <div className="error-message">
              Error: {error}
              <button onClick={() => this.setState({ error: null })}>✕</button>
            </div>
          )}

          <div className="add-product-form">
            <h2>Add New Product</h2>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Product Name:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={this.handleInputChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description" value={formData.description} onChange={this.handleInputChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price (€):</label>
                <input type="number" id="price" name="price" value={formData.price} onChange={this.handleInputChange} required step="0.01" min="0" />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category:</label>
                <select id="category" name="category" value={formData.category} onChange={this.handleInputChange} required>
                  <option value="">Select a category</option>
                  <option value="rectangulaire">Rectangulaire</option>
                  <option value="carre">Carré</option>
                  <option value="rond">Rond</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="stock">Stock:</label>
                <input type="number" id="stock" name="stock" value={formData.stock} onChange={this.handleInputChange} required min="0" />
              </div>
              <div className="form-group">
                <label htmlFor="imageUrl">Image URL:</label>
                <input type="text" id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={this.handleInputChange} required />
              </div>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Add Product'}
              </button>
            </form>
          </div>

          <div className="products-list">
            <h2>All Products</h2>
            <div className="products-grid">
              {products.map(product => (
                <div key={product._id} className="product-card">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p>Price: €{product.price}</p>
                  <p>Stock: {product.stock}</p>
                  <div className="product-actions">
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ProductsManagement;
