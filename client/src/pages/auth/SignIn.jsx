// client/src/pages/auth/SignIn.jsx - Mise à jour
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Auth.css';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [formState, setFormState] = useState({
    error: '',
    isLoading: false
  });
  
  const navigate = useNavigate();
  const location = useLocation();
  
  // Récupérer l'URL de redirection si elle existe
  const from = location.state?.from || '/';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormState(prev => ({ ...prev, error: '' }));
  };

  const validateForm = () => {
    const { email, password } = formData;
    
    if (!email) 
      return { valid: false, message: 'L\'email est requis' };
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) 
      return { valid: false, message: 'Format d\'email invalide' };
    
    if (!password) 
      return { valid: false, message: 'Le mot de passe est requis' };
    
    return { valid: true, message: '' };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validation = validateForm();
    if (!validation.valid) {
      setFormState(prev => ({ ...prev, error: validation.message }));
      return;
    }
    
    setFormState({ isLoading: true, error: '' });

    try {
      console.log('Tentative de connexion avec:', formData.email);
      
      // Utiliser fetch directement pour déboguer
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      console.log('Statut de la réponse:', response.status);
      
      // Même si le statut n'est pas 200, essayons de lire le corps
      const textResponse = await response.text();
      console.log('Réponse texte brute:', textResponse);
      
      let data;
      try {
        data = JSON.parse(textResponse);
        console.log('Réponse JSON analysée:', data);
      } catch (e) {
        console.error('Échec du parsing JSON:', e);
        throw new Error('Réponse du serveur invalide');
      }
      
      if (!response.ok) {
        throw new Error(data.message || `Erreur ${response.status}`);
      }
      
      if (data.success) {
        // Stocker le token et les infos utilisateur
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('userRole', data.user.role);
        
        console.log('Authentification réussie, redirection...');
        
        // Redirection basée sur le rôle
        if (data.user.role === 'admin' || data.user.role === 'superadmin') {
          // Rediriger vers le dashboard si c'est un admin
          navigate('/admin');
        } else {
          // Rediriger vers la page précédente ou la page d'accueil pour les utilisateurs normaux
          navigate(from !== '/admin' ? from : '/contact');
        }
      } else {
        throw new Error(data.message || 'Erreur de connexion');
      }
    } catch (error) {
      console.error('Erreur complète:', error);
      
      setFormState(prev => ({ 
        ...prev, 
        error: error.message || 'Erreur de connexion au serveur' 
      }));
    } finally {
      setFormState(prev => ({ ...prev, isLoading: false }));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="logo">
            <img src="/assets/logo.png" alt="MTPS Logo" />
          </div>
          <h1>Connexion</h1>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {formState.error && (
            <div className="error-message" role="alert">
              <span>{formState.error}</span>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Adresse email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="votre@email.com"
              disabled={formState.isLoading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <div className="password-input">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                disabled={formState.isLoading}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(prev => !prev)}
                disabled={formState.isLoading}
                aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={formState.isLoading}
          >
            {formState.isLoading ? (
              <>
                <span className="spinner"></span>
                <span>Connexion en cours...</span>
              </>
            ) : (
              'Se connecter'
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Pas encore de compte ?{' '}
            <Link to="/signup" className="auth-link">
              Créer un compte
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;