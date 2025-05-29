// client/src/pages/admin/Analytics.jsx - Version intégrée
import React, { useState, useEffect, useMemo } from 'react';
import { 
  FaChartLine, 
  FaChartBar, 
  FaChartPie, 
  FaUsers, 
  FaEnvelope, 
  FaBox, 
  FaEye,
  FaDownload,
  FaCalendarAlt,
  FaArrowUp,
  FaArrowDown,
  FaGlobe,
  FaMobile,
  FaDesktop,
  FaTablet
} from 'react-icons/fa';
import styled, { keyframes } from 'styled-components';

// Animations
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// Styles globaux
const DashboardContainer = styled.div`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;
`;

const HeaderTitle = styled.div`
  h1 {
    color: #2c3e50;
    margin: 0;
    font-size: 28px;
  }
  
  p {
    color: #7f8c8d;
    margin: 5px 0 0;
    font-size: 14px;
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const SelectWrapper = styled.div`
  position: relative;
  
  .calendar-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #7f8c8d;
    font-size: 14px;
  }
`;

const PeriodSelect = styled.select`
  padding: 10px 15px 10px 35px;
  border-radius: 6px;
  border: 1px solid #ddd;
  background-color: white;
  color: #2c3e50;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    border-color: #3498db;
  }
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`;

const ExportButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 15px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background-color: #2980b9;
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const MetricCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const MetricHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const MetricIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  
  &.visits { background-color: #3498db; }
  &.users { background-color: #2ecc71; }
  &.contacts { background-color: #e74c3c; }
  &.products { background-color: #f39c12; }
`;

