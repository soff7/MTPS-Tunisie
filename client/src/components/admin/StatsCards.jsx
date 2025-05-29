// client/src/components/admin/StatsCards.jsx
import React from 'react';
import styled from 'styled-components';
import { FaUsers, FaEnvelope, FaBox, FaChartLine } from 'react-icons/fa';

// --- Variables CSS (à adapter si vous avez un fichier de variables global) ---
// Idéalement, ces variables devraient être centralisées dans un fichier de thème
// ou un contexte React partagé par tous les composants qui les utilisent.
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

// --- Styled Components pour les Stats Cards ---
const StyledStatsCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const StyledStatsCard = styled.div`
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
    /* Utilise la variable CSS pour l'accent, définie par les classes dynamiques */
    background: var(--card-accent);
  }

  /* Définition des variables CSS pour les couleurs d'accent basées sur les props/classes */
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
  color: var(--card-accent); /* Utilise la variable CSS pour la couleur de l'icône */
  background: rgba(var(--card-accent-rgb), 0.1); /* Utilise la variable CSS pour le fond de l'icône */
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

const CardValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${getVar('--admin-text-primary')};
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

// --- Composant StatsCards ---
const StatsCards = ({ stats }) => {
  const cards = [
    {
      title: 'Utilisateurs',
      value: stats.users || 0,
      icon: <FaUsers />,
      color: 'blue',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Nouveaux Messages',
      value: stats.newMessages || 0,
      icon: <FaEnvelope />,
      color: 'green',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'Produits',
      value: stats.products || 0,
      icon: <FaBox />,
      color: 'purple',
      change: '+15%',
      changeType: 'positive'
    },
    {
      title: 'Taux de conversion',
      value: '24.8%',
      icon: <FaChartLine />,
      color: 'orange',
      change: '-2%',
      changeType: 'negative'
    }
  ];

  return (
    <StyledStatsCards>
      {cards.map((card, index) => (
        <StyledStatsCard key={index} className={card.color}>
          <CardIcon>
            {card.icon}
          </CardIcon>
          <CardContent>
            <CardHeader>
              <h3>{card.title}</h3>
              <Change className={card.changeType}>
                {card.change}
              </Change>
            </CardHeader>
            <CardValue>{card.value}</CardValue>
          </CardContent>
        </StyledStatsCard>
      ))}
    </StyledStatsCards>
  );
};

export default StatsCards;