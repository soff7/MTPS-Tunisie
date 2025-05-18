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

  // Gestionnaire de changement optimisé
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  }, [error]);

  // Validation du formulaire
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

    if (!email) {
      setError('L\'email est requis');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
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

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setError('');

    try {
      const { name, email, password } = formData;
      const response = await authService.register({ 
        name: name.trim(), 
        email, 
        password 
      });
      
      const { role } = response.data;
      navigate(role === 'user' ? '/contact' : '/dashboard');
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      
      // Message d'erreur amélioré
      setError(
        error.response?.data?.message || 
        error.message || 
        'Erreur lors de la création du compte. Veuillez réessayer.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Vérification si les mots de passe correspondent
  const passwordsMatch = formData.password && 
                         formData.confirmPassword && 
                         formData.password === formData.confirmPassword;

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
         
          <h1>Créer un compte</h1>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
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
                <small>
                  ✓ Au moins 6 caractères
                  {formData.password.length >= 6 && <span className="valid"> ✓</span>}
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
            disabled={isLoading || !passwordsMatch}
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