const MetricTrend = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  font-weight: 500;
  
  &.positive { color: #2ecc71; }
  &.negative { color: #e74c3c; }
`;

const MetricValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 5px;
`;

const MetricLabel = styled.div`
  font-size: 14px;
  color: #7f8c8d;
`;

const AnalyticsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

const AnalyticsCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  
  &.full-width {
    grid-column: 1 / -1;
  }
`;

const CardHeader = styled.div`
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  gap: 10px;
  
  h3 {
    margin: 0;
    font-size: 18px;
    color: #2c3e50;
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

const CardContent = styled.div`
  padding: 20px;
`;

const TopList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ListItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  
  .item-title {
    font-weight: 600;
    color: #2c3e50;
  }
  
  .item-subtitle {
    font-size: 12px;
    color: #7f8c8d;
  }
`;

const ItemStats = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  
  .item-value {
    font-weight: 600;
    color: #2c3e50;
  }
  
  .item-percentage {
    color: #7f8c8d;
  }
`;

const ProgressBar = styled.div`
  height: 6px;
  background-color: #ecf0f1;
  border-radius: 3px;
  margin-top: 5px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background-color: #3498db;
  border-radius: 3px;
`;

const MonthlyChart = styled.div`
  display: flex;
  gap: 20px;
  height: 250px;
  align-items: flex-end;
  margin-bottom: 20px;
`;

const MonthColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const ChartBars = styled.div`
  display: flex;
  gap: 5px;
  height: calc(100% - 40px);
  width: 100%;
  align-items: flex-end;
`;

const Bar = styled.div`
  width: 50%;
  transition: height 0.5s ease;
  
  &.visits {
    background-color: #3498db;
  }
  
  &.contacts {
    background-color: #2ecc71;
  }
`;

const MonthLabel = styled.div`
  margin-top: 10px;
  font-size: 12px;
  color: #7f8c8d;
`;

const MonthValues = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 12px;
  color: #2c3e50;
  margin-top: 5px;
`;

const ChartLegend = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 15px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
`;

const LegendColor = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 3px;
  
  &.visits { background-color: #3498db; }
  &.contacts { background-color: #2ecc71; }
`;

const BusinessInsights = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InsightSection = styled.div`
  h4 {
    margin: 0 0 15px 0;
    color: #2c3e50;
    font-size: 16px;
  }
`;

const PeakHoursChart = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ChartItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ChartLabel = styled.div`
  width: 40px;
  font-size: 12px;
  color: #7f8c8d;
`;

const ChartBar = styled.div`
  flex: 1;
  height: 10px;
  background-color: #ecf0f1;
  border-radius: 5px;
  overflow: hidden;
`;

const BarFill = styled.div`
  height: 100%;
  background-color: #e74c3c;
  border-radius: 5px;
  
  &.peak { background-color: #e74c3c; }
`;

const ChartValue = styled.div`
  font-size: 12px;
  color: #2c3e50;
`;

const PerformanceMetrics = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
`;

const PerfItem = styled.div`
  .perf-label {
    font-size: 14px;
    color: #7f8c8d;
    margin-bottom: 5px;
  }
  
  .perf-value {
    font-size: 24px;
    font-weight: 700;
    color: #2c3e50;
    
    &.large {
      font-size: 28px;
    }
  }
  
  .perf-change {
    font-size: 12px;
    margin-top: 5px;
    
    &.positive { color: #2ecc71; }
    &.negative { color: #e74c3c; }
  }
  
  .perf-sub {
    font-size: 12px;
    color: #7f8c8d;
  }
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
  animation: ${spin} 1s linear infinite;
  margin-bottom: 15px;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  color: #e74c3c;
`;

const RetryButton = styled.button`
  padding: 8px 16px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  margin-top: 15px;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #2980b9;
  }
`;

// Composants réutilisables
const MetricCardComponent = ({ icon, value, label, change, isPositive }) => (
  <MetricCard>
    <MetricHeader>
      <MetricIcon className={icon}>
        {icon === 'visits' && <FaEye />}
        {icon === 'users' && <FaUsers />}
        {icon === 'contacts' && <FaEnvelope />}
        {icon === 'products' && <FaBox />}
      </MetricIcon>
      {change && (
        <MetricTrend className={isPositive ? 'positive' : 'negative'}>
          {isPositive ? <FaArrowUp /> : <FaArrowDown />}
          {change}
        </MetricTrend>
      )}
    </MetricHeader>
    <MetricValue>{value}</MetricValue>
    <MetricLabel>{label}</MetricLabel>
  </MetricCard>
);

const BarChartItemComponent = ({ label, value, maxValue, type }) => (
  <ChartItem>
    <ChartLabel>{label}</ChartLabel>
    <ChartBar>
      <BarFill 
        className={type}
        style={{ width: `${(value / maxValue) * 100}%` }}
      />
    </ChartBar>
    <ChartValue>{value}</ChartValue>
  </ChartItem>
);

// Composant principal
const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [error, setError] = useState(null);

  // Données simulées
  const mockAnalytics = useMemo(() => ({
    overview: {
      totalVisits: 12450,
      uniqueVisitors: 8950,
      contactForms: 89,
      productViews: 3240,
      conversionRate: 2.8,
      avgSessionDuration: '03:42',
      bounceRate: 34.2,
      pageViews: 28950
    },
    trends: {
      visits: { value: 12450, change: 15.3, isPositive: true },
      contacts: { value: 89, change: 8.2, isPositive: true },
      products: { value: 3240, change: -5.1, isPositive: false },
      conversion: { value: 2.8, change: 12.5, isPositive: true }
    },
    topPages: [
      { id: 1, path: '/', title: 'Accueil', views: 8950, percentage: 30.9 },
      { id: 2, path: '/produits', title: 'Nos Produits', views: 6420, percentage: 22.2 },
      { id: 3, path: '/services', title: 'Nos Services', views: 4280, percentage: 14.8 },
      { id: 4, path: '/contact', title: 'Contact', views: 3840, percentage: 13.3 },
      { id: 5, path: '/apropos', title: 'À propos', views: 2460, percentage: 8.5 }
    ],
    topProducts: [
      { id: 1, name: 'Tube PVC Pression', category: 'PVC', views: 890, inquiries: 23 },
      { id: 2, name: 'Tube PE Eau Potable', category: 'PE', views: 720, inquiries: 19 },
      { id: 3, name: 'Tube PVC Évacuation', category: 'PVC', views: 650, inquiries: 16 },
      { id: 4, name: 'Tube PE Gaz', category: 'PE', views: 540, inquiries: 14 },
      { id: 5, name: 'Tube PVC Assainissement', category: 'PVC', views: 480, inquiries: 12 }
    ],
    contactSources: [
      { id: 1, source: 'Formulaire Contact', count: 45, percentage: 50.5 },
      { id: 2, source: 'Page Produits', count: 28, percentage: 31.5 },
      { id: 3, source: 'Page Services', count: 12, percentage: 13.5 },
      { id: 4, source: 'À propos', count: 4, percentage: 4.5 }
    ],
    deviceTypes: [
      { id: 1, device: 'Desktop', count: 7820, percentage: 62.8, icon: <FaDesktop /> },
      { id: 2, device: 'Mobile', count: 3950, percentage: 31.7, icon: <FaMobile /> },
      { id: 3, device: 'Tablet', count: 680, percentage: 5.5, icon: <FaTablet /> }
    ],
    geographicData: [
      { id: 1, country: 'Tunisie', visits: 8950, percentage: 71.9, flag: '🇹🇳' },
      { id: 2, country: 'France', visits: 1840, percentage: 14.8, flag: '🇫🇷' },
      { id: 3, country: 'Algérie', visits: 920, percentage: 7.4, flag: '🇩🇿' },
      { id: 4, country: 'Maroc', visits: 540, percentage: 4.3, flag: '🇲🇦' },
      { id: 5, country: 'Autres', visits: 200, percentage: 1.6, flag: '🌍' }
    ],
    monthlyData: [
      { id: 1, month: 'Jan', visits: 9200, contacts: 65 },
      { id: 2, month: 'Fév', visits: 10100, contacts: 72 },
      { id: 3, month: 'Mar', visits: 11300, contacts: 78 },
      { id: 4, month: 'Avr', visits: 10800, contacts: 84 },
      { id: 5, month: 'Mai', visits: 12450, contacts: 89 },
    ],
    industryInsights: {
      peakHours: [
        { id: 1, hour: '09:00', activity: 285 },
        { id: 2, hour: '10:00', activity: 340 },
        { id: 3, hour: '11:00', activity: 380 },
        { id: 4, hour: '14:00', activity: 320 },
        { id: 5, hour: '15:00', activity: 295 },
        { id: 6, hour: '16:00', activity: 250 }
      ],
      popularCategories: [
        { id: 1, category: 'Tubes PVC', inquiries: 52, percentage: 58.4 },
        { id: 2, category: 'Tubes PE', inquiries: 31, percentage: 34.8 },
        { id: 3, category: 'Accessoires', inquiries: 6, percentage: 6.8 }
      ]
    }
  }), []);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setIsLoading(true);
        // Simulation de chargement
        await new Promise(resolve => setTimeout(resolve, 800));
        setAnalyticsData(mockAnalytics);
        setIsLoading(false);
      } catch (err) {
        console.error('Erreur fetch analytics:', err);
        setError('Erreur de chargement des données analytiques');
        setIsLoading(false);
      }
    };

    fetchAnalyticsData();
  }, [selectedPeriod, mockAnalytics]);

  const formatNumber = (num) => new Intl.NumberFormat('fr-FR').format(num);
  const formatPercentage = (num) => `${num.toFixed(1)}%`;

  const exportData = () => {
    const dataStr = JSON.stringify(analyticsData, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    const exportName = `MTPS-Analytics-${new Date().toISOString().slice(0, 10)}.json`;
    
    const link = document.createElement('a');
    link.setAttribute('href', dataUri);
    link.setAttribute('download', exportName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
        <p>Chargement des données analytiques...</p>
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        <p>Erreur: {error}</p>
        <RetryButton onClick={() => setError(null)}>
          Réessayer
        </RetryButton>
      </ErrorContainer>
    );
  }

  // Calcul des valeurs maximales pour les graphiques
  const maxVisits = Math.max(...analyticsData.monthlyData.map(m => m.visits));
  const maxContacts = Math.max(...analyticsData.monthlyData.map(m => m.contacts));
  const maxPeakActivity = Math.max(...analyticsData.industryInsights.peakHours.map(h => h.activity));

  return (
    <DashboardContainer>
      <Header>
        <HeaderTitle>
          <h1>Analytiques MTPS</h1>
          <p>Tableau de bord des performances du site web</p>
        </HeaderTitle>
        
        <Controls>
          <SelectWrapper>
            <FaCalendarAlt className="calendar-icon" />
            <PeriodSelect 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <option value="7d">7 derniers jours</option>
              <option value="30d">30 derniers jours</option>
              <option value="90d">3 derniers mois</option>
              <option value="1y">Cette année</option>
            </PeriodSelect>
          </SelectWrapper>
          
          <ExportButton onClick={exportData}>
            <FaDownload /> Exporter les données
          </ExportButton>
        </Controls>
      </Header>

      {/* Métriques principales */}
      <MetricsGrid>
        <MetricCardComponent 
          icon="visits"
          value={formatNumber(analyticsData.overview.totalVisits)}
          label="Visites totales"
          change={formatPercentage(analyticsData.trends.visits.change)}
          isPositive={analyticsData.trends.visits.isPositive}
        />
        
        <MetricCardComponent 
          icon="users"
          value={formatNumber(analyticsData.overview.uniqueVisitors)}
          label="Visiteurs uniques"
          change={formatPercentage(analyticsData.trends.contacts.change)}
          isPositive={analyticsData.trends.contacts.isPositive}
        />
        
        <MetricCardComponent 
          icon="contacts"
          value={formatNumber(analyticsData.overview.contactForms)}
          label="Messages reçus"
          change={formatPercentage(analyticsData.trends.contacts.change)}
          isPositive={analyticsData.trends.contacts.isPositive}
        />
        
        <MetricCardComponent 
          icon="products"
          value={formatNumber(analyticsData.overview.productViews)}
          label="Vues produits"
          change={formatPercentage(Math.abs(analyticsData.trends.products.change))}
          isPositive={analyticsData.trends.products.isPositive}
        />
      </MetricsGrid>

      {/* Graphiques et tableaux */}
      <AnalyticsGrid>
        {/* Pages les plus visitées */}
        <AnalyticsCard>
          <CardHeader>
            <h3><FaChartBar /> Pages populaires</h3>
          </CardHeader>
          <CardContent>
            <TopList>
              {analyticsData.topPages.map(page => (
                <ListItem key={page.id}>
                  <ItemInfo>
                    <div className="item-title">{page.title}</div>
                    <div className="item-subtitle">{page.path}</div>
                  </ItemInfo>
                  <ItemStats>
                    <div className="item-value">{formatNumber(page.views)}</div>
                    <div className="item-percentage">{formatPercentage(page.percentage)}</div>
                  </ItemStats>
                  <ProgressBar>
                    <ProgressFill style={{ width: `${page.percentage}%` }} />
                  </ProgressBar>
                </ListItem>
              ))}
            </TopList>
          </CardContent>
        </AnalyticsCard>

        {/* Produits les plus consultés */}
        <AnalyticsCard>
          <CardHeader>
            <h3><FaBox /> Top Produits</h3>
          </CardHeader>
          <CardContent>
            <TopList>
              {analyticsData.topProducts.map(product => (
                <ListItem key={product.id}>
                  <ItemInfo>
                    <div className="item-title">{product.name}</div>
                    <div className="item-subtitle">{product.category}</div>
                  </ItemInfo>
                  <ItemStats>
                    <div className="item-value">
                      <FaEye /> {formatNumber(product.views)}
                    </div>
                    <div className="item-percentage">
                      <FaEnvelope /> {product.inquiries} demandes
                    </div>
                  </ItemStats>
                </ListItem>
              ))}
            </TopList>
          </CardContent>
        </AnalyticsCard>

        {/* Répartition des appareils */}
        <AnalyticsCard>
          <CardHeader>
            <h3><FaMobile /> Appareils utilisés</h3>
          </CardHeader>
          <CardContent>
            <TopList>
              {analyticsData.deviceTypes.map(device => (
                <ListItem key={device.id}>
                  <ItemInfo>
                    <div className="item-title">
                      {device.icon} {device.device}
                    </div>
                  </ItemInfo>
                  <ItemStats>
                    <div className="item-value">{formatNumber(device.count)}</div>
                    <div className="item-percentage">{formatPercentage(device.percentage)}</div>
                  </ItemStats>
                  <ProgressBar>
                    <ProgressFill style={{ width: `${device.percentage}%` }} />
                  </ProgressBar>
                </ListItem>
              ))}
            </TopList>
          </CardContent>
        </AnalyticsCard>

        {/* Répartition géographique */}
        <AnalyticsCard>
          <CardHeader>
            <h3><FaGlobe /> Visites par pays</h3>
          </CardHeader>
          <CardContent>
            <TopList>
              {analyticsData.geographicData.map(geo => (
                <ListItem key={geo.id}>
                  <ItemInfo>
                    <div className="item-title">
                      {geo.flag} {geo.country}
                    </div>
                  </ItemInfo>
                  <ItemStats>
                    <div className="item-value">{formatNumber(geo.visits)}</div>
                    <div className="item-percentage">{formatPercentage(geo.percentage)}</div>
                  </ItemStats>
                  <ProgressBar>
                    <ProgressFill style={{ width: `${geo.percentage}%` }} />
                  </ProgressBar>
                </ListItem>
              ))}
            </TopList>
          </CardContent>
        </AnalyticsCard>

        {/* Graphique mensuel */}
        <AnalyticsCard className="full-width">
          <CardHeader>
            <h3><FaChartLine /> Évolution mensuelle</h3>
          </CardHeader>
          <CardContent>
            <MonthlyChart>
              {analyticsData.monthlyData.map(month => (
                <MonthColumn key={month.id}>
                  <ChartBars>
                    <Bar 
                      className="visits" 
                      style={{ height: `${(month.visits / maxVisits) * 100}%` }}
                    />
                    <Bar 
                      className="contacts" 
                      style={{ height: `${(month.contacts / maxContacts) * 100}%` }}
                    />
                  </ChartBars>
                  <MonthLabel>{month.month}</MonthLabel>
                  <MonthValues>
                    <div>{formatNumber(month.visits)}</div>
                    <div>{month.contacts}</div>
                  </MonthValues>
                </MonthColumn>
              ))}
            </MonthlyChart>
            <ChartLegend>
              <LegendItem>
                <LegendColor className="visits" />
                <span>Visites</span>
              </LegendItem>
              <LegendItem>
                <LegendColor className="contacts" />
                <span>Contacts</span>
              </LegendItem>
            </ChartLegend>
          </CardContent>
        </AnalyticsCard>

        {/* Insights métier */}
        <AnalyticsCard>
          <CardHeader>
            <h3><FaChartPie /> Insights métier</h3>
          </CardHeader>
          <CardContent>
            <BusinessInsights>
              <InsightSection>
                <h4>Heures de pointe</h4>
                <PeakHoursChart>
                  {analyticsData.industryInsights.peakHours.map(hour => (
                    <BarChartItemComponent 
                      key={hour.id}
                      label={hour.hour}
                      value={hour.activity}
                      maxValue={maxPeakActivity}
                      type="peak"
                    />
                  ))}
                </PeakHoursChart>
              </InsightSection>

              <InsightSection>
                <h4>Catégories demandées</h4>
                <TopList>
                  {analyticsData.industryInsights.popularCategories.map(cat => (
                    <ListItem key={cat.id}>
                      <ItemInfo>
                        <div className="item-title">{cat.category}</div>
                      </ItemInfo>
                      <ItemStats>
                        <div className="item-value">{cat.inquiries} demandes</div>
                        <div className="item-percentage">{formatPercentage(cat.percentage)}</div>
                      </ItemStats>
                      <ProgressBar>
                        <ProgressFill style={{ width: `${cat.percentage}%` }} />
                      </ProgressBar>
                    </ListItem>
                  ))}
                </TopList>
              </InsightSection>
            </BusinessInsights>
          </CardContent>
        </AnalyticsCard>

        {/* Performance et sources de contact */}
        <AnalyticsCard>
          <CardHeader>
            <h3><FaChartLine /> Performance</h3>
          </CardHeader>
          <CardContent>
            <PerformanceMetrics>
              <PerfItem>
                <div className="perf-label">Taux de conversion</div>
                <div className="perf-value large">{formatPercentage(analyticsData.overview.conversionRate)}</div>
                <div className="perf-change positive">
                  <FaArrowUp /> +{formatPercentage(analyticsData.trends.conversion.change)}
                </div>
              </PerfItem>

              <PerfItem>
                <div className="perf-label">Durée moyenne</div>
                <div className="perf-value large">{analyticsData.overview.avgSessionDuration}</div>
                <div className="perf-sub">par session</div>
              </PerfItem>

              <PerfItem>
                <div className="perf-label">Taux de rebond</div>
                <div className="perf-value large">{formatPercentage(analyticsData.overview.bounceRate)}</div>
                <div className="perf-sub">des visites</div>
              </PerfItem>
            </PerformanceMetrics>
          </CardContent>
        </AnalyticsCard>

        <AnalyticsCard>
          <CardHeader>
            <h3><FaEnvelope /> Sources de contact</h3>
          </CardHeader>
          <CardContent>
            <TopList>
              {analyticsData.contactSources.map(source => (
                <ListItem key={source.id}>
                  <ItemInfo>
                    <div className="item-title">{source.source}</div>
                  </ItemInfo>
                  <ItemStats>
                    <div className="item-value">{source.count} contacts</div>
                    <div className="item-percentage">{formatPercentage(source.percentage)}</div>
                  </ItemStats>
                  <ProgressBar>
                    <ProgressFill style={{ width: `${source.percentage}%` }} />
                  </ProgressBar>
                </ListItem>
              ))}
            </TopList>
          </CardContent>
        </AnalyticsCard>
      </AnalyticsGrid>
    </DashboardContainer>
  );
};

export default Analytics;