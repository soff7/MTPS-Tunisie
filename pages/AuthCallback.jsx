import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/AuthCallback.css';

const AuthCallback = () => {
  const [isProcessing, setIsProcessing] = useState(true);
  const [message, setMessage] = useState('Traitement de votre authentification...');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const processAuth = async () => {
      try {
        // Get the token and userId from URL query parameters
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const userId = params.get('userId');
        const error = params.get('error');

        // Handle error case
        if (error) {
          setMessage('Échec de l\'authentification. Veuillez réessayer.');
          setTimeout(() => navigate('/signin'), 2000);
          return;
        }

        // Validate token and userId
        if (!token || !userId) {
          setMessage('Informations d\'authentification manquantes. Veuillez réessayer.');
          setTimeout(() => navigate('/signin'), 2000);
          return;
        }

        // Store token and user info in localStorage
        localStorage.setItem('token', token);

        // Fetch user details with the token
        try {
          const response = await fetch('http://localhost:5000/api/auth/user', {
            headers: {
              'x-auth-token': token
            }
          });

          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }

          const userData = await response.json();
          
          if (userData.success && userData.user) {
            // Store user data
            localStorage.setItem('user', JSON.stringify(userData.user));
            
            // Redirect based on user role
            setMessage('Authentification réussie! Redirection...');
            
            if (userData.user.role === 'admin') {
              setTimeout(() => {
                window.location.href = 'http://localhost:8080'; // dashboard URL
              }, 1000);
            } else {
              setTimeout(() => {
                navigate('/contact');
              }, 1000);
            }
          } else {
            throw new Error('Invalid user data');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          // If user fetch fails, still try to redirect based on basic info
          setMessage('Connexion partielle. Redirection...');
          setTimeout(() => navigate('/contact'), 1500);
        }
      } catch (error) {
        console.error('Auth processing error:', error);
        setMessage('Une erreur est survenue. Redirection vers la page de connexion...');
        setTimeout(() => navigate('/signin'), 2000);
      } finally {
        setIsProcessing(false);
      }
    };

    processAuth();
  }, [location, navigate]);

  return (
    <div className="auth-callback-container">
      <div className="auth-callback-card">
        <div className="auth-callback-content">
          {isProcessing ? (
            <div className="loading-spinner"></div>
          ) : (
            <div className="auth-callback-icon">
              {message.includes('réussie') ? '✓' : '!'}
            </div>
          )}
          <h2>{message.includes('réussie') ? 'Connexion Réussie' : 'Traitement'}</h2>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default AuthCallback;