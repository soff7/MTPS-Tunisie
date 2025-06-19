import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaReply, FaTrash, FaSpinner, FaRedo, FaEye, FaCheck, FaClock, FaUser, FaBuilding, FaEnvelope, FaCalendarAlt } from 'react-icons/fa';

// Styled Components
const ContactsContainer = styled.div`
  background-color: #f9fafb;
  color: #1e293b;
  padding: 2rem;
  min-height: calc(100vh - var(--header-height, 60px));
`;

const ContactsTitle = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 600;
  position: relative;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const StatCard = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
`;

const StatNumber = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: ${props => props.color || '#3b82f6'};
`;

const StatLabel = styled.div`
  color: #6b7280;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background-color: ${props => props.active ? '#3b82f6' : '#ffffff'};
  color: ${props => props.active ? '#ffffff' : '#4b5563'};
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;

  &:hover {
    background-color: ${props => props.active ? '#2563eb' : '#f3f4f6'};
    border-color: ${props => props.active ? '#2563eb' : '#9ca3af'};
  }
`;

const ContactsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContactCard = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 1.25rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
`;

const ContactHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const ContactInfo = styled.div`
  flex: 1;
  min-width: 250px;
`;

const ContactName = styled.h3`
  font-size: 1.1rem;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
`;

const ContactDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.9rem;
  color: #6b7280;
`;

const ContactDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ContactStatus = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
`;

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  background-color: ${props =>
    props.status === 'Pending' ? 'rgba(245, 158, 11, 0.1)' : 
    props.status === 'Replied' ? 'rgba(16, 185, 129, 0.1)' :
    'rgba(59, 130, 246, 0.1)'};
  color: ${props =>
    props.status === 'Pending' ? '#d97706' : 
    props.status === 'Replied' ? '#059669' :
    '#2563eb'};
`;

const ContactSubject = styled.div`
  background-color: rgba(59, 130, 246, 0.05);
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  border-left: 3px solid #3b82f6;
`;

const SubjectTitle = styled.h4`
  margin: 0;
  color: #1e40af;
  font-size: 0.95rem;
`;

const ContactMessage = styled.div`
  background-color: #f9fafb;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  border: 1px solid #e5e7eb;
`;

const MessageLabel = styled.h4`
  margin: 0 0 0.5rem 0;
  color: #1e293b;
  font-size: 0.9rem;
`;

const MessageText = styled.p`
  color: #4b5563;
  margin: 0;
  line-height: 1.6;
  white-space: pre-wrap;
`;

