// src/config/api.config.js
const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://api.mtps-tunisie.com/api'  // URL de l'API en production
  : 'http://localhost:5000/api';        // URL de l'API en développement

export default {
  API_BASE_URL,
  AUTH_ENDPOINT: `${API_BASE_URL}/auth`,
  PRODUCTS_ENDPOINT: `${API_BASE_URL}/products`,
  CONTACTS_ENDPOINT: `${API_BASE_URL}/contacts`,
  USERS_ENDPOINT: `${API_BASE_URL}/auth/users`,
  STATS_ENDPOINT: `${API_BASE_URL}/stats`
};