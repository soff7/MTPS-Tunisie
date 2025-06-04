import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ContactForm.css';

const ContactForm = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    subject: '',
    otherSubject: '',
    message: ''
  });
  
  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null
  });

  // Vérifier l'authentification et le rôle au montage du composant
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    
    setIsAuthenticated(!!token);
    // Vérifier pour les rôles admin ET superadmin
    setIsAdmin(userRole === 'admin' || userRole === 'superadmin');
    
    if (token && userRole !== 'admin' && userRole !== 'superadmin') {
      const savedFormData = JSON.parse(localStorage.getItem('pendingContactForm') || '{}');
      if (Object.keys(savedFormData).length > 0) {
        setFormData(savedFormData);
        localStorage.removeItem('pendingContactForm');
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const saveFormDataAndRedirect = () => {
    localStorage.setItem('pendingContactForm', JSON.stringify(formData));
    window.location.href = '/signup';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Vérifier si l'utilisateur est un admin ou superadmin
    if (isAdmin) {
      setStatus({
        submitting: false,
        success: false,
        error: 'Accès refusé : En tant qu\'administrateur, vous n\'êtes pas autorisé à envoyer des messages via ce formulaire de contact.'
      });
      return;
    }
    
    if (!isAuthenticated) {
      saveFormDataAndRedirect();
      return;
    }
    
    if (formData.message.length < 10) {
      setStatus({
        submitting: false,
        success: false,
        error: 'Le message doit contenir au moins 10 caractères'
      });
      return;
    }
    
    setStatus({
      submitting: true,
      success: false,
      error: null
    });
    
    try {
      console.log('Données à envoyer:', formData);
      
      // Configuration axios avec timeout
      const response = await axios.post(
        'http://localhost:5000/api/contacts', 
        formData,
        {
          timeout: 10000, // 10 secondes timeout
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      console.log('Réponse du serveur:', response.data);
      
      if (response.data.success) {
        setStatus({
          submitting: false,
          success: true,
          error: null
        });
        
        // Réinitialiser le formulaire après succès
        setFormData({
          name: '',
          companyName: '',
          email: '',
          subject: '',
          otherSubject: '',
          message: ''
        });
      }
    } catch (err) {
      console.error('Erreur lors de l\'envoi:', err);
      
      let errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
      
      if (err.code === 'ECONNABORTED') {
        errorMessage = 'Timeout - Le serveur met trop de temps à répondre. Vérifiez votre connexion.';
      } else if (err.code === 'ERR_NETWORK') {
        errorMessage = 'Erreur réseau - Impossible de joindre le serveur. Vérifiez que le serveur backend est démarré.';
      } else if (err.response?.status === 500) {
        errorMessage = 'Erreur serveur interne. Contactez l\'administrateur.';
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }
      
      setStatus({
        submitting: false,
        success: false,
        error: errorMessage
      });
    }
  };

  return (
    <div className="contact-form">
      <h2>Contactez-nous</h2>
      
      {!isAuthenticated && (
        <div className="auth-alert">
          Vous devez être connecté pour envoyer un message.
        </div>
      )}
      
      {isAdmin && (
        <div className="admin-alert" style={{
          backgroundColor: '#f8d7da',
          color: '#721c24',
          padding: '12px',
          borderRadius: '5px',
          border: '1px solid #f5c6cb',
          marginBottom: '20px',
          fontWeight: 'bold'
        }}>
          ⚠️ Accès refusé : En tant qu'administrateur, vous n'êtes pas autorisé à utiliser ce formulaire de contact.
        </div>
      )}
      
      {isAuthenticated && !isAdmin && status.error && (
        <div className="error-message">
          {status.error}
        </div>
      )}
      
      {isAuthenticated && !isAdmin && status.success && (
        <div className="success-message">
          Votre message a été envoyé avec succès!
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nom*</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!isAuthenticated || isAdmin}
            required
            placeholder="Votre nom complet"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="companyName">Nom de l'entreprise</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            disabled={!isAuthenticated || isAdmin}
            placeholder="Nom de votre entreprise (optionnel)"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Adresse E-mail*</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!isAuthenticated || isAdmin}
            required
            placeholder="votre.email@exemple.com"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="subject">Sujet*</label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            disabled={!isAuthenticated || isAdmin}
            required
          >
            <option value="">Choisir un sujet</option>
            <option value="QuestionTechnique">Question Technique</option>
            <option value="Partenariat">Partenariat</option>
            <option value="autre">Autre</option>
          </select>
        </div>

        {formData.subject === 'autre' && (
          <div className="form-group">
            <label htmlFor="otherSubject">Précisez le sujet*</label>
            <input
              type="text"
              id="otherSubject"
              name="otherSubject"
              value={formData.otherSubject}
              onChange={handleChange}
              disabled={!isAuthenticated || isAdmin}
              required
              placeholder="Décrivez brièvement votre sujet"
            />
          </div>
        )}
        
        <div className="form-group">
          <label htmlFor="message">Message* (10 caractères minimum)</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            disabled={!isAuthenticated || isAdmin}
            rows="6"
            required
            minLength="10"
            placeholder="Votre message détaillé..."
          />
          <div className="character-count">
            {formData.message.length}/10 caractères minimum
          </div>
        </div>
        
        <button 
          type="submit" 
          disabled={!isAuthenticated || status.submitting || isAdmin}
          className="submit-btn"
        >
          {!isAuthenticated 
            ? 'Connectez-vous pour envoyer' 
            : isAdmin
              ? 'Accès refusé (Admin)'
              : status.submitting 
                ? 'Envoi en cours...' 
                : 'Envoyer le message'
          }
        </button>
      </form>
    </div>
  );
};

export default ContactForm;