// client/src/App.js - Nouvelle version avec séparation complète du dashboard
import React from 'react';
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
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Route du dashboard administratif - SANS Navbar et Footer */}
          <Route 
            path="/admin/*" 
            element={<Dashboard />} 
          />
          
          {/* Routes du site principal - AVEC Navbar et Footer */}
          <Route path="/*" element={
            <>
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
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/login" element={<Navigate to="/signin" replace />} />
                  
                  {/* Route par défaut */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;