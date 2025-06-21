import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../utils/api';
import './Auth.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  }, [error]);

  const validateForm = () => {
    const { name, email, password, confirmPassword } = formData;
    
    if (!name.trim()) {
      setError('Le nom est requis');
      return false;
    }
    
    if (name.trim().length < 2) {
      setError('Le nom doit contenir au moins 2 caractères');
      return false;
    }

    if (!email.trim()) {
      setError('L\'email est requis');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError('Format d\'email invalide');
      return false;
    }

    if (!password) {
      setError('Le mot de passe est requis');
      return false;
    }

    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return false;
    }

    if (!confirmPassword) {
      setError('La confirmation du mot de passe est requise');
      return false;
    }

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setError('');

    try {
      const { name, email, password } = formData;
      
      const userData = { 
        name: name.trim(), 
        email: email.trim().toLowerCase(), 
        password 
      };
      
      const response = await authService.register(userData);
      
      if (!response.data) {
        throw new Error('Réponse serveur invalide');
      }

      if (response.data.success === false) {
        throw new Error(response.data.message || 'Échec de l\'inscription');
      }

      // Stockage des données d'authentification
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      if (response.data.refreshToken) {
        localStorage.setItem('refreshToken', response.data.refreshToken);
      }
      
      if (response.data.user.role) {
        localStorage.setItem('userRole', response.data.user.role);
      }

      navigate('/contact', { replace: true });
      
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      
      let errorMessage = 'Erreur lors de la création du compte';
      
      if (error.response) {
        // Erreur provenant du serveur
        const serverMessage = error.response.data?.message;
        
        if (error.response.status === 400) {
          errorMessage = serverMessage || 'Données invalides';
        } else if (error.response.status === 409) {
          errorMessage = 'Cet email est déjà utilisé';
        } else if (error.response.status === 500) {
          errorMessage = 'Erreur serveur. Veuillez réessayer plus tard';
        } else {
          errorMessage = serverMessage || `Erreur ${error.response.status}`;
        }
      } else if (error.request) {
        // Pas de réponse du serveur
        errorMessage = 'Le serveur ne répond pas. Vérifiez votre connexion';
      } else {
        // Erreur de configuration
        errorMessage = error.message || errorMessage;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const passwordsMatch = formData.password && 
                       formData.confirmPassword && 
                       formData.password === formData.confirmPassword;

  const isFormValid = passwordsMatch && 
                     formData.name.trim().length >= 2 && 
                     formData.email.trim() && 
                     formData.password.length >= 6;

  return (
    <div className="auth-container">
      <nav className="auth-navbar">
        <Link to="/" className="logo">
          <img src="/assets/logo.png" alt="Logo" />
        </Link>
      </nav>

      <div className="auth-card">
        <div className="auth-header">
          <h1>Créer un compte</h1>
        </div>

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          {error && (
            <div className="error-message" role="alert">
              <span>{error}</span>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="name">Nom complet</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Votre nom complet"
              disabled={isLoading}
              required
              minLength={2}
              maxLength={100}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Adresse email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="votre@email.com"
              disabled={isLoading}
              required
              maxLength={255}
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
                disabled={isLoading}
                required
                minLength={6}
                maxLength={128}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            
            {formData.password && (
              <div className="password-info">
                <small className={formData.password.length >= 6 ? 'valid' : ''}>
                  {formData.password.length >= 6 ? '✓' : '○'} Au moins 6 caractères
                </small>
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
            <div className="password-input">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                disabled={isLoading}
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isLoading}
                aria-label={showConfirmPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
              >
                {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            
            {formData.confirmPassword && (
              <div className={`password-match ${passwordsMatch ? 'valid' : 'invalid'}`}>
                <small>
                  {passwordsMatch ? (
                    <>✓ Les mots de passe correspondent</>
                  ) : (
                    <>✗ Les mots de passe ne correspondent pas</>
                  )}
                </small>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={isLoading || !isFormValid}
            aria-describedby={error ? "error-message" : undefined}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                <span>Création du compte...</span>
              </>
            ) : (
              'Créer un compte'
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Déjà un compte ?{' '}
            <Link to="/signin" className="auth-link">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;