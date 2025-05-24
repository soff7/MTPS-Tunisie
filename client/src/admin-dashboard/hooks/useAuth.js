import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    const userData = localStorage.getItem('user');

    if (!token || (userRole !== 'admin' && userRole !== 'superadmin')) {
      navigate('/signin');
      return;
    }

    if (userData) {
      setUser(JSON.parse(userData));
    }
    
    setLoading(false);
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    navigate('/signin');
  };

  return { user, loading, logout };
}

