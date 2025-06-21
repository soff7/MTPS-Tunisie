import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // Augmenter le timeout à 15 secondes
  withCredentials: false, // Explicitement défini pour éviter les problèmes CORS
});

// Intercepteur pour ajouter le token aux requêtes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log plus détaillé pour debugging
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    if (config.data) {
      // Masquer les mots de passe dans les logs
      const logData = { ...config.data };
      if (logData.password) logData.password = '***';
      console.log('📤 Request data:', logData);
    }
    
    return config;
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les réponses et erreurs
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Success: ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`);
    if (response.data) {
      console.log('📥 Response data:', response.data);
    }
    return response;
  },
  async (error) => {
    const originalUrl = error.config?.url;
    const method = error.config?.method?.toUpperCase();
    
    console.error(`❌ API Error: ${error.response?.status || 'Network'} ${method} ${originalUrl}`);
    
    if (error.response) {
      // Erreur du serveur avec réponse
      console.error('📥 Error response:', error.response.data);
      console.error('📥 Error headers:', error.response.headers);
      
      if (error.response.status === 401) {
        // Token expiré ou invalide
        console.log('🔒 Token invalide, déconnexion...');
        
        // Nettoyer le localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        localStorage.removeItem('userRole');
        
        // Rediriger vers la page de connexion
        if (window.location.pathname !== '/signin' && window.location.pathname !== '/signup') {
          window.location.href = '/signin';
        }
      }
    } else if (error.request) {
      // Erreur réseau
      console.error('🌐 Network error:', error.request);
      console.error('🌐 Error message:', error.message);
    } else {
      // Autre erreur
      console.error('⚠️ Setup error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export const authService = {
  login: async (credentials) => {
    try {
      console.log('🔐 Tentative de connexion...');
      const response = await api.post('/api/auth/login', credentials);
      return response;
    } catch (error) {
      console.error('🔐 Erreur lors de la connexion:', error);
      throw error;
    }
  },
  
  register: async (data) => {
    try {
      console.log('📝 Tentative d\'inscription...');
      const response = await api.post('/api/auth/register', data);
      return response;
    } catch (error) {
      console.error('📝 Erreur lors de l\'inscription:', error);
      throw error;
    }
  },
  
  getCurrentUser: async () => {
    try {
      console.log('👤 Récupération de l\'utilisateur actuel...');
      const response = await api.get('/api/auth/user');
      return response;
    } catch (error) {
      console.error('👤 Erreur lors de la récupération de l\'utilisateur:', error);
      throw error;
    }
  },
  
  refreshToken: async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('Aucun refresh token disponible');
      }
      
      console.log('🔄 Tentative de rafraîchissement du token...');
      const response = await api.post('/api/auth/refresh-token', { refreshToken });
      return response;
    } catch (error) {
      console.error('🔄 Erreur lors du rafraîchissement du token:', error);
      throw error;
    }
  }
};

export const contactService = {
  getContacts: async () => {
    try {
      console.log('📋 Récupération des contacts...');
      const response = await api.get('/api/contacts');
      return response;
    } catch (error) {
      console.error('📋 Erreur lors de la récupération des contacts:', error);
      throw error;
    }
  },
  
  createContact: async (contactData) => {
    try {
      console.log('📝 Création d\'un nouveau contact...');
      console.log('📤 Contact data:', contactData);
      const response = await api.post('/api/contacts', contactData);
      return response;
    } catch (error) {
      console.error('📝 Erreur lors de la création du contact:', error);
      throw error;
    }
  },
  
  updateContact: async (id, data) => {
    try {
      console.log(`✏️ Mise à jour du contact ${id}...`);
      const response = await api.patch(`/api/contacts/${id}`, data);
      return response;
    } catch (error) {
      console.error(`✏️ Erreur lors de la mise à jour du contact ${id}:`, error);
      throw error;
    }
  },
  
  deleteContact: async (id) => {
    try {
      console.log(`🗑️ Suppression du contact ${id}...`);
      const response = await api.delete(`/api/contacts/${id}`);
      return response;
    } catch (error) {
      console.error(`🗑️ Erreur lors de la suppression du contact ${id}:`, error);
      throw error;
    }
  },
  
  replyToContact: async (id, reply) => {
    try {
      console.log(`💬 Réponse au contact ${id}...`);
      const response = await api.put(`/api/contacts/${id}/reply`, { reply });
      return response;
    } catch (error) {
      console.error(`💬 Erreur lors de la réponse au contact ${id}:`, error);
      throw error;
    }
  }
};

// Fonction utilitaire pour vérifier la connexion
export const checkConnection = async () => {
  try {
    console.log('🔍 Vérification de la connexion API...');
    const response = await api.get('/api/health');
    console.log('✅ API disponible');
    return true;
  } catch (error) {
    console.error('❌ API indisponible:', error.message);
    return false;
  }
};

// Fonction utilitaire pour vérifier l'authentification
export const checkAuth = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  
  if (!token || !user) {
    console.log('🔒 Utilisateur non authentifié');
    return false;
  }
  
  try {
    const userData = JSON.parse(user);
    console.log('👤 Utilisateur authentifié:', userData.name || userData.email);
    return true;
  } catch (error) {
    console.error('❌ Erreur lors de la vérification de l\'authentification:', error);
    return false;
  }
};

export default api;