import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Dashboard from './admin-dashboard/Dashboard';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./components/auth/AuthProvider";

import './styles/main.css';

function App() {
  // Utilisation explicite de React pour éviter le warning
  useEffect(() => {
    // Logique d'initialisation si nécessaire
  }, []);

  // Vérifier si l'utilisateur est connecté
  const isAuthenticated = localStorage.getItem('token');
  
  // Récupérer le rôle de l'utilisateur
  const userRole = localStorage.getItem('userRole');
  
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/apropos" element={<About />} />
            <Route path="/produits" element={<Products />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/devis" element={<Contact />} />
            
            {/* Routes d'authentification */}
            <Route path="/signin" element={
              isAuthenticated ? (
                userRole === 'admin' || userRole === 'superadmin' 
                  ? <Navigate to="/admin" replace /> 
                  : <Navigate to="/contact" replace />
              ) : <SignIn />
            } />
            
            <Route path="/signup" element={
              isAuthenticated ? (
                userRole === 'admin' || userRole === 'superadmin' 
                  ? <Navigate to="/admin" replace /> 
                  : <Navigate to="/contact" replace />
              ) : <SignUp />
            } />
            
            <Route path="/login" element={<Navigate to="/signin" replace />} />
            
            {/* Route de redirection vers le dashboard si connecté en tant qu'admin */}
            <Route 
              path="/dashboard" 
              element={
                isAuthenticated && (userRole === 'admin' || userRole === 'superadmin') 
                  ? <Navigate to="/admin" replace /> 
                  : <Navigate to="/signin" replace />
              } 
            />
            
            {/* Routes admin protégées */}
            <Route 
              path="/admin/*" 
              element={
                isAuthenticated && (userRole === 'admin' || userRole === 'superadmin') 
                  ? <Dashboard /> 
                  : <Navigate to="/signin" replace />
              } 
            />

            {/* Route par défaut */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;