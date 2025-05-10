import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://MTPS-Tunisie.com/api' 
    : 'http://localhost:5000/api'
});

export const contactService = {
  getContacts: () => api.get('/contacts'),
  createContact: (contactData) => api.post('/contacts', contactData)
};

// Intercepteur pour ajouter le token JWT aux requêtes
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