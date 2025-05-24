// client/src/pages/admin/ContactsManagement.jsx
import React, { useState, useEffect } from 'react';
import { FaEye, FaTrash, FaEnvelope, FaFilter, FaSearch, FaCheck, FaTimes } from 'react-icons/fa';
import '../../styles/admin/ContactsManagement.css';

const ContactsManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    fetchContacts();
  }, []);
  
  const fetchContacts = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await fetch('http://localhost:5000/api/contacts', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setContacts(data.data);
      } else {
        setError(data.message || 'Erreur lors du chargement des contacts');
      }
    } catch (err) {
      console.error('Erreur fetch contacts:', err);
      setError('Erreur de connexion au serveur');
    } finally {
      setIsLoading(false);
    }
  };
  
  const updateContactStatus = async (contactId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`http://localhost:5000/api/contacts/${contactId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Mettre à jour la liste des contacts
        setContacts(contacts.map(contact => 
          contact._id === contactId 
            ? { ...contact, status: newStatus }
            : contact
        ));
        
        // Mettre à jour le contact sélectionné si c'est le même
        if (selectedContact && selectedContact._id === contactId) {
          setSelectedContact({ ...selectedContact, status: newStatus });
        }
      } else {
        alert('Erreur lors de la mise à jour du statut');
      }
    } catch (err) {
      console.error('Erreur update status:', err);
      alert('Erreur de connexion au serveur');
    }
  };
  
  const deleteContact = async (contactId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`http://localhost:5000/api/contacts/${contactId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setContacts(contacts.filter(contact => contact._id !== contactId));
        if (selectedContact && selectedContact._id === contactId) {
          setShowModal(false);
          setSelectedContact(null);
        }
      } else {
        alert('Erreur lors de la suppression');
      }
    } catch (err) {
      console.error('Erreur delete contact:', err);
      alert('Erreur de connexion au serveur');
    }
  };
  
  const openContactModal = (contact) => {
    setSelectedContact(contact);
    setShowModal(true);
    
    // Marquer comme lu si ce n'est pas déjà fait
    if (contact.status === 'nouveau') {
      updateContactStatus(contact._id, 'lu');
    }
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'nouveau': return 'status-new';
      case 'lu': return 'status-read';
      case 'en-traitement': return 'status-processing';
      case 'résolu': return 'status-resolved';
      default: return 'status-new';
    }
  };
  
  const getStatusLabel = (status) => {
    switch (status) {
      case 'nouveau': return 'Nouveau';
      case 'lu': return 'Lu';
      case 'en-traitement': return 'En traitement';
      case 'résolu': return 'Résolu';
      default: return status;
    }
  };
  
  // Filtrer les contacts
  const filteredContacts = contacts.filter(contact => {
    const matchesFilter = filter === 'all' || contact.status === filter;
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.subject.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });
  
  if (isLoading) {
    return (
      <div className="contacts-loading">
        <div className="loading-spinner"></div>
        <p>Chargement des messages...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="contacts-error">
        <p>Erreur: {error}</p>
        <button onClick={fetchContacts} className="retry-btn">
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="contacts-management">
      <div className="page-header">
        <h1>Gestion des Messages</h1>
        <p>Gérez les messages de contact reçus</p>
      </div>
      
      <div className="contacts-filters">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Rechercher par nom, email ou sujet..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-tabs">
          <button 
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Tous ({contacts.length})
          </button>
          <button 
            className={`filter-tab ${filter === 'nouveau' ? 'active' : ''}`}
            onClick={() => setFilter('nouveau')}
          >
            Nouveaux ({contacts.filter(c => c.status === 'nouveau').length})
          </button>
          <button 
            className={`filter-tab ${filter === 'lu' ? 'active' : ''}`}
            onClick={() => setFilter('lu')}
          >
            Lus ({contacts.filter(c => c.status === 'lu').length})
          </button>
          <button 
            className={`filter-tab ${filter === 'en-traitement' ? 'active' : ''}`}
            onClick={() => setFilter('en-traitement')}
          >
            En traitement ({contacts.filter(c => c.status === 'en-traitement').length})
          </button>
          <button 
            className={`filter-tab ${filter === 'résolu' ? 'active' : ''}`}
            onClick={() => setFilter('résolu')}
          >
            Résolus ({contacts.filter(c => c.status === 'résolu').length})
          </button>
        </div>
      </div>
      
      <div className="contacts-table">
        <div className="table-header">
          <h2>Messages ({filteredContacts.length})</h2>
        </div>
        
        {filteredContacts.length === 0 ? (
          <div className="no-contacts">
            <FaEnvelope size={48} />
            <h3>Aucun message trouvé</h3>
            <p>
              {searchTerm || filter !== 'all' 
                ? 'Aucun message ne correspond à vos critères de recherche.' 
                : 'Aucun message de contact reçu pour le moment.'
              }
            </p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Sujet</th>
                  <th>Statut</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.map((contact) => (
                  <tr key={contact._id}>
                    <td>
                      <div className="contact-name">
                        {contact.name}
                        {contact.company && (
                          <small>({contact.company})</small>
                        )}
                      </div>
                    </td>
                    <td>{contact.email}</td>
                    <td className="subject-cell">
                      {contact.subject}
                    </td>
                    <td>
                      <select 
                        value={contact.status}
                        onChange={(e) => updateContactStatus(contact._id, e.target.value)}
                        className={`status-select ${getStatusColor(contact.status)}`}
                      >
                        <option value="nouveau">Nouveau</option>
                        <option value="lu">Lu</option>
                        <option value="en-traitement">En traitement</option>
                        <option value="résolu">Résolu</option>
                      </select>
                    </td>
                    <td>
                      {new Date(contact.createdAt).toLocaleDateString('fr-FR')}
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="btn btn-sm btn-primary"
                          onClick={() => openContactModal(contact)}
                          title="Voir le détail"
                        >
                          <FaEye />
                        </button>
                        <button 
                          className="btn btn-sm btn-danger"
                          onClick={() => deleteContact(contact._id)}
                          title="Supprimer"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Modal de détail */}
      {showModal && selectedContact && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Détail du message</h3>
              <button 
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="contact-details">
                <div className="detail-row">
                  <strong>Nom:</strong> {selectedContact.name}
                </div>
                {selectedContact.company && (
                  <div className="detail-row">
                    <strong>Entreprise:</strong> {selectedContact.company}
                  </div>
                )}
                <div className="detail-row">
                  <strong>Email:</strong> {selectedContact.email}
                </div>
                <div className="detail-row">
                  <strong>Sujet:</strong> {selectedContact.subject}
                </div>
                <div className="detail-row">
                  <strong>Date:</strong> {new Date(selectedContact.createdAt).toLocaleString('fr-FR')}
                </div>
                <div className="detail-row">
                  <strong>Statut:</strong> 
                  <span className={`status-badge ${getStatusColor(selectedContact.status)}`}>
                    {getStatusLabel(selectedContact.status)}
                  </span>
                </div>
              </div>
              
              <div className="message-content">
                <strong>Message:</strong>
                <div className="message-text">
                  {selectedContact.message}
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <div className="status-actions">
                <button 
                  className="btn btn-success"
                  onClick={() => updateContactStatus(selectedContact._id, 'en-traitement')}
                  disabled={selectedContact.status === 'en-traitement'}
                >
                  <FaCheck /> Marquer en traitement
                </button>
                <button 
                  className="btn btn-info"
                  onClick={() => updateContactStatus(selectedContact._id, 'résolu')}
                  disabled={selectedContact.status === 'résolu'}
                >
                  <FaCheck /> Marquer résolu
                </button>
              </div>
              <button 
                className="btn btn-danger"
                onClick={() => deleteContact(selectedContact._id)}
              >
                <FaTrash /> Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactsManagement;