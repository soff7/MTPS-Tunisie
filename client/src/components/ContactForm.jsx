import React, { useState, useEffect } from 'react';
import { contactService } from '../../src/utils/api';
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

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    
    setIsAuthenticated(!!token);
    setIsAdmin(userRole === 'admin' || userRole === 'superadmin');
    
    if (token && !isAdmin) {
      const savedFormData = JSON.parse(localStorage.getItem('pendingContactForm') || '{}');
      if (Object.keys(savedFormData).length > 0) {
        setFormData(savedFormData);
        localStorage.removeItem('pendingContactForm');
      }
    }
  }, [isAdmin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveFormDataAndRedirect = () => {
    localStorage.setItem('pendingContactForm', JSON.stringify(formData));
    window.location.href = '/signup';
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      return 'Tous les champs obligatoires doivent être remplis';
    }
    if (formData.subject === 'autre' && !formData.otherSubject) {
      return 'Veuillez préciser votre sujet';
    }
    if (formData.message.length < 10) {
      return 'Le message doit contenir au moins 10 caractères';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isAdmin) {
      setStatus({
        submitting: false,
        success: false,
        error: 'Accès refusé : En tant qu\'administrateur, vous n\'êtes pas autorisé à envoyer des messages via ce formulaire.'
      });
      return;
    }
    
    if (!isAuthenticated) {
      saveFormDataAndRedirect();
      return;
    }

    const validationError = validateForm();
    if (validationError) {
      setStatus({
        submitting: false,
        success: false,
        error: validationError
      });
      return;
    }
    
    setStatus({ submitting: true, success: false, error: null });
    
    try {
      const finalData = {
        ...formData,
        subject: formData.subject === 'autre' ? formData.otherSubject : formData.subject
      };
      
      await contactService.createContact(finalData);
      
      setStatus({ submitting: false, success: true, error: null });
      setFormData({
        name: '',
        companyName: '',
        email: '',
        subject: '',
        otherSubject: '',
        message: ''
      });
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                         err.message || 
                         'Une erreur est survenue. Veuillez réessayer.';
      
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
        <div className="admin-alert">
          ⚠️ Accès refusé : En tant qu'administrateur, vous n'êtes pas autorisé à utiliser ce formulaire.
        </div>
      )}
      
      {status.error && (
        <div className="error-message">
          {status.error}
        </div>
      )}
      
      {status.success && (
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