// client/src/pages/admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components'; // Import de styled-components
import StatsCards from '../../components/admin/StatsCards';
import RecentActivity from '../../components/admin/RecentActivity';

// --- Variables CSS (à centraliser idéalement dans un thème global) ---
const adminVars = {
  '--admin-primary': '#2563eb',
  '--admin-primary-dark': '#1d4ed8',
  '--admin-success': '#10b981',
  '--admin-warning': '#f59e0b',
  '--admin-danger': '#ef4444',
  '--admin-info': '#06b6d4', // Ajouté pour le badge "résolu"
  '--admin-text-primary': '#1f2937',
  '--admin-text-secondary': '#6b7280',
  '--admin-bg': '#f9fafb',
  '--admin-card-bg': '#ffffff',
  '--admin-border': '#e5e7eb',
  '--admin-shadow-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
};

const getVar = (name) => adminVars[name];

// --- Styled Components pour AdminDashboard ---

const AdminDashboardContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const DashboardHeader = styled.div`
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

  @media (max-width: 768px) {
    h1 {
      font-size: 1.75rem;
    }
  }
  @media (max-width: 480px) {
    h1 {
      font-size: 1.5rem;
    }
  }
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const DashboardSection = styled.div`
  background: ${getVar('--admin-card-bg')};
  border-radius: 12px;
  box-shadow: ${getVar('--admin-shadow-sm')};
  border: 1px solid ${getVar('--admin-border')};
  overflow: hidden;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid ${getVar('--admin-border')};

  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: ${getVar('--admin-text-primary')};
    margin: 0;
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }
`;

const SeeAllLink = styled.a`
  color: ${getVar('--admin-primary')};
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: color 0.2s ease;

  &:hover {
    color: ${getVar('--admin-primary-dark')};
  }
`;

const RecentMessages = styled.div`
  padding: 1.5rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const MessageItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem 0;
  border-bottom: 1px solid ${getVar('--admin-border')};

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }
`;

const MessageInfo = styled.div`
  h4 {
    font-size: 0.875rem;
    font-weight: 600;
    color: ${getVar('--admin-text-primary')};
    margin: 0 0 0.25rem 0;
  }

  p {
    font-size: 0.875rem;
    color: ${getVar('--admin-text-secondary')};
    margin: 0 0 0.25rem 0;
    line-height: 1.4;
  }

  small {
    font-size: 0.75rem;
    color: ${getVar('--admin-text-secondary')};
  }
`;

const StatusBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;

  &.nouveau {
    background: rgba(239, 68, 68, 0.1);
    color: ${getVar('--admin-danger')};
  }

  &.lu {
    background: rgba(16, 185, 129, 0.1);
    color: ${getVar('--admin-success')};
  }

  &.en-traitement {
    background: rgba(245, 158, 11, 0.1);
    color: ${getVar('--admin-warning')};
  }

  &.résolu {
    background: rgba(6, 182, 212, 0.1);
    color: ${getVar('--admin-info')};
  }

  @media (max-width: 768px) {
    align-self: flex-start;
  }
`;

const StatsChart = styled.div`
  padding: 1.5rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ChartItem = styled.div`
  margin-bottom: 1rem;
  &:last-child {
    margin-bottom: 0;
  }
`;

const ChartBar = styled.div`
  background: ${getVar('--admin-bg')};
  border-radius: 4px;
  height: 8px;
  margin-bottom: 0.5rem;
  overflow: hidden;
`;

const BarFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, ${getVar('--admin-primary')}, ${getVar('--admin-primary-dark')});
  border-radius: 4px;
  transition: width 0.3s ease;
`;

const ChartLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;

  span {
    color: ${getVar('--admin-text-secondary')};
    font-weight: 500;
  }
`;

const NoData = styled.p`
  text-align: center;
  color: ${getVar('--admin-text-secondary')};
  font-style: italic;
  padding: 2rem;
  margin: 0;
`;

const DashboardLoading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  gap: 1rem;

  p {
    color: ${getVar('--admin-text-secondary')};
    margin: 0;
  }
`;

const LoadingSpinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: ${getVar('--admin-primary')};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const DashboardError = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  background: ${getVar('--admin-card-bg')};
  border-radius: 12px;
  box-shadow: ${getVar('--admin-shadow-sm')};
  border: 1px solid ${getVar('--admin-border')};
`;

const ErrorMessage = styled.p`
  color: ${getVar('--admin-danger')};
  margin: 0 0 1rem 0;
  font-weight: 500;
`;

const RetryButton = styled.button`
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

// --- Composant AdminDashboard ---
const AdminDashboard = () => {
  const [stats, setStats] = useState({
    counts: {
      users: 0,
      newMessages: 0,
      products: 0
    },
    messagesByStatus: [],
    recentMessages: [],
    recentProducts: []
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:5000/api/stats', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (data.success) {
        setStats(data.data);
      } else {
        setError(data.message || 'Erreur lors du chargement des statistiques');
      }
    } catch (err) {
      console.error('Erreur fetch stats:', err);
      setError('Erreur de connexion au serveur');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <DashboardLoading>
        <LoadingSpinner />
        <p>Chargement du dashboard...</p>
      </DashboardLoading>
    );
  }

  if (error) {
    return (
      <DashboardError>
        <ErrorMessage>Erreur: {error}</ErrorMessage>
        <RetryButton onClick={fetchDashboardStats}>
          Réessayer
        </RetryButton>
      </DashboardError>
    );
  }

  return (
    <AdminDashboardContainer>
      <DashboardHeader>
        <h1>Tableau de bord</h1>
        <p>Bienvenue dans votre espace d'administration MTPS</p>
      </DashboardHeader>

      {/* StatsCards et RecentActivity utilisent déjà styled-components */}
      <StatsCards stats={stats.counts} />

      <DashboardGrid>
        <DashboardSection>
          <SectionHeader>
            <h2>Messages récents</h2>
            <SeeAllLink href="/admin/contacts">Voir tout</SeeAllLink>
          </SectionHeader>
          <RecentMessages>
            {stats.recentMessages.length > 0 ? (
              stats.recentMessages.map((message, index) => (
                <MessageItem key={index}>
                  <MessageInfo>
                    <h4>{message.name}</h4>
                    <p>{message.subject}</p>
                    <small>{new Date(message.createdAt).toLocaleDateString()}</small>
                  </MessageInfo>
                  <StatusBadge className={message.status}>
                    {message.status}
                  </StatusBadge>
                </MessageItem>
              ))
            ) : (
              <NoData>Aucun message récent</NoData>
            )}
          </RecentMessages>
        </DashboardSection>

        <DashboardSection>
          <SectionHeader>
            <h2>Statistiques des messages</h2>
          </SectionHeader>
          <StatsChart>
            {stats.messagesByStatus.length > 0 ? (
              stats.messagesByStatus.map((stat, index) => (
                <ChartItem key={index}>
                  <ChartBar>
                    <BarFill
                      style={{
                        width: `${(stat.count / Math.max(...stats.messagesByStatus.map(s => s.count))) * 100}%`
                      }}
                    ></BarFill>
                  </ChartBar>
                  <ChartLabel>
                    <span>{stat._id}: {stat.count}</span>
                  </ChartLabel>
                </ChartItem>
              ))
            ) : (
              <NoData>Aucune donnée disponible</NoData>
            )}
          </StatsChart>
        </DashboardSection>
      </DashboardGrid>

      <RecentActivity />
    </AdminDashboardContainer>
  );
};

export default AdminDashboard;