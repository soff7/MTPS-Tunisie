// src/services/api.service.js
import axios from 'axios';
import apiConfig from '../config/api.config';

// Création de l'instance axios
const apiClient = axios.create({
  baseURL: apiConfig.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Ajout d'un intercepteur pour les requêtes
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Ajout d'un intercepteur pour les réponses
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Rediriger vers la page de connexion si le token est expiré (401)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Services API
const apiService = {
  // Service d'authentification
  auth: {
    login: (credentials) => apiClient.post(`${apiConfig.AUTH_ENDPOINT}/login`, credentials),
    getCurrentUser: () => apiClient.get(`${apiConfig.AUTH_ENDPOINT}/user`),
    getUsers: () => apiClient.get(apiConfig.USERS_ENDPOINT),
    createAdmin: (userData) => apiClient.post(`${apiConfig.AUTH_ENDPOINT}/create-admin`, userData),
    deleteUser: (userId) => apiClient.delete(`${apiConfig.USERS_ENDPOINT}/${userId}`)
  },
  
  // Service des produits
  products: {
    getAll: () => apiClient.get(apiConfig.PRODUCTS_ENDPOINT),
    getById: (id) => apiClient.get(`${apiConfig.PRODUCTS_ENDPOINT}/${id}`),
    create: (productData) => apiClient.post(apiConfig.PRODUCTS_ENDPOINT, productData),
    update: (id, productData) => apiClient.patch(`${apiConfig.PRODUCTS_ENDPOINT}/${id}`, productData),
    delete: (id) => apiClient.delete(`${apiConfig.PRODUCTS_ENDPOINT}/${id}`)
  },
  
  // Service des messages de contact
  contacts: {
    getAll: () => apiClient.get(apiConfig.CONTACTS_ENDPOINT),
    getById: (id) => apiClient.get(`${apiConfig.CONTACTS_ENDPOINT}/${id}`),
    updateStatus: (id, status) => apiClient.patch(`${apiConfig.CONTACTS_ENDPOINT}/${id}`, { status }),
    delete: (id) => apiClient.delete(`${apiConfig.CONTACTS_ENDPOINT}/${id}`)
  },
  
  // Service des statistiques
  stats: {
    getDashboardStats: () => apiClient.get(apiConfig.STATS_ENDPOINT)
  }
};

export default apiService;