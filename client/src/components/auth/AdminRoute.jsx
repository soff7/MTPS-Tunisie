// client/src/components/auth/AdminRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';

/**
 * Composant de route protégée pour les administrateurs
 * Vérifie si l'utilisateur est connecté et a un rôle d'administrateur
 * Redirige vers la page de connexion sinon
 */
const AdminRoute = ({ children }) => {
  const location = useLocation();
  const { user, isLoading, isAuthenticated } = useAuth();
  console.log('AdminRoute: isAuthenticated=', isAuthenticated, 'user=', user);

  if (isLoading) {
    // Optionally, render a loading spinner or null while auth status is loading
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" state={{ from: location.pathname }} replace />;
  }

  // Case-insensitive role check and correct user object access
  const userRole = user?.role?.toLowerCase();
  const isAdmin = userRole === 'admin' || userRole === 'superadmin';

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
