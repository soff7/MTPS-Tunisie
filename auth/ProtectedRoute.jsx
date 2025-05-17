// mtps-luminous-control/src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './auth/AuthProvider';

// Page d'accès non autorisé
const UnauthorizedPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-900">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-white mb-4">Accès non autorisé</h1>
      <p className="text-gray-400 mb-8">
        Vous n'avez pas les permissions nécessaires pour accéder à cette page.
      </p>
      <button
        onClick={() => window.history.back()}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
      >
        Retour
      </button>
    </div>
  </div>
);

// Composant ProtectedRoute
export const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  // Vérifier le rôle si requis
  if (requiredRole && user) {
    const roleHierarchy = {
      user: 0,
      admin: 1,
      superadmin: 2
    };

    const userLevel = roleHierarchy[user.role];
    const requiredLevel = roleHierarchy[requiredRole];

    if (userLevel < requiredLevel) {
      return <UnauthorizedPage />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;