// client/src/App.js - Version complète avec toutes les pages du dashboard
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

// Pages principales
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

// Pages d'authentification
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";

// Composants de layout
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./components/auth/AuthProvider";

// Pages et composants admin
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ContactsManagement from "./pages/admin/ContactsManagement";
import UsersManagement from "./pages/admin/UsersManagement";
import ProductsManagement from "./pages/admin/ProductsManagement";
import Analytics from "./pages/admin/Analytics";
import Settings from "./pages/admin/Settings";
import AdminRoute from "./components/auth/AdminRoute";

// Styles
import './styles/main.css';

// Layout principal avec Navbar et Footer
const MainLayout = () => (
  <>
    <Navbar />
    <main className="main-content">
      <Outlet />
    </main>
    <Footer />
  </>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          {/* Routes du site principal */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/apropos" element={<About />} />
            <Route path="/produits" element={<Products />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/devis" element={<Contact />} />
          </Route>

          {/* Routes d'authentification (sans Navbar/Footer) */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Navigate to="/signin" replace />} />

          {/* Routes Admin protégées */}
          <Route 
            path="/admin" 
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            {/* Dashboard principal */}
            <Route index element={<AdminDashboard />} />
            
            {/* Gestion des contacts et messages */}
            <Route path="contacts" element={<ContactsManagement />} />
            
            {/* Gestion des utilisateurs */}
            <Route path="users" element={<UsersManagement />} />
            
            {/* Gestion des produits */}
            <Route path="products" element={<ProductsManagement />} />
            
            {/* Analytiques et statistiques */}
            <Route path="analytics" element={<Analytics />} />
            
            {/* Paramètres système */}
            <Route path="settings" element={<Settings />} />
            
            {/* Routes futures - à développer */}
            <Route path="reports" element={
              <div style={{ padding: '2rem' }}>
                <h1>Rapports</h1>
                <p>Section des rapports en cours de développement...</p>
              </div>
            } />
            
            <Route path="inventory" element={
              <div style={{ padding: '2rem' }}>
                <h1>Gestion des Stocks</h1>
                <p>Module de gestion des stocks à développer...</p>
              </div>
            } />
            
            <Route path="orders" element={
              <div style={{ padding: '2rem' }}>
                <h1>Gestion des Commandes</h1>
                <p>Module de gestion des commandes à développer...</p>
              </div>
            } />
            
            <Route path="customers" element={
              <div style={{ padding: '2rem' }}>
                <h1>Gestion des Clients</h1>
                <p>Module de gestion des clients à développer...</p>
              </div>
            } />
            
            <Route path="suppliers" element={
              <div style={{ padding: '2rem' }}>
                <h1>Gestion des Fournisseurs</h1>
                <p>Module de gestion des fournisseurs à développer...</p>
              </div>
            } />
            
            <Route path="finance" element={
              <div style={{ padding: '2rem' }}>
                <h1>Gestion Financière</h1>
                <p>Module de gestion financière à développer...</p>
              </div>
            } />
            
            <Route path="marketing" element={
              <div style={{ padding: '2rem' }}>
                <h1>Marketing</h1>
                <p>Module marketing à développer...</p>
              </div>
            } />
            
            <Route path="quality" element={
              <div style={{ padding: '2rem' }}>
                <h1>Contrôle Qualité</h1>
                <p>Module de contrôle qualité à développer...</p>
              </div>
            } />
            
            <Route path="production" element={
              <div style={{ padding: '2rem' }}>
                <h1>Gestion de Production</h1>
                <p>Module de gestion de production à développer...</p>
              </div>
            } />
            
            <Route path="logistics" element={
              <div style={{ padding: '2rem' }}>
                <h1>Logistique</h1>
                <p>Module logistique à développer...</p>
              </div>
            } />
            
            <Route path="hr" element={
              <div style={{ padding: '2rem' }}>
                <h1>Ressources Humaines</h1>
                <p>Module RH à développer...</p>
              </div>
            } />
            
            <Route path="maintenance" element={
              <div style={{ padding: '2rem' }}>
                <h1>Maintenance</h1>
                <p>Module de maintenance à développer...</p>
              </div>
            } />
            
            <Route path="security" element={
              <div style={{ padding: '2rem' }}>
                <h1>Sécurité</h1>
                <p>Module de sécurité à développer...</p>
              </div>
            } />
            
            <Route path="backup" element={
              <div style={{ padding: '2rem' }}>
                <h1>Sauvegarde</h1>
                <p>Module de sauvegarde à développer...</p>
              </div>
            } />
            
            <Route path="logs" element={
              <div style={{ padding: '2rem' }}>
                <h1>Journaux Système</h1>
                <p>Module de journaux système à développer...</p>
              </div>
            } />
            
            <Route path="api" element={
              <div style={{ padding: '2rem' }}>
                <h1>API Management</h1>
                <p>Module de gestion API à développer...</p>
              </div>
            } />
            
            <Route path="notifications" element={
              <div style={{ padding: '2rem' }}>
                <h1>Gestion des Notifications</h1>
                <p>Module de gestion des notifications à développer...</p>
              </div>
            } />
            
            <Route path="templates" element={
              <div style={{ padding: '2rem' }}>
                <h1>Modèles</h1>
                <p>Module de gestion des modèles à développer...</p>
              </div>
            } />
            
            <Route path="integrations" element={
              <div style={{ padding: '2rem' }}>
                <h1>Intégrations</h1>
                <p>Module d'intégrations à développer...</p>
              </div>
            } />
            
            <Route path="plugins" element={
              <div style={{ padding: '2rem' }}>
                <h1>Extensions</h1>
                <p>Module d'extensions à développer...</p>
              </div>
            } />
          </Route>

          {/* Route 404 - Redirection vers l'accueil */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;