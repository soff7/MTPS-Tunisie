import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../utils/api';
import './Auth.css';

const SignIn = () => {
  // Utilisation de l'état groupé pour des données liées
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  // État séparé pour les paramètres d'interface utilisateur
  const [showPassword, setShowPassword] = useState(false);
  
  // État séparé pour les états du formulaire
  const [formState, setFormState] = useState({
    error: '',
    isLoading: false
  });
  
  const navigate = useNavigate();

  // Gestionnaire de changement optimisé
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormState(prev => ({ ...prev, error: '' }));
  }, []);

  // Validation du formulaire améliorée
  const validateForm = useCallback(() => {
    const { email, password } = formData;
    
    if (!email) 
      return { valid: false, message: 'L\'email est requis' };
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) 
      return { valid: false, message: 'Format d\'email invalide' };
    
    if (!password) 
      return { valid: false, message: 'Le mot de passe est requis' };
    
    return { valid: true, message: '' };
  }, [formData]);

  // Gestionnaire de soumission amélioré avec structure try/catch/finally
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validation = validateForm();
    if (!validation.valid) {
      setFormState(prev => ({ ...prev, error: validation.message }));
      return;
    }
    
    setFormState({ isLoading: true, error: '' });

    try {
      const { email, password } = formData;
      const response = await authService.login({ email, password });
      const { role } = response.data;
      
      // Navigation plus claire
      navigate(role === 'user' ? '/contact' : '/dashboard');
    } catch (error) {
      console.error('Erreur de connexion:', error);
      
      // Message d'erreur amélioré avec fallbacks
      const errorMessage = 
        error.response?.data?.message || 
        error.message || 
        'Erreur de connexion. Veuillez vérifier vos identifiants.';
      
      setFormState(prev => ({ ...prev, error: errorMessage }));
    } finally {
      setFormState(prev => ({ ...prev, isLoading: false }));
    }
  };

  // Validation du bouton de connexion
  const isFormValid = formData.email && formData.password;

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          
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
                autoComplete="current-password"
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
            disabled={formState.isLoading || !isFormValid}
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
          <Link to="/forgot-password" className="auth-link">
            Mot de passe oublié ?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;