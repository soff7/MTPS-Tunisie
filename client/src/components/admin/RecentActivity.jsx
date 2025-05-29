// client/src/components/admin/RecentActivity.jsx
import React from 'react';
import styled from 'styled-components';
import { FaEnvelope, FaUser, FaBox, FaCog } from 'react-icons/fa';

// --- Styled Components pour les styles généraux (extraits de AdminComponents.css) ---

// Variables CSS (à adapter si vous avez un fichier de variables global)
// Pour cet exemple, je les inclue ici. Idéalement, elles viendraient d'un thème ou d'un fichier de configuration.
const adminVars = {
  '--admin-primary': '#2563eb',
  '--admin-primary-dark': '#1d4ed8',
  '--admin-success': '#10b981',
  '--admin-warning': '#f59e0b',
  '--admin-danger': '#ef4444',
  '--admin-text-primary': '#1f2937',
  '--admin-text-secondary': '#6b7280',
  '--admin-bg': '#f9fafb',
  '--admin-card-bg': '#ffffff',
  '--admin-border': '#e5e7eb',
  '--admin-shadow-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  '--admin-shadow-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
};

// Fonction utilitaire pour accéder aux variables
const getVar = (name) => adminVars[name];

// Styles pour les cartes de statistiques (Stats Cards)
const StatsCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const StatsCard = styled.div`
  background: ${getVar('--admin-card-bg')};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: ${getVar('--admin-shadow-sm')};
  border: 1px solid ${getVar('--admin-border')};
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${getVar('--admin-shadow-md')};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: var(--card-accent); /* Utilise la variable CSS pour l'accent */
  }

  &.blue {
    --card-accent: ${getVar('--admin-primary')};
    --card-accent-rgb: 37, 99, 235;
  }
  &.green {
    --card-accent: ${getVar('--admin-success')};
    --card-accent-rgb: 16, 185, 129;
  }
  &.purple {
    --card-accent: #8b5cf6;
    --card-accent-rgb: 139, 92, 246;
  }
  &.orange {
    --card-accent: ${getVar('--admin-warning')};
    --card-accent-rgb: 245, 158, 11;
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const CardIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: var(--card-accent);
  background: rgba(var(--card-accent-rgb), 0.1);
  flex-shrink: 0;
`;

const CardContent = styled.div`
  flex: 1;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;

  h3 {
    font-size: 0.875rem;
    font-weight: 500;
    color: ${getVar('--admin-text-secondary')};
    margin: 0;
  }
`;

const Change = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.125rem 0.375rem;
  border-radius: 4px;

  &.positive {
    background: rgba(16, 185, 129, 0.1);
    color: ${getVar('--admin-success')};
  }
  &.negative {
    background: rgba(239, 68, 68, 0.1);
    color: ${getVar('--admin-danger')};
  }
`;

const CardValue = styled.p`
  font-size: 2rem;
  font-weight: 700;
  color: ${getVar('--admin-text-primary')};
  line-height: 1;
  margin: 0; /* Ajouté pour réinitialiser le margin par défaut des <p> */

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

// Styles pour les Tables
const AdminTable = styled.div`
  width: 100%;
  background: ${getVar('--admin-card-bg')};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: ${getVar('--admin-shadow-sm')};
  border: 1px solid ${getVar('--admin-border')};
`;

const TableHeader = styled.div`
  background: ${getVar('--admin-bg')};
  padding: 1rem 1.5rem;
  border-bottom: 1px solid ${getVar('--admin-border')};
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
`;

const TableTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${getVar('--admin-text-primary')};
  margin: 0;
`;

const TableActions = styled.div`
  display: flex;
  gap: 0.5rem;
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

    @media (max-width: 768px) {
      padding: 0.75rem;
    }
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
`;

// Styles pour les Boutons
const Button = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &.btn-primary {
    background: ${getVar('--admin-primary')};
    color: white;
    &:hover {
      background: ${getVar('--admin-primary-dark')};
    }
  }

  &.btn-secondary {
    background: ${getVar('--admin-bg')};
    color: ${getVar('--admin-text-primary')};
    border: 1px solid ${getVar('--admin-border')};
    &:hover {
      background: ${getVar('--admin-border')};
    }
  }

  &.btn-success {
    background: ${getVar('--admin-success')};
    color: white;
    &:hover {
      background: #059669;
    }
  }

  &.btn-danger {
    background: ${getVar('--admin-danger')};
    color: white;
    &:hover {
      background: #dc2626;
    }
  }

  &.btn-sm {
    padding: 0.375rem 0.75rem;
    font-size: 0.75rem;
  }

  &.btn-lg {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
`;

