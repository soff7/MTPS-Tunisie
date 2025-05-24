export const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers
    },
    ...options
  };

  if (options.body && typeof options.body === 'object') {
    config.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      if (response.status === 401) {
        // Token expiré, rediriger vers la connexion
        localStorage.removeItem('token');
        window.location.href = '/signin';
        return;
      }
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

export const apiGet = (endpoint) => apiRequest(endpoint);

export const apiPost = (endpoint, data) => 
  apiRequest(endpoint, { method: 'POST', body: data });

export const apiPut = (endpoint, data) => 
  apiRequest(endpoint, { method: 'PUT', body: data });

export const apiDelete = (endpoint) => 
  apiRequest(endpoint, { method: 'DELETE' });
