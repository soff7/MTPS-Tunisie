import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/ContactForm.css';

const ContactForm = ({ isAuthenticated }) => {
  const navigate = useNavigate();
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

  // Charger les données sauvegardées si elles existent
  useEffect(() => {
    const savedFormData = localStorage.getItem('contactFormData');
    if (savedFormData && isAuthenticated) {
      setFormData(JSON.parse(savedFormData));
      localStorage.removeItem('contactFormData');
    }
  }, [isAuthenticated]);

  const handleChange = (e) => {
    if (!isAuthenticated) return;
    
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      // Sauvegarder les données du formulaire
      localStorage.setItem('contactFormData', JSON.stringify(formData));
      // Rediriger vers la page d'inscription
      navigate('/signup');
      return;
    }
    
    // Vérification que le message a au moins 10 caractères
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
      
      const response = await axios.post(
        'http://localhost:5000/api/contacts', 
        formData
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
          subject: 'Demande de devis',
          message: ''
        });
      }
    } catch (err) {
      console.error('Erreur lors de l\'envoi:', err);
      
      const errorMessage = err.response?.data?.message || 'Une erreur est survenue. Veuillez réessayer.';
      
      setStatus({
        submitting: false,
        success: false,
        error: errorMessage
      });
    }
  };

  return (
    <div className="contact-form-container">
      <h2>Contactez-nous</h2>
      
      {!isAuthenticated && (
        <div className="auth-warning">
          ⚠️ Vous devez être connecté pour envoyer un message.
        </div>
      )}
      
      {status.error && (
        <div className="error-message">
          ⚠️ {status.error}
        </div>
      )}
      
      {status.success && (
        <div className="success-message">
          ✓ Votre message a été envoyé avec succès!
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
            required
            disabled={!isAuthenticated}
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
            disabled={!isAuthenticated}
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
            required
            disabled={!isAuthenticated}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="subject">Sujet*</label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            disabled={!isAuthenticated}
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
              required
              disabled={!isAuthenticated}
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
            rows="6"
            required
            minLength="10"
            disabled={!isAuthenticated}
          ></textarea>
        </div>
        
        <div className="button-container">
          <button 
            type="submit" 
            disabled={status.submitting}
            className="cta-button"
          >
            {status.submitting ? 'Envoi en cours...' : 'Envoyer le message'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;