// Styles pour les Forms
const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${getVar('--admin-text-primary')};
  margin-bottom: 0.5rem;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${getVar('--admin-border')};
  border-radius: 6px;
  font-size: 0.875rem;
  background: ${getVar('--admin-card-bg')};
  color: ${getVar('--admin-text-primary')};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${getVar('--admin-primary')};
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${getVar('--admin-border')};
  border-radius: 6px;
  font-size: 0.875rem;
  background: ${getVar('--admin-card-bg')};
  color: ${getVar('--admin-text-primary')};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${getVar('--admin-primary')};
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${getVar('--admin-border')};
  border-radius: 6px;
  font-size: 0.875rem;
  background: ${getVar('--admin-card-bg')};
  color: ${getVar('--admin-text-primary')};
  transition: all 0.2s ease;
  resize: vertical;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: ${getVar('--admin-primary')};
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

// Styles pour la Pagination
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
`;

const PaginationButton = styled.button`
  padding: 0.5rem 0.75rem;
  border: 1px solid ${getVar('--admin-border')};
  background: ${getVar('--admin-card-bg')};
  color: ${getVar('--admin-text-primary')};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;

  &:hover:not(:disabled) {
    background: ${getVar('--admin-bg')};
  }

  &.active {
    background: ${getVar('--admin-primary')};
    color: white;
    border-color: ${getVar('--admin-primary')};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// --- Styles spécifiques à RecentActivity ---
const RecentActivityContainer = styled.div`
  background: ${getVar('--admin-card-bg')};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: ${getVar('--admin-shadow-sm')};
  border: 1px solid ${getVar('--admin-border')};
  margin-top: 2rem; /* Exemple de marge pour séparer d'autres éléments */
`;

const ActivityHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h2 {
    font-size: 1.125rem;
    font-weight: 600;
    color: ${getVar('--admin-text-primary')};
    margin: 0;
  }
`;

const SeeAllButton = styled(Button)`
  &.see-all-btn {
    background: transparent;
    color: ${getVar('--admin-primary')};
    border: none;
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid ${getVar('--admin-border')};

  &:last-child {
    border-bottom: none;
  }
`;

const ActivityIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;

  &.blue {
    color: ${getVar('--admin-primary')};
    background: rgba(37, 99, 235, 0.1);
  }
  &.green {
    color: ${getVar('--admin-success')};
    background: rgba(16, 185, 129, 0.1);
  }
  &.purple {
    color: #8b5cf6;
    background: rgba(139, 92, 246, 0.1);
  }
  &.orange {
    color: ${getVar('--admin-warning')};
    background: rgba(245, 158, 11, 0.1);
  }
`;

const ActivityContent = styled.div`
  flex: 1;

  h4 {
    font-size: 0.95rem;
    font-weight: 500;
    color: ${getVar('--admin-text-primary')};
    margin: 0 0 0.25rem;
  }

  p {
    font-size: 0.85rem;
    color: ${getVar('--admin-text-secondary')};
    margin: 0;
  }

  small {
    font-size: 0.75rem;
    color: ${getVar('--admin-text-secondary')};
  }
`;

// --- Composant RecentActivity ---
const RecentActivity = () => {
  // Données d'activité simulées
  const activities = [
    {
      id: 1,
      type: 'contact',
      icon: <FaEnvelope />,
      title: 'Nouveau message de contact',
      description: 'Message reçu de John Doe',
      time: 'Il y a 2 minutes',
      color: 'blue'
    },
    {
      id: 2,
      type: 'user',
      icon: <FaUser />,
      title: 'Nouvel utilisateur inscrit',
      description: 'Marie Martin s\'est inscrite',
      time: 'Il y a 15 minutes',
      color: 'green'
    },
    {
      id: 3,
      type: 'product',
      icon: <FaBox />,
      title: 'Produit consulté',
      description: 'Tube PVC 50mm consulté 12 fois',
      time: 'Il y a 1 heure',
      color: 'purple'
    },
    {
      id: 4,
      type: 'system',
      icon: <FaCog />,
      title: 'Sauvegarde automatique',
      description: 'Données sauvegardées avec succès',
      time: 'Il y a 2 heures',
      color: 'orange'
    },
    {
      id: 5,
      type: 'contact',
      icon: <FaEnvelope />,
      title: 'Message traité',
      description: 'Demande de Sophie résolue',
      time: 'Il y a 3 heures',
      color: 'blue'
    }
  ];

  return (
    <RecentActivityContainer>
      <ActivityHeader>
        <TableTitle>Activité récente</TableTitle> {/* Réutilise TableTitle */}
        <SeeAllButton className="see-all-btn">Voir tout</SeeAllButton>
      </ActivityHeader>

      <ActivityList>
        {activities.map((activity) => (
          <ActivityItem key={activity.id}>
            <ActivityIcon className={activity.color}>
              {activity.icon}
            </ActivityIcon>
            <ActivityContent>
              <h4>{activity.title}</h4>
              <p>{activity.description}</p>
              <small>{activity.time}</small>
            </ActivityContent>
          </ActivityItem>
        ))}
      </ActivityList>
    </RecentActivityContainer>
  );
};

export default RecentActivity;