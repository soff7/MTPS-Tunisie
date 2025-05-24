// client/src/components/admin/StatsCards.jsx
import React from 'react';
import { FaUsers, FaEnvelope, FaBox, FaChartLine } from 'react-icons/fa';
import '../../styles/admin/AdminComponents.css';

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
    <div className="stats-cards">
      {cards.map((card, index) => (
        <div key={index} className={`stats-card ${card.color}`}>
          <div className="card-icon">
            {card.icon}
          </div>
          <div className="card-content">
            <div className="card-header">
              <h3>{card.title}</h3>
              <span className={`change ${card.changeType}`}>
                {card.change}
              </span>
            </div>
            <div className="card-value">{card.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;