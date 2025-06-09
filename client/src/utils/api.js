import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Timeout de 10 secondes
});

// Intercepteur pour ajouter le token aux requêtes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('API Request:', config.method?.toUpperCase(), config.url, config.data);
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs d'authentification
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.status, error.response?.data, error.config?.url);
    
    if (error.response && error.response.status === 401) {
      // Token expiré ou invalide
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      localStorage.removeItem('userRole');
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: (credentials) => api.post('/api/auth/login', credentials),
  register: (data) => api.post('/api/auth/register', data),
  getCurrentUser: () => api.get('/api/auth/user'),
  refreshToken: () => api.post('/api/auth/refresh-token', {
    refreshToken: localStorage.getItem('refreshToken')
  })
};

export const contactService = {
  getContacts: () => api.get('/api/contacts'),
  createContact: (contactData) => {
    console.log('Creating contact with data:', contactData);
    return api.post('/api/contacts', contactData);
  },
  updateContact: (id, data) => api.patch(`/api/contacts/${id}`, data),
  deleteContact: (id) => api.delete(`/api/contacts/${id}`),
  replyToContact: (id, reply) => api.put(`/api/contacts/${id}/reply`, { reply })
};

export default api;