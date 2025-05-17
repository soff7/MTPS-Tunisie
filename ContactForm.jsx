import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ContactForm.css'; // Assurez-vous d'avoir ce fichier CSS pour le style

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    companyName: '', // Changé de "company" à "companyName" pour correspondre au modèle
    email: '',
    subject: '', // Valeur par défaut vide
    otherSubject: '', // Pour le champ "Autre"
    message: ''
  });
  
  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
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
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="companyName">Nom de l'entreprise</label>
          <input
            type="text"
            id="companyName"
            name="companyName" // Changé de "company" à "companyName"
            value={formData.companyName}
            onChange={handleChange}
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