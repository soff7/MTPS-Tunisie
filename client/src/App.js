// client/src/App.js - MISE À JOUR AVEC ROUTES ADMIN
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./components/auth/AuthProvider";

// Import des composants admin
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ContactsManagement from "./pages/admin/ContactsManagement";
import UsersManagement from "./pages/admin/UsersManagement";
import AdminRoute from "./components/auth/AdminRoute";

import './styles/main.css';
import { Outlet } from "react-router-dom";

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
            <Route index element={<AdminDashboard />} />
            <Route path="contacts" element={<ContactsManagement />} />
            <Route path="users" element={<UsersManagement />} />
            <Route path="products" element={<div>Gestion Produits (À développer)</div>} />
            <Route path="analytics" element={<div>Analytics (À développer)</div>} />
            <Route path="settings" element={<div>Paramètres (À développer)</div>} />
          </Route>

          {/* Redirection pour les routes inconnues */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;