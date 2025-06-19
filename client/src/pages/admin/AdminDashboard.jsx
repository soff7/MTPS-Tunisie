import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaEnvelope, FaBox, FaUsers, FaChartLine } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid #e5e7eb;
`;

const Title = styled.h1`
  color: #1e293b;
  font-size: 1.6rem;
  font-weight: 700;
  margin: 0;
  font-family: 'Inter', sans-serif;
`;

const SearchInput = styled.input`
  padding: 0.6rem 1.2rem;
  border: 1px solid #d1d5db;
  border-radius: 20px;
  font-size: 0.9rem;
  width: 220px;
  outline: none;
  background: #ffffff;
  transition: all 0.3s ease;
  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 0.8rem;
  margin-bottom: 1.2rem;
`;

const MetricCard = styled.div`
  background: #ffffff;
  border-radius: 8px;
  padding: 0.8rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
`;

const MetricValue = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.2rem;
`;

const MetricLabel = styled.div`
  color: #6b7280;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.4px;
`;

const MetricTrend = styled.div`
  font-size: 0.8rem;
  margin-top: 0.2rem;
  color: ${props => (props.positive ? '#10b981' : '#ef4444')};
  font-weight: 500;
`;

const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.8rem;
`;

const ActionCard = styled.div`
  background: #ffffff;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  text-align: center;
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
`;

const ActionIcon = styled.div`
  font-size: 1.6rem;
  color: ${props => props.color};
  margin-bottom: 0.6rem;
`;

const ActionTitle = styled.h3`
  color: #1e293b;
  font-size: 0.95rem;
  font-weight: 600;
  margin: 0.2rem 0;
`;

const ActionDescription = styled.p`
  color: #6b7280;
  font-size: 0.8rem;
  margin: 0;
`;

const ActionButton = styled(Link)`
  display: inline-block;
  padding: 0.35rem 1rem;
  background-color: #3b82f6;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.3s ease;
  &:hover {
    background-color: #2563eb;
  }
`;

const AdminDashboard = () => {
  const metrics = {
    messages: { value: 2, trend: 0 },
    visits: { value: 0, trend: 0 },
    satisfaction: { value: 0, trend: 0 },
  };

  return (
    <div>
      <Header>
        <Title>Tableau de bord</Title>
        <SearchInput type="text" placeholder="Rechercher..." />
      </Header>
      <MetricsGrid>
        <MetricCard>
          <MetricValue>{metrics.messages.value}</MetricValue>
          <MetricLabel>Nouveaux messages</MetricLabel>
          <MetricTrend positive={metrics.messages.trend >= 0}>{metrics.messages.trend >= 0 ? '+' : ''}{metrics.messages.trend}%</MetricTrend>
        </MetricCard>
        <MetricCard>
          <MetricValue>{metrics.visits.value}</MetricValue>
          <MetricLabel>Visites ce mois</MetricLabel>
          <MetricTrend positive={metrics.visits.trend >= 0}>{metrics.visits.trend >= 0 ? '+' : ''}{metrics.visits.trend}%</MetricTrend>
        </MetricCard>
        <MetricCard>
          <MetricValue>{metrics.satisfaction.value}%</MetricValue>
          <MetricLabel>Satisfaction clients</MetricLabel>
          <MetricTrend positive={metrics.satisfaction.trend >= 0}>{metrics.satisfaction.trend >= 0 ? '+' : ''}{metrics.satisfaction.trend}%</MetricTrend>
        </MetricCard>
      </MetricsGrid>
      <ActionGrid>
        <ActionCard>
          <ActionIcon color="#f43f5e"><FaEnvelope /></ActionIcon>
          <ActionTitle>Gestion des Contacts</ActionTitle>
          <ActionDescription>Consultez et répondez aux messages</ActionDescription>
          <ActionButton to="/admin/contacts">Accéder</ActionButton>
        </ActionCard>
        <ActionCard>
          <ActionIcon color="#10b981"><FaBox /></ActionIcon>
          <ActionTitle>Gestion des Produits</ActionTitle>
          <ActionDescription>Ajoutez ou modifiez vos produits</ActionDescription>
          <ActionButton to="/admin/products">Accéder</ActionButton>
        </ActionCard>
        <ActionCard>
          <ActionIcon color="#8b5cf6"><FaUsers /></ActionIcon>
          <ActionTitle>Gestion des Utilisateurs</ActionTitle>
          <ActionDescription>Gérez les comptes et permissions</ActionDescription>
          <ActionButton to="/admin/users">Accéder</ActionButton>
        </ActionCard>
        <ActionCard>
          <ActionIcon color="#3b82f6"><FaChartLine /></ActionIcon>
          <ActionTitle>Statistiques</ActionTitle>
          <ActionDescription>Analysez les performances</ActionDescription>
          <ActionButton to="/admin/analytics">Accéder</ActionButton>
        </ActionCard>
      </ActionGrid>
    </div>
  );
};

export default AdminDashboard;