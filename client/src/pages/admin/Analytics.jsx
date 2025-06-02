import React, { useState, useEffect, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaChartLine, FaUsers, FaEnvelope, FaBox, FaEye, FaDownload, FaCalendarAlt, FaArrowUp, FaArrowDown, FaGlobe, FaMobile, FaExclamationTriangle } from 'react-icons/fa';
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend, Filler } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend, Filler);

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const DashboardContainer = styled.div`
  font-family: 'Inter', sans-serif;
  padding: 2rem;
  background-color: #f5f7fa;
  min-height: 100vh;
  animation: ${fadeIn} 0.5s ease-in-out;
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1.5rem;
`;

const HeaderTitle = styled.div`
  h1 {
    color: #2c3e50;
    margin: 0;
    font-size: 2.5rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  p {
    color: #7f8c8d;
    margin: 0.5rem 0 0;
    font-size: 1rem;
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SelectWrapper = styled.div`
  position: relative;
  .calendar-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #7f8c8d;
    font-size: 1rem;
  }
`;

const PeriodSelect = styled.select`
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  background-color: white;
  color: #2c3e50;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    border-color: #3498db;
  }
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
  }
`;

const ExportButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
  }
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const MetricCard = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  }
`;

const MetricHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const MetricIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.25rem;
  &.visits { background-color: #3498db; }
  &.users { background-color: #2ecc71; }
  &.contacts { background-color: #e74c3c; }
  &.products { background-color: #f39c12; }
`;

const MetricTrend = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  &.positive { color: #2ecc71; }
  &.negative { color: #e74c3c; }
`;

const MetricValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.5rem;
`;

const MetricLabel = styled.div`
  font-size: 0.95rem;
  color: #7f8c8d;
`;

const AnalyticsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const AnalyticsCard = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  &.full-width {
    grid-column: 1 / -1;
  }
`;

const CardHeader = styled.div`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  h3 {
    margin: 0;
    font-size: 1.25rem;
    color: #2c3e50;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
  .chart-container {
    height: 300px;
  }
`;

const TopList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ListItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  .item-title {
    font-weight: 600;
    color: #2c3e50;
    font-size: 1rem;
  }
  .item-subtitle {
    font-size: 0.85rem;
    color: #7f8c8d;
  }
`;

const ItemStats = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  .item-value {
    font-weight: 600;
    color: #2c3e50;
  }
  .item-percentage {
    color: #7f8c8d;
  }
`;

const ProgressBar = styled.div`
  height: 8px;
  background-color: #ecf0f1;
  border-radius: 4px;
  margin-top: 0.5rem;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background-color: #3498db;
  border-radius: 4px;
  transition: width 0.3s ease-in-out;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  color: #7f8c8d;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  background-color: #fef2f2;
  color: #dc2626;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Analytics = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [period, setPeriod] = useState('30days');

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchMetrics();
  }, [period]);

  const fetchMetrics = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/analytics?period=${period}`);
      if (!res.ok) throw new Error('Échec de la récupération des données');
      const data = await res.json();
      setMetrics(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
  };

  const exportReport = () => {
    if (!metrics) return;
    const csvContent = [
      ['Métrique', 'Valeur', 'Tendance (%)'],
      ['Visites', metrics.visits?.value || 0, metrics.visits?.trend || 0],
      ['Nouveaux Utilisateurs', metrics.users?.value || 0, metrics.users?.trend || 0],
      ['Messages de Contact', metrics.contacts?.value || 0, metrics.contacts?.trend || 0],
      ['Produits Ajoutés', metrics.products?.value || 0, metrics.products?.trend || 0],
    ]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `rapport_analytics_${period}.csv`);
    link.click();
    URL.revokeObjectURL(url);
  };

  const chartData = useMemo(() => {
    if (!metrics?.visitsTrend?.dates || !metrics?.visitsTrend?.values || !metrics?.usersTrend?.values) {
      return { labels: [], datasets: [] };
    }
    return {
      labels: metrics.visitsTrend.dates,
      datasets: [
        {
          label: 'Visites',
          data: metrics.visitsTrend.values,
          borderColor: '#3498db',
          backgroundColor: 'rgba(52, 152, 219, 0.2)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#3498db',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 4,
        },
        {
          label: 'Nouveaux Utilisateurs',
          data: metrics.usersTrend.values,
          borderColor: '#2ecc71',
          backgroundColor: 'rgba(46, 204, 113, 0.2)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#2ecc71',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 4,
        },
      ],
    };
  }, [metrics]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#2c3e50',
          font: {
            size: 14,
            family: "'Inter', sans-serif",
          },
        },
      },
      tooltip: {
        backgroundColor: '#2c3e50',
        titleFont: {
          family: "'Inter', sans-serif",
        },
        bodyFont: {
          family: "'Inter', sans-serif",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#7f8c8d',
          font: {
            family: "'Inter', sans-serif",
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: '#7f8c8d',
          font: {
            family: "'Inter', sans-serif",
          },
        },
        grid: {
          color: '#ecf0f1',
        },
      },
    },
  };

  const trafficChartData = useMemo(() => {
    if (!metrics?.trafficSources?.length) {
      return { labels: [], datasets: [] };
    }
    return {
      labels: metrics.trafficSources.map(source => source.name),
      datasets: [
        {
          data: metrics.trafficSources.map(source => source.percentage),
          backgroundColor: ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6'],
          borderColor: '#ffffff',
          borderWidth: 2,
        },
      ],
    };
  }, [metrics]);

  const trafficChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#2c3e50',
          font: {
            size: 14,
            family: "'Inter', sans-serif",
          },
        },
      },
      tooltip: {
        backgroundColor: '#2c3e50',
        titleFont: {
          family: "'Inter', sans-serif",
        },
        bodyFont: {
          family: "'Inter', sans-serif",
        },
      },
    },
  };

  if (loading) {
    return (
      <DashboardContainer>
        <LoadingContainer>
          <LoadingSpinner />
          Chargement des données...
        </LoadingContainer>
      </DashboardContainer>
    );
  }

  if (error) {
    return (
      <DashboardContainer>
        <ErrorMessage>
          <FaExclamationTriangle /> Erreur : {error}
        </ErrorMessage>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <Header>
        <HeaderTitle>
          <h1><FaChartLine /> Statistiques</h1>
          <p>Analyse des performances de votre plateforme MTPS</p>
        </HeaderTitle>
        <Controls>
          <SelectWrapper>
            <FaCalendarAlt className="calendar-icon" />
            <PeriodSelect value={period} onChange={handlePeriodChange} aria-label="Sélectionner la période">
              <option value="7days">Derniers 7 jours</option>
              <option value="30days">Derniers 30 jours</option>
              <option value="90days">Derniers 90 jours</option>
              <option value="year">Cette année</option>
            </PeriodSelect>
          </SelectWrapper>
          <ExportButton onClick={exportReport} aria-label="Exporter le rapport">
            <FaDownload /> Exporter
          </ExportButton>
        </Controls>
      </Header>

      <MetricsGrid>
        <MetricCard>
          <MetricHeader>
            <MetricIcon className="visits"><FaEye /></MetricIcon>
            <MetricTrend className={metrics.visits?.trend >= 0 ? 'positive' : 'negative'}>
              {metrics.visits?.trend >= 0 ? <FaArrowUp /> : <FaArrowDown />}
              {Math.abs(metrics.visits?.trend || 0)}%
            </MetricTrend>
          </MetricHeader>
          <MetricValue>{metrics.visits?.value || 0}</MetricValue>
          <MetricLabel>Visites</MetricLabel>
        </MetricCard>

        <MetricCard>
          <MetricHeader>
            <MetricIcon className="users"><FaUsers /></MetricIcon>
            <MetricTrend className={metrics.users?.trend >= 0 ? 'positive' : 'negative'}>
              {metrics.users?.trend >= 0 ? <FaArrowUp /> : <FaArrowDown />}
              {Math.abs(metrics.users?.trend || 0)}%
            </MetricTrend>
          </MetricHeader>
          <MetricValue>{metrics.users?.value || 0}</MetricValue>
          <MetricLabel>Nouveaux Utilisateurs</MetricLabel>
        </MetricCard>

        <MetricCard>
          <MetricHeader>
            <MetricIcon className="contacts"><FaEnvelope /></MetricIcon>
            <MetricTrend className={metrics.contacts?.trend >= 0 ? 'positive' : 'negative'}>
              {metrics.contacts?.trend >= 0 ? <FaArrowUp /> : <FaArrowDown />}
              {Math.abs(metrics.contacts?.trend || 0)}%
            </MetricTrend>
          </MetricHeader>
          <MetricValue>{metrics.contacts?.value || 0}</MetricValue>
          <MetricLabel>Messages de Contact</MetricLabel>
        </MetricCard>

        <MetricCard>
          <MetricHeader>
            <MetricIcon className="products"><FaBox /></MetricIcon>
            <MetricTrend className={metrics.products?.trend >= 0 ? 'positive' : 'negative'}>
              {metrics.products?.trend >= 0 ? <FaArrowUp /> : <FaArrowDown />}
              {Math.abs(metrics.products?.trend || 0)}%
            </MetricTrend>
          </MetricHeader>
          <MetricValue>{metrics.products?.value || 0}</MetricValue>
          <MetricLabel>Produits Ajoutés</MetricLabel>
        </MetricCard>
      </MetricsGrid>

      <AnalyticsGrid>
        <AnalyticsCard className="full-width">
          <CardHeader>
            <h3><FaChartLine /> Tendances des Visites et Utilisateurs</h3>
          </CardHeader>
          <CardContent>
            {chartData.labels.length > 0 ? (
              <div className="chart-container">
                <Line data={chartData} options={chartOptions} />
              </div>
            ) : (
              <ErrorMessage>
                <FaExclamationTriangle /> Aucune donnée disponible pour le graphique
              </ErrorMessage>
            )}
          </CardContent>
        </AnalyticsCard>

        <AnalyticsCard>
          <CardHeader>
            <h3><FaGlobe /> Répartition des Sources de Trafic</h3>
          </CardHeader>
          <CardContent>
            {trafficChartData.labels.length > 0 ? (
              <div className="chart-container">
                <Doughnut data={trafficChartData} options={trafficChartOptions} />
              </div>
            ) : (
              <ErrorMessage>
                <FaExclamationTriangle /> Aucune donnée disponible pour les sources de trafic
              </ErrorMessage>
            )}
          </CardContent>
        </AnalyticsCard>

        <AnalyticsCard>
          <CardHeader>
            <h3><FaMobile /> Appareils Utilisés</h3>
          </CardHeader>
          <CardContent>
            {metrics.deviceTypes?.length > 0 ? (
              <TopList>
                {metrics.deviceTypes.map((device, index) => (
                  <ListItem key={index}>
                    <ItemInfo>
                      <span className="item-title">{device.name}</span>
                      <span className="item-subtitle">{device.percentage}%</span>
                    </ItemInfo>
                    <ItemStats>
                      <span className="item-value">{device.visits}</span>
                      <span className="item-percentage">{device.percentage}%</span>
                    </ItemStats>
                    <ProgressBar>
                      <ProgressFill style={{ width: `${device.percentage}%` }} />
                    </ProgressBar>
                  </ListItem>
                ))}
              </TopList>
            ) : (
              <ErrorMessage>
                <FaExclamationTriangle /> Aucune donnée disponible pour les appareils
              </ErrorMessage>
            )}
          </CardContent>
        </AnalyticsCard>

        <AnalyticsCard>
          <CardHeader>
            <h3><FaGlobe /> Sources de Trafic</h3>
          </CardHeader>
          <CardContent>
            {metrics.trafficSources?.length > 0 ? (
              <TopList>
                {metrics.trafficSources.map((source, index) => (
                  <ListItem key={index}>
                    <ItemInfo>
                      <span className="item-title">{source.name}</span>
                      <span className="item-subtitle">{source.percentage}%</span>
                    </ItemInfo>
                    <ItemStats>
                      <span className="item-value">{source.visits}</span>
                      <span className="item-percentage">{source.percentage}%</span>
                    </ItemStats>
                    <ProgressBar>
                      <ProgressFill style={{ width: `${source.percentage}%` }} />
                    </ProgressBar>
                  </ListItem>
                ))}
              </TopList>
            ) : (
              <ErrorMessage>
                <FaExclamationTriangle /> Aucune donnée disponible pour les sources de trafic
              </ErrorMessage>
            )}
          </CardContent>
        </AnalyticsCard>
      </AnalyticsGrid>
    </DashboardContainer>
  );
};

export default Analytics;