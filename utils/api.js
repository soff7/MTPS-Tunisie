import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production'
    ? 'https://MTPS-Tunisie.com/api'
    : 'http://localhost:5000/api'
});

// Add auth service for authentication operations
export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getCurrentUser: () => api.get('/auth/me'),
  refreshToken: () => api.get('/auth/refresh')
};

export const contactService = {
  getContacts: () => api.get('/contacts'),
  createContact: (contactData) => api.post('/contacts', contactData)
};

// Interceptor to add JWT token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;