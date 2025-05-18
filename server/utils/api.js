import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Création d'une instance axios avec configuration de base
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercepteur pour ajouter le token JWT aux requêtes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Utilisez "Authorization" plutôt que "x-auth-token" pour correspondre à votre backend
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepteur pour gérer les erreurs d'authentification
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expiré ou invalide
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('userRole');
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getCurrentUser: () => api.get('/auth/user'),
  refreshToken: () => api.post('/auth/refresh-token', {
    refreshToken: localStorage.getItem('refreshToken')
  })
};

export const contactService = {
  getContacts: () => api.get('/contacts'),
  createContact: (contactData) => api.post('/contacts', contactData),
  updateContact: (id, data) => api.patch(`/contacts/${id}`, data),
  deleteContact: (id) => api.delete(`/contacts/${id}`)
};

export default api;