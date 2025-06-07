import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaReply, FaTrash, FaSpinner, FaRedo } from 'react-icons/fa';

// Styled Components
const ContactsContainer = styled.div`
  padding: 2rem;
  background-color: var(--admin-bg);
  min-height: calc(100vh - var(--header-height));
  position: relative;
`;

const ContactsTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: var(--admin-text-primary);
`;

const ContactsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const ContactCard = styled.div`
  background-color: var(--admin-card-bg);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: var(--admin-shadow-sm);
  border: 1px solid var(--admin-border);
`;

const ContactHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ContactName = styled.h3`
  font-size: 1.25rem;
  color: var(--admin-text-primary);
  margin: 0;
`;

const ContactEmail = styled.span`
  color: var(--admin-primary);
`;

const ContactStatus = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  background-color: ${props =>
    props.status === 'Pending' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(16, 185, 129, 0.1)'};
  color: ${props =>
    props.status === 'Pending' ? 'var(--admin-warning)' : 'var(--admin-success)'};
`;

const ContactMessage = styled.p`
  color: var(--admin-text-secondary);
  margin-bottom: 1rem;
`;

const ReplySection = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--admin-border);
`;

const ReplyTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--admin-border);
  border-radius: 8px;
  margin-bottom: 1rem;
  font-family: inherit;
  resize: vertical;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: var(--admin-primary);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-right: 0.5rem;
`;

const ReplyButton = styled(Button)`
  background-color: var(--admin-primary);
  color: white;

  &:hover {
    background-color: var(--admin-primary-dark);
  }
`;

const DeleteButton = styled(Button)`
  background-color: var(--admin-danger);
  color: white;

  &:hover {
    background-color: #dc2626;
  }
`;

const RetryButton = styled(Button)`
  background-color: var(--admin-warning);
  color: white;

  &:hover {
    background-color: #d97706;
  }
`;

const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: var(--admin-text-secondary);
`;

const Error = styled.div`
  color: var(--admin-danger);
  padding: 1rem;
  background-color: rgba(239, 68, 68, 0.1);
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
`;

const NoData = styled.div`
  color: var(--admin-text-secondary);
  padding: 1rem;
  text-align: center;
`;

// Main Component
const ContactsManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reply, setReply] = useState({});

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching contacts from:', `${API_BASE_URL}/api/contacts`);
      const res = await fetch(`${API_BASE_URL}/api/contacts`);
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! Status: ${res.status}`);
      }
      
      const data = await res.json();
      console.log('Contacts data:', data);
      
      if (!Array.isArray(data)) {
        throw new Error('Invalid data format: expected an array');
      }
      
      setContacts(data);
    } catch (err) {
      console.error('Error fetching contacts:', err);
      setError(`Error: ${err.message}. Please check the API or connection.`);
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async (contactId) => {
    try {
      if (!reply[contactId] || reply[contactId].trim() === '') {
        throw new Error('Please enter a reply before submitting');
      }
      
      const res = await fetch(`${API_BASE_URL}/api/contacts/${contactId}/reply`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reply: reply[contactId] }),
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to send reply');
      }
      
      const updatedContact = await res.json();
      setContacts(prevContacts =>
        prevContacts.map(c => (c._id === contactId ? updatedContact : c))
      );
      setReply(prev => ({ ...prev, [contactId]: '' }));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (contactId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/contacts/${contactId}`, {
        method: 'DELETE',
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to delete contact');
      }
      
      setContacts(prevContacts =>
        prevContacts.filter(c => c._id !== contactId)
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleReplyChange = (contactId, value) => {
    setReply(prev => ({ ...prev, [contactId]: value }));
  };

  const handleRetry = () => {
    fetchContacts();
  };

  return (
    <ContactsContainer>
      <ContactsTitle>Contacts Management</ContactsTitle>

      {error && (
        <Error>
          {error}
          <RetryButton onClick={handleRetry}>
            <FaRedo /> Retry
          </RetryButton>
        </Error>
      )}

      {loading ? (
        <Loading>
          <FaSpinner className="spinner" />
          Loading...
        </Loading>
      ) : contacts.length === 0 ? (
        <NoData>No contacts to display.</NoData>
      ) : (
        <ContactsList>
          {contacts.map(contact => (
            <ContactCard key={contact._id}>
              <ContactHeader>
                <ContactName>
                  {contact.name} <ContactEmail>({contact.email})</ContactEmail>
                </ContactName>
                <ContactStatus status={contact.status}>
                  {contact.status === 'Pending' ? 'Pending' : 'Replied'}
                </ContactStatus>
              </ContactHeader>

              <ContactMessage>
                <strong>Message:</strong> {contact.message || 'No message'}
              </ContactMessage>

              {contact.reply && (
                <ContactMessage>
                  <strong>Reply:</strong> {contact.reply}
                </ContactMessage>
              )}

              {contact.status === 'Pending' && (
                <ReplySection>
                  <ReplyTextarea
                    placeholder="Your reply..."
                    value={reply[contact._id] || ''}
                    onChange={(e) => handleReplyChange(contact._id, e.target.value)}
                  />
                  <ReplyButton onClick={() => handleReply(contact._id)}>
                    <FaReply /> Send Reply
                  </ReplyButton>
                </ReplySection>
              )}

              <DeleteButton onClick={() => handleDelete(contact._id)}>
                <FaTrash /> Delete
              </DeleteButton>
            </ContactCard>
          ))}
        </ContactsList>
      )}
    </ContactsContainer>
  );
};

export default ContactsManagement;