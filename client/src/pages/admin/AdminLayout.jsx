// client/src/pages/admin/AdminLayout.jsx - VERSION CORRIGÉE
import React, { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import '../../styles/admin/AdminLayout.css';

const AdminLayout = () => {
  // Vérifier si l'utilisateur est connecté et est admin
  const isAuthenticated = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');
  const isAdmin = userRole && ['admin', 'superadmin'].includes(userRole);
  
  // ISOLATION CSS : Ajouter la classe admin-layout au body
  useEffect(() => {
    // Ajouter la classe d'isolation admin au body
    document.body.classList.add('admin-layout');
    document.documentElement.classList.add('admin-layout');
    
    // Nettoyer au démontage du composant
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
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <AdminHeader />
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;