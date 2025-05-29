// client/src/pages/admin/ContactsManagement.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaEye, FaTrash, FaEnvelope, FaSearch, FaCheck, FaTimes } from 'react-icons/fa';

// --- Variables CSS (à adapter si vous avez un fichier de variables global) ---
// Ces variables devraient être centralisées dans un fichier de thème global
// pour l'administration et importées ici. Pour l'exemple, je les inclue localement.
const adminVars = {
  '--admin-primary': '#2563eb',
  '--admin-primary-dark': '#1d4ed8',
  '--admin-secondary': '#64748b',
  '--admin-success': '#10b981',
  '--admin-warning': '#f59e0b',
  '--admin-danger': '#ef4444',
  '--admin-info': '#06b6d4',
  
  '--admin-bg': '#f8fafc',
  '--admin-card-bg': '#ffffff',
  '--admin-border': '#e2e8f0',
  
  '--admin-text-primary': '#1e293b',
  '--admin-text-secondary': '#64748b',
  '--admin-shadow-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  '--admin-shadow-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
};

const getVar = (name) => adminVars[name];

// --- Styled Components pour ContactsManagement ---

const ContactsManagementContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 0;
  }
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;

  h1 {
    font-size: 2rem;
    font-weight: 700;
    color: ${getVar('--admin-text-primary')};
    margin: 0 0 0.5rem 0;
  }

  p {
    color: ${getVar('--admin-text-secondary')};
    font-size: 1rem;
    margin: 0;
  }

  @media (max-width: 480px) {
    h1 {
      font-size: 1.5rem;
    }
  }
`;

const ContactsFilters = styled.div`
  background: ${getVar('--admin-card-bg')};
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: ${getVar('--admin-shadow-sm')};
  border: 1px solid ${getVar('--admin-border')};

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const SearchBox = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
  max-width: 400px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid ${getVar('--admin-border')};
  border-radius: 8px;
  font-size: 0.875rem;
  background: ${getVar('--admin-bg')};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${getVar('--admin-primary')};
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${getVar('--admin-text-secondary')};
  font-size: 0.875rem;
`;

const FilterTabs = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const FilterTab = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid ${getVar('--admin-border')};
  background: ${getVar('--admin-bg')};
  color: ${getVar('--admin-text-primary')};
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: ${getVar('--admin-border')};
  }

  &.active {
    background: ${getVar('--admin-primary')};
    color: white;
    border-color: ${getVar('--admin-primary')};
  }
`;

const ContactsTableContainer = styled.div`
  background: ${getVar('--admin-card-bg')};
  border-radius: 12px;
  box-shadow: ${getVar('--admin-shadow-sm')};
  border: 1px solid ${getVar('--admin-border')};
  overflow: hidden;
`;

const TableHeader = styled.div`
  background: ${getVar('--admin-bg')};
  padding: 1.5rem;
  border-bottom: 1px solid ${getVar('--admin-border')};

  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: ${getVar('--admin-text-primary')};
    margin: 0;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const TableWrapper = styled.div`
  overflow-x: auto;
`;

const DataTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 1rem 1.5rem;
    text-align: left;
    border-bottom: 1px solid ${getVar('--admin-border')};
  }

  th {
    background: ${getVar('--admin-bg')};
    font-size: 0.875rem;
    font-weight: 600;
    color: ${getVar('--admin-text-secondary')};
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  td {
    font-size: 0.875rem;
    color: ${getVar('--admin-text-primary')};
  }

  tbody tr:hover {
    background: ${getVar('--admin-bg')};
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  @media (max-width: 1200px) {
    th, td {
      padding: 0.75rem;
    }
  }
  @media (max-width: 768px) {
    th, td {
      padding: 0.5rem;
      font-size: 0.75rem;
    }
  }
`;

const ContactName = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  small {
    color: ${getVar('--admin-text-secondary')};
    font-size: 0.75rem;
  }

  @media (max-width: 768px) {
    small {
      display: none;
    }
  }
