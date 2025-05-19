// client/src/components/auth/AdminRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * Composant de route protégée pour les administrateurs
 * Vérifie si l'utilisateur est connecté et a un rôle d'administrateur
 * Redirige vers la page de connexion sinon
 */
const AdminRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');
  const isAdmin = userRole === 'admin' || userRole === 'superadmin';
  
  // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
  if (!isAuthenticated) {
    return <Navigate to="/signin" state={{ from: location.pathname }} replace />;
  }
  
  // Si l'utilisateur n'est pas administrateur, rediriger vers la page d'accueil
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  // Sinon, afficher le contenu de la route
  return children;
};

export default AdminRoute;