const ReplySection = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background-color: rgba(16, 185, 129, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(16, 185, 129, 0.1);
`;

const ReplyTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-family: inherit;
  resize: vertical;
  min-height: 120px;
  font-size: 0.9rem;
  background-color: #ffffff;
  color: #1e293b;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const ExistingReply = styled.div`
  background-color: rgba(16, 185, 129, 0.05);
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  border-left: 3px solid #10b981;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  flex-wrap: wrap;
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  background-color: #f3f4f6;
  color: #4b5563;
  font-size: 0.9rem;
  border: 1px solid #d1d5db;

  &:hover:not(:disabled) {
    background-color: #e5e7eb;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ReplyButton = styled(Button)`
  background-color: #3b82f6;
  color: white;
  border-color: #3b82f6;

  &:hover:not(:disabled) {
    background-color: #2563eb;
    border-color: #2563eb;
  }
`;

const MarkReadButton = styled(Button)`
  background-color: #10b981;
  color: white;
  border-color: #10b981;

  &:hover:not(:disabled) {
    background-color: #059669;
    border-color: #059669;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #ef4444;
  color: white;
  border-color: #ef4444;

  &:hover:not(:disabled) {
    background-color: #dc2626;
    border-color: #dc2626;
  }
`;

const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: #6b7280;
  font-size: 1rem;
`;

const ErrorDiv = styled.div`
  color: #dc2626;
  padding: 1rem;
  background-color: rgba(239, 68, 68, 0.1);
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
  border: 1px solid rgba(239, 68, 68, 0.2);
`;

const NoData = styled.div`
  color: #6b7280;
  padding: 2rem;
  text-align: center;
  font-size: 1rem;
`;

const AuthWarning = styled.div`
  background-color: rgba(245, 158, 11, 0.1);
  border: 1px solid rgba(245, 158, 11, 0.3);
  color: #b45309;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
`;

const ContactsManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reply, setReply] = useState({});
  const [filter, setFilter] = useState('all');
  const [actionLoading, setActionLoading] = useState({});

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  // Vérification du token
  const isTokenValid = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp > currentTime;
    } catch (tokenError) {
      return false;
    }
  };

  // Obtenir les en-têtes d'authentification
  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token d\'authentification manquant');
    }
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  // Gérer les erreurs d'authentification
  const handleAuthError = (error, response) => {
    if (response && (response.status === 401 || response.status === 403)) {
      setError(`Erreur d'authentification (${response.status}). Veuillez vous reconnecter.`);
      return true;
    }
    return false;
  };

  // Vérification initiale du token et chargement des contacts
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const userRole = localStorage.getItem('userRole');

    if (!token) {
      setLoading(false);
      setError('Aucun token d\'authentification trouvé. Veuillez vous reconnecter.');
      return;
    }

    if (!isTokenValid()) {
      setLoading(false);
      setError('Token expiré. Veuillez vous reconnecter.');
      return;
    }

    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const headers = getAuthHeaders();
      
      const res = await fetch(`${API_BASE_URL}/api/contacts`, {
        method: 'GET',
        headers,
        credentials: 'include'
      });
      
      if (!res.ok) {
        if (handleAuthError(null, res)) {
          return;
        }
        throw new Error(`Erreur HTTP! Status: ${res.status}`);
      }
      
      const data = await res.json();
      
      if (!Array.isArray(data)) {
        throw new Error('Format de données invalide: un tableau était attendu');
      }
      
      setContacts(data);
    } catch (err) {
      console.error('Erreur lors du chargement des contacts:', err);
      setError(`Erreur: ${err.message}. Vérifiez la connexion API.`);
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async (contactId) => {
    try {
      if (!reply[contactId] || reply[contactId].trim() === '') {
        throw new Error('Veuillez saisir une réponse avant de l\'envoyer');
      }
      
      setActionLoading(prev => ({ ...prev, [`reply-${contactId}`]: true }));
      const headers = getAuthHeaders();

      const res = await fetch(`${API_BASE_URL}/api/contacts/${contactId}/reply`, {
        method: 'PUT',
        headers,
        credentials: 'include',
        body: JSON.stringify({ reply: reply[contactId] }),
      });
      
      if (!res.ok) {
        if (handleAuthError(null, res)) {
          return;
        }
        throw new Error(`Échec de l\'envoi de la réponse. Status: ${res.status}`);
      }
      
      const updatedContact = await res.json();
      setContacts(prevContacts =>
        prevContacts.map(c => (c._id === contactId ? updatedContact : c))
      );
      setReply(prev => ({ ...prev, [contactId]: '' }));
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(prev => ({ ...prev, [`reply-${contactId}`]: false }));
    }
  };

  const handleMarkAsRead = async (contactId) => {
    try {
      setActionLoading(prev => ({ ...prev, [`read-${contactId}`]: true }));
      const headers = getAuthHeaders();

      const res = await fetch(`${API_BASE_URL}/api/contacts/${contactId}/mark-read`, {
        method: 'PUT',
        headers,
        credentials: 'include',
      });
      
      if (!res.ok) {
        if (handleAuthError(null, res)) {
          return;
        }
        throw new Error(`Échec du marquage comme lu. Status: ${res.status}`);
      }
      
      const updatedContact = await res.json();
      setContacts(prevContacts =>
        prevContacts.map(c => (c._id === contactId ? updatedContact : c))
      );
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(prev => ({ ...prev, [`read-${contactId}`]: false }));
    }
  };

  const handleDelete = async (contactId) => {
    try {
      if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce contact ?')) {
        return;
      }

      setActionLoading(prev => ({ ...prev, [`delete-${contactId}`]: true }));
      const headers = getAuthHeaders();

      const res = await fetch(`${API_BASE_URL}/api/contacts/${contactId}`, {
        method: 'DELETE',
        headers,
        credentials: 'include',
      });
      
      if (!res.ok) {
        if (handleAuthError(null, res)) {
          return;
        }
        throw new Error(`Échec de la suppression du contact. Status: ${res.status}`);
      }
      
      setContacts(prevContacts =>
        prevContacts.filter(c => c._id !== contactId)
      );
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(prev => ({ ...prev, [`delete-${contactId}`]: false }));
    }
  };

  const handleReplyChange = (contactId, value) => {
    setReply(prev => ({ ...prev, [contactId]: value }));
  };

  const handleManualLogin = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    localStorage.removeItem('refreshToken');
    window.location.href = '/signin';
  };

  const getFilteredContacts = () => {
    if (filter === 'all') return contacts;
    return contacts.filter(contact => contact.status === filter);
  };

  const getStats = () => {
    const pending = contacts.filter(c => c.status === 'Pending').length;
    const replied = contacts.filter(c => c.status === 'Replied').length;
    const read = contacts.filter(c => c.status === 'Read').length;
    return { pending, replied, read, total: contacts.length };
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return <FaClock />;
      case 'Replied': return <FaReply />;
      case 'Read': return <FaEye />;
      default: return <FaClock />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'Pending': return 'En attente';
      case 'Replied': return 'Répondu';
      case 'Read': return 'Lu';
      default: return status;
    }
  };

  const stats = getStats();
  const filteredContacts = getFilteredContacts();

  return (
    <ContactsContainer>
      <ContactsTitle>
        <FaEnvelope />
        Gestion des Contacts
      </ContactsTitle>

      {error && (
        <AuthWarning>
          <div style={{ marginBottom: '1rem' }}>
            ⚠️ {error}
          </div>
          <div>
            <Button onClick={handleManualLogin}>
              Se reconnecter
            </Button>
            <Button onClick={fetchContacts} style={{ marginLeft: '1rem' }}>
              Réessayer
            </Button>
          </div>
        </AuthWarning>
      )}

      <StatsContainer>
        <StatCard>
          <StatNumber color="#d97706">{stats.pending}</StatNumber>
          <StatLabel>En attente</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber color="#059669">{stats.replied}</StatNumber>
          <StatLabel>Répondu</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber color="#2563eb">{stats.read}</StatNumber>
          <StatLabel>Lu</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{stats.total}</StatNumber>
          <StatLabel>Total</StatLabel>
        </StatCard>
      </StatsContainer>

      <FilterContainer>
        <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>
          Tous ({stats.total})
        </FilterButton>
        <FilterButton active={filter === 'Pending'} onClick={() => setFilter('Pending')}>
          En attente ({stats.pending})
        </FilterButton>
        <FilterButton active={filter === 'Replied'} onClick={() => setFilter('Replied')}>
          Répondu ({stats.replied})
        </FilterButton>
        <FilterButton active={filter === 'Read'} onClick={() => setFilter('Read')}>
          Lu ({stats.read})
        </FilterButton>
      </FilterContainer>

      {loading && <Loading><FaSpinner className="spin" /> Chargement...</Loading>}
      {!loading && !filteredContacts.length && <NoData>Aucun contact trouvé.</NoData>}
      {!loading && filteredContacts.length > 0 && (
        <ContactsList>
          {filteredContacts.map(contact => (
            <ContactCard key={contact._id}>
              <ContactHeader>
                <ContactInfo>
                  <ContactName>
                    <FaUser /> {contact.name}
                  </ContactName>
                  <ContactDetails>
                    {contact.companyName && (
                      <ContactDetail>
                        <FaBuilding /> {contact.companyName}
                      </ContactDetail>
                    )}
                    <ContactDetail>
                      <FaEnvelope /> {contact.email}
                    </ContactDetail>
                    <ContactDetail>
                      <FaCalendarAlt /> {formatDate(contact.createdAt)}
                    </ContactDetail>
                  </ContactDetails>
                </ContactInfo>
                <ContactStatus>
                  <StatusBadge status={contact.status}>
                    {getStatusIcon(contact.status)} {getStatusText(contact.status)}
                  </StatusBadge>
                </ContactStatus>
              </ContactHeader>
              <ContactSubject>
                <SubjectTitle>Sujet: {contact.subject}</SubjectTitle>
              </ContactSubject>
              <ContactMessage>
                <MessageLabel>Message:</MessageLabel>
                <MessageText>{contact.message}</MessageText>
              </ContactMessage>
              {contact.reply && (
                <ExistingReply>
                  <MessageLabel>Réponse:</MessageLabel>
                  <MessageText>{contact.reply}</MessageText>
                </ExistingReply>
              )}
              {!contact.reply && (
                <ReplySection>
                  <ReplyTextarea
                    value={reply[contact._id] || ''}
                    onChange={(e) => handleReplyChange(contact._id, e.target.value)}
                    placeholder="Tapez votre réponse..."
                  />
                  <ActionButtons>
                    <ReplyButton
                      onClick={() => handleReply(contact._id)}
                      disabled={actionLoading[`reply-${contact._id}`]}
                    >
                      {actionLoading[`reply-${contact._id}`] ? <FaSpinner className="spin" /> : <FaReply />}
                      Répondre
                    </ReplyButton>
                    <MarkReadButton
                      onClick={() => handleMarkAsRead(contact._id)}
                      disabled={actionLoading[`read-${contact._id}`]}
                    >
                      {actionLoading[`read-${contact._id}`] ? <FaSpinner className="spin" /> : <FaEye />}
                      Marquer comme lu
                    </MarkReadButton>
                    <DeleteButton
                      onClick={() => handleDelete(contact._id)}
                      disabled={actionLoading[`delete-${contact._id}`]}
                    >
                      {actionLoading[`delete-${contact._id}`] ? <FaSpinner className="spin" /> : <FaTrash />}
                      Supprimer
                    </DeleteButton>
                  </ActionButtons>
                </ReplySection>
              )}
            </ContactCard>
          ))}
        </ContactsList>
      )}
    </ContactsContainer>
  );
};

export default ContactsManagement;