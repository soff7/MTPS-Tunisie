// client/src/pages/admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import StatsCards from '../../components/admin/StatsCards';
import RecentActivity from '../../components/admin/RecentActivity';
import '../../styles/admin/AdminDashboard.css';

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
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Chargement du dashboard...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="dashboard-error">
        <p>Erreur: {error}</p>
        <button onClick={fetchDashboardStats} className="retry-btn">
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Tableau de bord</h1>
        <p>Bienvenue dans votre espace d'administration MTPS</p>
      </div>
      
      <StatsCards stats={stats.counts} />
      
      <div className="dashboard-grid">
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Messages récents</h2>
            <a href="/admin/contacts" className="see-all-link">Voir tout</a>
          </div>
          <div className="recent-messages">
            {stats.recentMessages.length > 0 ? (
              stats.recentMessages.map((message, index) => (
                <div key={index} className="message-item">
                  <div className="message-info">
                    <h4>{message.name}</h4>
                    <p>{message.subject}</p>
                    <small>{new Date(message.createdAt).toLocaleDateString()}</small>
                  </div>
                  <span className={`status-badge ${message.status}`}>
                    {message.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="no-data">Aucun message récent</p>
            )}
          </div>
        </div>
        
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Statistiques des messages</h2>
          </div>
          <div className="stats-chart">
            {stats.messagesByStatus.length > 0 ? (
              stats.messagesByStatus.map((stat, index) => (
                <div key={index} className="chart-item">
                  <div className="chart-bar">
                    <div 
                      className="bar-fill" 
                      style={{ 
                        width: `${(stat.count / Math.max(...stats.messagesByStatus.map(s => s.count))) * 100}%` 
                      }}
                    ></div>
                  </div>
                  <div className="chart-label">
                    <span>{stat._id}: {stat.count}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-data">Aucune donnée disponible</p>
            )}
          </div>
        </div>
      </div>
      
      <RecentActivity />
    </div>
  );
};

export default AdminDashboard;