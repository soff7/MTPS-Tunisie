// client/src/pages/admin/AdminLayout.jsx
import React, { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components'; // Import de styled et createGlobalStyle
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';

// --- Variables CSS (Centralisées pour un meilleur maintien) ---
// Idéalement, ces variables devraient être dans un fichier de thème ou un contexte
// partagé par TOUS les styled-components de l'administration.
const adminVars = {
  '--admin-primary': '#2563eb',
  '--admin-primary-dark': '#1d4ed8',
  '--admin-secondary': '#64748b',
  '--admin-success': '#10b981',
  '--admin-warning': '#f59e0b',
  '--admin-danger': '#ef4444',
  '--admin-info': '#06b6d4',

  '--admin-bg': '#f8fafc',
  '--admin-sidebar-bg': '#1e293b',
  '--admin-card-bg': '#ffffff',
  '--admin-border': '#e2e8f0',

  '--admin-text-primary': '#1e293b',
  '--admin-text-secondary': '#64748b',
  '--admin-text-light': '#ffffff',

  '--admin-shadow-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  '--admin-shadow-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  '--admin-shadow-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',

  '--sidebar-width': '280px',
  '--header-height': '70px',
};

// Fonction utilitaire pour accéder aux variables
const getVar = (name) => adminVars[name];

// --- Global Styles pour l'isolation et les variables CSS ---
// Cela remplace l'ajout/suppression de la classe 'admin-layout' sur le body.
const GlobalAdminStyles = createGlobalStyle`
  /* Applique les variables et les styles de base au body et root */
  body.admin-layout, html.admin-layout {
    /* Variables pour le thème admin - ISOLÉES */
    --admin-primary: ${getVar('--admin-primary')};
    --admin-primary-dark: ${getVar('--admin-primary-dark')};
    --admin-secondary: ${getVar('--admin-secondary')};
    --admin-success: ${getVar('--admin-success')};
    --admin-warning: ${getVar('--admin-warning')};
    --admin-danger: ${getVar('--admin-danger')};
    --admin-info: ${getVar('--admin-info')};
    
    --admin-bg: ${getVar('--admin-bg')};
    --admin-sidebar-bg: ${getVar('--admin-sidebar-bg')};
    --admin-card-bg: ${getVar('--admin-card-bg')};
    --admin-border: ${getVar('--admin-border')};
    
    --admin-text-primary: ${getVar('--admin-text-primary')};
    --admin-text-secondary: ${getVar('--admin-text-secondary')};
    --admin-text-light: ${getVar('--admin-text-light')};
    
    --admin-shadow-sm: ${getVar('--admin-shadow-sm')};
    --admin-shadow-md: ${getVar('--admin-shadow-md')};
    --admin-shadow-lg: ${getVar('--admin-shadow-lg')};
    
    --sidebar-width: ${getVar('--sidebar-width')};
    --header-height: ${getVar('--header-height')};

    /* Layout principal ADMIN SEULEMENT */
    display: flex;
    min-height: 100vh;
    background-color: var(--admin-bg);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    
    /* ISOLATION COMPLÈTE - Ne pas hériter des styles du site */
    color: var(--admin-text-primary);
    font-size: 14px;
    line-height: 1.5;
  }

  /* Réinitialisation des styles pour éviter les conflits */
  .admin-layout h1,
  .admin-layout h2,
  .admin-layout h3,
  .admin-layout h4,
  .admin-layout h5,
  .admin-layout h6 {
    color: var(--admin-text-primary);
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    margin: 0;
    line-height: 1.25;
  }

  .admin-layout p {
    color: var(--admin-text-secondary);
    margin: 0;
    line-height: 1.6;
  }

  .admin-layout a {
    color: var(--admin-primary);
    text-decoration: none;
  }

  .admin-layout a:hover {
    color: var(--admin-primary-dark);
  }

  /* Utilitaires ADMIN SEULEMENT */
  .admin-layout .loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid var(--admin-border);
    border-top: 3px solid var(--admin-primary);
    border-radius: 50%;
    animation: adminSpin 1s linear infinite;
    margin: 0 auto;
  }

  @keyframes adminSpin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .admin-layout .dashboard-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 400px;
    gap: 1rem;
    color: var(--admin-text-secondary);
  }

  .admin-layout .dashboard-error {
    text-align: center;
    padding: 2rem;
    background: var(--admin-card-bg);
    border-radius: 8px;
    box-shadow: var(--admin-shadow-sm);
    color: var(--admin-text-primary);
  }

  .admin-layout .retry-btn {
    background: var(--admin-primary);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    cursor: pointer;
    margin-top: 1rem;
    transition: background-color 0.2s;
  }

  .admin-layout .retry-btn:hover {
    background: var(--admin-primary-dark);
  }
`;

// --- Styled Components pour le layout spécifique ---
const AdminLayoutWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: var(--admin-bg); /* Utilise la variable définie globalement */

  /* Media queries si nécessaire pour la base de ce div, mais la plupart sont gérées globalement */
`;

const AdminMain = styled.div`
  flex: 1;
  margin-left: var(--sidebar-width);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--admin-bg);

  @media (max-width: 1024px) {
    margin-left: 0;
  }
`;

const AdminContent = styled.main`
  flex: 1;
  padding: 2rem;
  margin-top: var(--header-height);
  background-color: var(--admin-bg);
  color: var(--admin-text-primary);

  @media (max-width: 1024px) {
    padding: 1rem;
  }
  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
  }
`;

// --- Composant AdminLayout ---
const AdminLayout = () => {
  // Vérifier si l'utilisateur est connecté et est admin
  const isAuthenticated = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');
  const isAdmin = userRole && ['admin', 'superadmin'].includes(userRole);

  // Gérer l'ajout/suppression de la classe 'admin-layout' sur le body
  useEffect(() => {
    document.body.classList.add('admin-layout');
    document.documentElement.classList.add('admin-layout');

    return () => {
      document.body.classList.remove('admin-layout');
      document.documentElement.classList.remove('admin-layout');
    };
  }, []);

  // Rediriger si pas admin
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <>
      <GlobalAdminStyles /> {/* Applique les styles globaux et variables */}
      <AdminLayoutWrapper>
        <AdminSidebar />
        <AdminMain>
          <AdminHeader />
          <AdminContent>
            <Outlet />
          </AdminContent>
        </AdminMain>
      </AdminLayoutWrapper>
    </>
  );
};

export default AdminLayout;