`;

const SubjectCell = styled.td`
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 1200px) {
    max-width: 150px;
  }
  @media (max-width: 768px) {
    max-width: 100px;
  }
`;

const StatusSelect = styled.select`
  padding: 0.25rem 0.5rem;
  border: 1px solid ${getVar('--admin-border')};
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  background: ${getVar('--admin-card-bg')};

  &.status-new {
    background: rgba(239, 68, 68, 0.1);
    color: ${getVar('--admin-danger')};
    border-color: ${getVar('--admin-danger')};
  }

  &.status-read {
    background: rgba(16, 185, 129, 0.1);
    color: ${getVar('--admin-success')};
    border-color: ${getVar('--admin-success')};
  }

  &.status-processing {
    background: rgba(245, 158, 11, 0.1);
    color: ${getVar('--admin-warning')};
    border-color: ${getVar('--admin-warning')};
  }

  &.status-resolved {
    background: rgba(6, 182, 212, 0.1);
    color: ${getVar('--admin-info')};
    border-color: ${getVar('--admin-info')};
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  min-width: 32px;
  height: 32px;

  &.btn-sm {
    padding: 0.375rem;
    min-width: 28px;
    height: 28px;
  }

  &.btn-primary {
    background: ${getVar('--admin-primary')};
    color: white;
    &:hover {
      background: ${getVar('--admin-primary-dark')};
    }
  }

  &.btn-danger {
    background: ${getVar('--admin-danger')};
    color: white;
    &:hover {
      background: #dc2626; /* A hardcoded color from original CSS */
    }
  }

  &.btn-success {
    background: ${getVar('--admin-success')};
    color: white;
    &:hover {
      background: #059669; /* A hardcoded color from original CSS */
    }
  }

  &.btn-info {
    background: ${getVar('--admin-info')};
    color: white;
    &:hover {
      background: #0891b2; /* A hardcoded color from original CSS */
    }
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const NoContacts = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: ${getVar('--admin-text-secondary')};

  svg {
    color: ${getVar('--admin-border')};
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.25rem;
    color: ${getVar('--admin-text-primary')};
    margin: 1rem 0 0.5rem 0;
  }

  p {
    margin: 0;
    line-height: 1.6;
  }
`;

const ContactsLoading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  gap: 1rem;
  background: ${getVar('--admin-card-bg')};
  border-radius: 12px;
  box-shadow: ${getVar('--admin-shadow-sm')};
  border: 1px solid ${getVar('--admin-border')};

  /* The spinner itself will be defined globally or in AdminLayout's GlobalStyles */
  /* Re-using the class name from AdminLayout.css for consistency if global styles are present */
  .loading-spinner { 
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: ${getVar('--admin-primary')};
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: adminSpin 1s linear infinite; /* Assumes adminSpin is defined globally */
    margin: 0 auto;
  }
`;

const ContactsError = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  gap: 1rem;
  background: ${getVar('--admin-card-bg')};
  border-radius: 12px;
  box-shadow: ${getVar('--admin-shadow-sm')};
  border: 1px solid ${getVar('--admin-border')};

  p {
    color: ${getVar('--admin-danger')};
    margin: 0;
    font-weight: 500;
  }
`;

const RetryButton = styled(Button)` /* Extend the general Button component */
  background: ${getVar('--admin-primary')};
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s ease;

  &:hover {
    background: ${getVar('--admin-primary-dark')};
  }
`;

// --- Modal Styled Components ---
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

const ModalContent = styled.div`
  background: ${getVar('--admin-card-bg')};
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: ${getVar('--admin-shadow-lg')};
  animation: modalSlideIn 0.3s ease;

  @keyframes modalSlideIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid ${getVar('--admin-border')};

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: ${getVar('--admin-text-primary')};
    margin: 0;
  }
`;

const ModalCloseButton = styled.button`
  background: none;
  border: none;
  color: ${getVar('--admin-text-secondary')};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: ${getVar('--admin-bg')};
    color: ${getVar('--admin-text-primary')};
  }
