// client/src/pages/admin/Analytics.jsx
import React, { useState, useEffect } from 'react';
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
  FaTrendingUp,
  FaTrendingDown,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa';
import '../../styles/admin/Analytics.css';

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnalyticsData();
  }, [selectedPeriod]);

  const fetchAnalyticsData = async () => {
    try {
      setIsLoading(true);
      
      // Simulation de données analytiques réelles pour MTPS
      const mockAnalytics = {
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
          { path: '/', title: 'Accueil', views: 8950, percentage: 30.9 },
          { path: '/produits', title: 'Nos Produits', views: 6420, percentage: 22.2 },
          { path: '/services', title: 'Nos Services', views: 4280, percentage: 14.8 },
          { path: '/contact', title: 'Contact', views: 3840, percentage: 13.3 },
          { path: '/apropos', title: 'À propos', views: 2460, percentage: 8.5 }
        ],
        topProducts: [
          { name: 'Tube PVC Pression', category: 'PVC', views: 890, inquiries: 23 },
          { name: 'Tube PE Eau Potable', category: 'PE', views: 720, inquiries: 19 },
          { name: 'Tube PVC Évacuation', category: 'PVC', views: 650, inquiries: 16 },
          { name: 'Tube PE Gaz', category: 'PE', views: 540, inquiries: 14 },
          { name: 'Tube PVC Assainissement', category: 'PVC', views: 480, inquiries: 12 }
        ],
        contactSources: [
          { source: 'Formulaire Contact', count: 45, percentage: 50.5 },
          { source: 'Page Produits', count: 28, percentage: 31.5 },
          { source: 'Page Services', count: 12, percentage: 13.5 },
          { source: 'À propos', count: 4, percentage: 4.5 }
        ],
        deviceTypes: [
          { device: 'Desktop', count: 7820, percentage: 62.8 },
          { device: 'Mobile', count: 3950, percentage: 31.7 },
          { device: 'Tablet', count: 680, percentage: 5.5 }
        ],
        geographicData: [
          { country: 'Tunisie', visits: 8950, percentage: 71.9 },
          { country: 'France', visits: 1840, percentage: 14.8 },
          { country: 'Algérie', visits: 920, percentage: 7.4 },
          { country: 'Maroc', visits: 540, percentage: 4.3 },
          { country: 'Autres', visits: 200, percentage: 1.6 }
        ],
        monthlyData: [
          { month: 'Jan', visits: 9200, contacts: 65 },
          { month: 'Fév', visits: 10100, contacts: 72 },
          { month: 'Mar', visits: 11300, contacts: 78 },
          { month: 'Avr', visits: 10800, contacts: 84 },
          { month: 'Mai', visits: 12450, contacts: 89 },
        ],
        industryInsights: {
          peakHours: [
            { hour: '09:00', activity: 285 },
            { hour: '10:00', activity: 340 },
            { hour: '11:00', activity: 380 },
            { hour: '14:00', activity: 320 },
            { hour: '15:00', activity: 295 },
            { hour: '16:00', activity: 250 }
          ],
          popularCategories: [
            { category: 'Tubes PVC', inquiries: 52, percentage: 58.4 },
            { category: 'Tubes PE', inquiries: 31, percentage: 34.8 },
            { category: 'Accessoires', inquiries: 6, percentage: 6.8 }
          ]
        }
      };

      setAnalyticsData(mockAnalytics);
      setIsLoading(false);
    } catch (err) {
      console.error('Erreur fetch analytics:', err);
      setError('Erreur de chargement des données analytiques');
      setIsLoading(false);
    }
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('fr-FR').format(num);
  };

  const formatPercentage = (num) => {
    return `${num.toFixed(1)}%`;
  };

  const exportData = () => {
    // Simulation d'export de données
    console.log('Export des données analytiques...');
    alert('Données exportées avec succès!');
  };

  if (isLoading) {
    return (
      <div className="analytics-loading">
        <div className="loading-spinner"></div>
        <p>Chargement des données analytiques...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="analytics-error">
        <p>Erreur: {error}</p>
        <button onClick={fetchAnalyticsData} className="retry-btn">
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="analytics-dashboard">
      <div className="analytics-header">
        <div className="header-left">
          <h1>Analytiques</h1>
          <p>Tableau de bord des performances MTPS</p>
        </div>
        
        <div className="header-controls">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="period-select"
          >
            <option value="7d">7 derniers jours</option>
            <option value="30d">30 derniers jours</option>
            <option value="90d">3 derniers mois</option>
            <option value="1y">Cette année</option>
          </select>
          
          <button onClick={exportData} className="btn btn-secondary">
            <FaDownload /> Exporter
          </button>
        </div>
      </div>

      {/* Métriques principales */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-icon visits">
              <FaEye />
            </div>
            <div className="metric-trend positive">
              <FaArrowUp />
              {formatPercentage(analyticsData.trends.visits.change)}
            </div>
          </div>
          <div className="metric-value">{formatNumber(analyticsData.overview.totalVisits)}</div>
          <div className="metric-label">Visites totales</div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-icon users">
              <FaUsers />
            </div>
            <div className="metric-trend positive">
              <FaArrowUp />
              {formatPercentage(analyticsData.trends.contacts.change)}
            </div>
          </div>
          <div className="metric-value">{formatNumber(analyticsData.overview.uniqueVisitors)}</div>
          <div className="metric-label">Visiteurs uniques</div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-icon contacts">
              <FaEnvelope />
            </div>
            <div className="metric-trend positive">
              <FaArrowUp />
              {formatPercentage(analyticsData.trends.contacts.change)}
            </div>
          </div>
          <div className="metric-value">{formatNumber(analyticsData.overview.contactForms)}</div>
          <div className="metric-label">Messages reçus</div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div className="metric-icon products">
              <FaBox />
            </div>
            <div className="metric-trend negative">
              <FaArrowDown />
              {formatPercentage(Math.abs(analyticsData.trends.products.change))}
            </div>
          </div>
          <div className="metric-value">{formatNumber(analyticsData.overview.productViews)}</div>
          <div className="metric-label">Vues produits</div>
        </div>
      </div>

      {/* Graphiques et tableaux */}
      <div className="analytics-grid">
        
        {/* Pages les plus visitées */}
        <div className="analytics-card">
          <div className="card-header">
            <h3><FaChartBar /> Pages populaires</h3>
          </div>
          <div className="card-content">
            <div className="top-pages-list">
              {analyticsData.topPages.map((page, index) => (
                <div key={index} className="page-item">
                  <div className="page-info">
                    <div className="page-title">{page.title}</div>
                    <div className="page-path">{page.path}</div>
                  </div>
                  <div className="page-stats">
                    <div className="page-views">{formatNumber(page.views)}</div>
                    <div className="page-percentage">{formatPercentage(page.percentage)}</div>
                  </div>
                  <div className="page-bar">
                    <div 
                      className="page-bar-fill" 
                      style={{ width: `${page.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Produits les plus consultés */}
        <div className="analytics-card">
          <div className="card-header">
            <h3><FaBox /> Produits populaires</h3>
          </div>
          <div className="card-content">
            <div className="top-products-list">
              {analyticsData.topProducts.map((product, index) => (
                <div key={index} className="product-item">
                  <div className="product-rank">#{index + 1}</div>
                  <div className="product-info">
                    <div className="product-name">{product.name}</div>
                    <div className="product-category">{product.category}</div>
                  </div>
                  <div className="product-stats">
                    <div className="product-views">
                      <FaEye /> {formatNumber(product.views)}
                    </div>
                    <div className="product-inquiries">
                      <FaEnvelope /> {product.inquiries} demandes
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sources de contact */}
        <div className="analytics-card">
          <div className="card-header">
            <h3><FaChartPie /> Sources des contacts</h3>
          </div>
          <div className="card-content">
            <div className="contact-sources">
              {analyticsData.contactSources.map((source, index) => (
                <div key={index} className="source-item">
                  <div className="source-info">
                    <div className="source-name">{source.source}</div>
                    <div className="source-count">{source.count} contacts</div>
                  </div>
                  <div className="source-percentage">
                    {formatPercentage(source.percentage)}
                  </div>
                  <div className="source-bar">
                    <div 
                      className="source-bar-fill" 
                      style={{ width: `${source.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Répartition géographique */}
        <div className="analytics-card">
          <div className="card-header">
            <h3><FaChartBar /> Répartition géographique</h3>
          </div>
          <div className="card-content">
            <div className="geographic-data">
              {analyticsData.geographicData.map((geo, index) => (
                <div key={index} className="geo-item">
                  <div className="geo-country">{geo.country}</div>
                  <div className="geo-stats">
                    <div className="geo-visits">{formatNumber(geo.visits)}</div>
                    <div className="geo-percentage">{formatPercentage(geo.percentage)}</div>
                  </div>
                  <div className="geo-bar">
                    <div 
                      className="geo-bar-fill" 
                      style={{ width: `${geo.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Statistiques détaillées */}
        <div className="analytics-card full-width">
          <div className="card-header">
            <h3><FaChartLine /> Évolution mensuelle</h3>
          </div>
          <div className="card-content">
            <div className="monthly-chart">
              {analyticsData.monthlyData.map((month, index) => (
                <div key={index} className="month-data">
                  <div className="month-bars">
                    <div className="visits-bar">
                      <div 
                        className="bar-fill visits" 
                        style={{ 
                          height: `${(month.visits / Math.max(...analyticsData.monthlyData.map(m => m.visits))) * 100}%` 
                        }}
                      ></div>
                    </div>
                    <div className="contacts-bar">
                      <div 
                        className="bar-fill contacts" 
                        style={{ 
                          height: `${(month.contacts / Math.max(...analyticsData.monthlyData.map(m => m.contacts))) * 100}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="month-label">{month.month}</div>
                  <div className="month-values">
                    <div className="visits-value">{formatNumber(month.visits)}</div>
                    <div className="contacts-value">{month.contacts}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-color visits"></div>
                <span>Visites</span>
              </div>
              <div className="legend-item">
                <div className="legend-color contacts"></div>
                <span>Contacts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Insights industriels */}
        <div className="analytics-card">
          <div className="card-header">
            <h3><FaTrendingUp /> Insights métier</h3>
          </div>
          <div className="card-content">
            <div className="industry-insights">
              <div className="insight-section">
                <h4>Heures de pointe</h4>
                <div className="peak-hours">
                  {analyticsData.industryInsights.peakHours.map((hour, index) => (
                    <div key={index} className="hour-item">
                      <div className="hour-time">{hour.hour}</div>
                      <div className="hour-bar">
                        <div 
                          className="hour-bar-fill" 
                          style={{ 
                            width: `${(hour.activity / Math.max(...analyticsData.industryInsights.peakHours.map(h => h.activity))) * 100}%` 
                          }}
                        ></div>
                      </div>
                      <div className="hour-activity">{hour.activity}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="insight-section">
                <h4>Catégories populaires</h4>
                <div className="popular-categories">
                  {analyticsData.industryInsights.popularCategories.map((cat, index) => (
                    <div key={index} className="category-item">
                      <div className="category-name">{cat.category}</div>
                      <div className="category-stats">
                        <span className="category-inquiries">{cat.inquiries} demandes</span>
                        <span className="category-percentage">{formatPercentage(cat.percentage)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Métriques de performance */}
        <div className="analytics-card">
          <div className="card-header">
            <h3><FaChartLine /> Métriques de performance</h3>
          </div>
          <div className="card-content">
            <div className="performance-metrics">
              <div className="metric-item">
                <div className="metric-name">Taux de conversion</div>
                <div className="metric-value large">{formatPercentage(analyticsData.overview.conversionRate)}</div>
                <div className="metric-change positive">
                  <FaTrendingUp /> +{formatPercentage(analyticsData.trends.conversion.change)}
                </div>
              </div>

              <div className="metric-item">
                <div className="metric-name">Durée moyenne de session</div>
                <div className="metric-value large">{analyticsData.overview.avgSessionDuration}</div>
                <div className="metric-description">minutes</div>
              </div>

              <div className="metric-item">
                <div className="metric-name">Taux de rebond</div>
                <div className="metric-value large">{formatPercentage(analyticsData.overview.bounceRate)}</div>
                <div className="metric-description">des visiteurs</div>
              </div>

              <div className="metric-item">
                <div className="metric-name">Pages vues</div>
                <div className="metric-value large">{formatNumber(analyticsData.overview.pageViews)}</div>
                <div className="metric-description">ce mois</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;