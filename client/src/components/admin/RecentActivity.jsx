// client/src/components/admin/RecentActivity.jsx
import React from 'react';
import { FaEnvelope, FaUser, FaBox, FaCog } from 'react-icons/fa';
import '../../styles/admin/AdminComponents.css';

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
    <div className="recent-activity">
      <div className="activity-header">
        <h2>Activité récente</h2>
        <button className="see-all-btn">Voir tout</button>
      </div>
      
      <div className="activity-list">
        {activities.map((activity) => (
          <div key={activity.id} className="activity-item">
            <div className={`activity-icon ${activity.color}`}>
              {activity.icon}
            </div>
            <div className="activity-content">
              <h4>{activity.title}</h4>
              <p>{activity.description}</p>
              <small>{activity.time}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;