`;

const ModalBody = styled.div`
  padding: 1.5rem;
`;

const ContactDetails = styled.div`
  margin-bottom: 2rem;
`;

const DetailRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${getVar('--admin-border')};

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  strong {
    min-width: 100px;
    color: ${getVar('--admin-text-primary')};
    font-weight: 600;
  }
`;

const StatusBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;

  &.status-new {
    background: rgba(239, 68, 68, 0.1);
    color: ${getVar('--admin-danger')};
  }

  &.status-read {
    background: rgba(16, 185, 129, 0.1);
    color: ${getVar('--admin-success')};
  }

  &.status-processing {
    background: rgba(245, 158, 11, 0.1);
    color: ${getVar('--admin-warning')};
  }

  &.status-resolved {
    background: rgba(6, 182, 212, 0.1);
    color: ${getVar('--admin-info')};
  }
`;

const MessageContent = styled.div`
  background: ${getVar('--admin-bg')};
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid ${getVar('--admin-border')};

  strong {
    display: block;
    margin-bottom: 1rem;
    color: ${getVar('--admin-text-primary')};
    font-weight: 600;
  }
`;

const MessageText = styled.div`
  color: ${getVar('--admin-text-primary')};
  line-height: 1.6;
  white-space: pre-wrap;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-top: 1px solid ${getVar('--admin-border')};
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const StatusActions = styled.div`
  display: flex;
  gap: 0.5rem;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

// --- Composant ContactsManagement ---
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
        setContacts(contacts.map(contact =>
          contact._id === contactId
            ? { ...contact, status: newStatus }
            : contact
        ));

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

  const filteredContacts = contacts.filter(contact => {
    const matchesFilter = filter === 'all' || contact.status === filter;
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          contact.subject.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (isLoading) {
    return (
      <ContactsLoading>
        <div className="loading-spinner"></div> {/* Reusing the global spinner class */}
        <p>Chargement des messages...</p>
      </ContactsLoading>
    );
  }

  if (error) {
    return (
      <ContactsError>
        <p>Erreur: {error}</p>
        <RetryButton onClick={fetchContacts}>
          Réessayer
        </RetryButton>
      </ContactsError>
    );
  }

  return (
    <ContactsManagementContainer>
      <PageHeader>
        <h1>Gestion des Messages</h1>
        <p>Gérez les messages de contact reçus</p>
      </PageHeader>

      <ContactsFilters>
        <SearchBox>
          <SearchIcon />
          <SearchInput
            type="text"
            placeholder="Rechercher par nom, email ou sujet..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBox>
        
        <FilterTabs>
          <FilterTab 
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            Tous ({contacts.length})
          </FilterTab>
          <FilterTab 
            className={filter === 'nouveau' ? 'active' : ''}
            onClick={() => setFilter('nouveau')}
          >
            Nouveaux ({contacts.filter(c => c.status === 'nouveau').length})
          </FilterTab>
          <FilterTab 
            className={filter === 'lu' ? 'active' : ''}
            onClick={() => setFilter('lu')}
          >
            Lus ({contacts.filter(c => c.status === 'lu').length})
          </FilterTab>
          <FilterTab 
            className={filter === 'en-traitement' ? 'active' : ''}
            onClick={() => setFilter('en-traitement')}
          >
            En traitement ({contacts.filter(c => c.status === 'en-traitement').length})
          </FilterTab>
          <FilterTab 
            className={filter === 'résolu' ? 'active' : ''}
            onClick={() => setFilter('résolu')}
          >
            Résolus ({contacts.filter(c => c.status === 'résolu').length})
          </FilterTab>
        </FilterTabs>
      </ContactsFilters>
      
      <ContactsTableContainer>
        <TableHeader>
          <h2>Messages ({filteredContacts.length})</h2>
        </TableHeader>
        
        {filteredContacts.length === 0 ? (
          <NoContacts>
            <FaEnvelope size={48} />
            <h3>Aucun message trouvé</h3>
            <p>
              {searchTerm || filter !== 'all' 
                ? 'Aucun message ne correspond à vos critères de recherche.' 
                : 'Aucun message de contact reçu pour le moment.'
              }
            </p>
          </NoContacts>
        ) : (
          <TableWrapper>
            <DataTable>
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
                      <ContactName>
                        {contact.name}
                        {contact.company && (
                          <small>({contact.company})</small>
                        )}
                      </ContactName>
                    </td>
                    <td>{contact.email}</td>
                    <SubjectCell>
                      {contact.subject}
                    </SubjectCell>
                    <td>
                      <StatusSelect 
                        value={contact.status}
                        onChange={(e) => updateContactStatus(contact._id, e.target.value)}
                        className={getStatusColor(contact.status)}
                      >
                        <option value="nouveau">Nouveau</option>
                        <option value="lu">Lu</option>
                        <option value="en-traitement">En traitement</option>
                        <option value="résolu">Résolu</option>
                      </StatusSelect>
                    </td>
                    <td>
                      {new Date(contact.createdAt).toLocaleDateString('fr-FR')}
                    </td>
                    <td>
                      <ActionButtons>
                        <Button 
                          className="btn-sm btn-primary"
                          onClick={() => openContactModal(contact)}
                          title="Voir le détail"
                        >
                          <FaEye />
                        </Button>
                        <Button 
                          className="btn-sm btn-danger"
                          onClick={() => deleteContact(contact._id)}
                          title="Supprimer"
                        >
                          <FaTrash />
                        </Button>
                      </ActionButtons>
                    </td>
                  </tr>
                ))}
              </tbody>
            </DataTable>
          </TableWrapper>
        )}
      </ContactsTableContainer>
      
      {showModal && selectedContact && (
        <ModalOverlay onClick={() => setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h3>Détail du message</h3>
              <ModalCloseButton 
                onClick={() => setShowModal(false)}
              >
                <FaTimes />
              </ModalCloseButton>
            </ModalHeader>
            
            <ModalBody>
              <ContactDetails>
                <DetailRow>
                  <strong>Nom:</strong> {selectedContact.name}
                </DetailRow>
                {selectedContact.company && (
                  <DetailRow>
                    <strong>Entreprise:</strong> {selectedContact.company}
                  </DetailRow>
                )}
                <DetailRow>
                  <strong>Email:</strong> {selectedContact.email}
                </DetailRow>
                <DetailRow>
                  <strong>Sujet:</strong> {selectedContact.subject}
                </DetailRow>
                <DetailRow>
                  <strong>Date:</strong> {new Date(selectedContact.createdAt).toLocaleString('fr-FR')}
                </DetailRow>
                <DetailRow>
                  <strong>Statut:</strong> 
                  <StatusBadge className={getStatusColor(selectedContact.status)}>
                    {getStatusLabel(selectedContact.status)}
                  </StatusBadge>
                </DetailRow>
              </ContactDetails>
              
              <MessageContent>
                <strong>Message:</strong>
                <MessageText>
                  {selectedContact.message}
                </MessageText>
              </MessageContent>
            </ModalBody>
            
            <ModalFooter>
              <StatusActions>
                <Button 
                  className="btn-success"
                  onClick={() => updateContactStatus(selectedContact._id, 'en-traitement')}
                  disabled={selectedContact.status === 'en-traitement'}
                >
                  <FaCheck /> Marquer en traitement
                </Button>
                <Button 
                  className="btn-info"
                  onClick={() => updateContactStatus(selectedContact._id, 'résolu')}
                  disabled={selectedContact.status === 'résolu'}
                >
                  <FaCheck /> Marquer résolu
                </Button>
              </StatusActions>
              <Button 
                className="btn-danger"
                onClick={() => deleteContact(selectedContact._id)}
              >
                <FaTrash /> Supprimer
              </Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}
    </ContactsManagementContainer>
  );
};

export default ContactsManagement;