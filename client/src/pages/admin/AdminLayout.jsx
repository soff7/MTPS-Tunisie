import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaTachometerAlt, FaEnvelope, FaBox, FaUsers, FaChartLine, FaCog, FaSignOutAlt, FaHome } from 'react-icons/fa';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';

const slideIn = keyframes`
  from { transform: translateX(-100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
`;

const Sidebar = styled.div`
  width: 220px;
  background: linear-gradient(180deg, #1e293b, #2c3e50);
  color: #f1f5f9;
  height: 100vh;
  position: fixed;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  animation: ${slideIn} 0.4s ease-out;
  @media (max-width: 1024px) {
    width: 200px;
  }
  @media (max-width: 768px) {
    width: 180px;
  }
  @media (max-width: 640px) {
    width: 60px;
    padding: 1rem 0;
    align-items: center;
  }
`;

const Logo = styled.div`
  font-size: 1.4rem;
  font-weight: 800;
  padding: 0 1.2rem 1rem;
  border-bottom: 1px solid #334155;
  margin-bottom: 1rem;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  @media (max-width: 640px) {
    font-size: 0;
    padding: 0;
    border: none;
  }
`;

const SidebarItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0.7rem 1.2rem;
  color: #cbd5e1;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
  &:hover, &.active {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.08);
    border-left: 4px solid #3b82f6;
  }
  svg {
    margin-right: 0.8rem;
    font-size: 1.1rem;
  }
  @media (max-width: 640px) {
    font-size: 0;
    justify-content: center;
    svg {
      margin-right: 0;
      font-size: 1.2rem;
    }
  }
`;

const SidebarButton = styled.div`
  display: flex;
  align-items: center;
  padding: 0.7rem 1.2rem;
  color: ${props => (props.isLogout ? '#f87171' : '#93c5fd')};
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
  &:hover {
    color: ${props => (props.isLogout ? '#ef4444' : '#60a5fa')};
    background: rgba(255, 255, 255, 0.08);
    border-left: 4px solid ${props => (props.isLogout ? '#ef4444' : '#60a5fa')};
  }
  svg {
    margin-right: 0.8rem;
    font-size: 1.1rem;
  }
  @media (max-width: 640px) {
    font-size: 0;
    justify-content: center;
    svg {
      margin-right: 0;
      font-size: 1.2rem;
    }
  }
`;

const MainContent = styled.div`
  margin-left: 220px;
  padding: 1.5rem;
  flex: 1;
  background: #f9fafb;
  min-height: 100vh;
  overflow: auto;
  @media (max-width: 1024px) {
    margin-left: 200px;
    padding: 1rem;
  }
  @media (max-width: 768px) {
    margin-left: 180px;
    padding: 0.8rem;
  }
  @media (max-width: 640px) {
    margin-left: 60px;
    padding: 0.5rem;
  }
`;

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // Add logout logic here (e.g., clear token)
    navigate('/signin');
  };

  const handleReturnToSite = () => {
    navigate('/');
  };

  const isActive = (path) => location.pathname === path || (path === '/admin' && location.pathname === '/admin/');

  return (
    <LayoutContainer>
      <Sidebar>
        <Logo>MTPS Admin</Logo>
        <div>
          <SidebarItem to="/admin" className={isActive('/admin') ? 'active' : ''}>
            <FaTachometerAlt /> Tableau de bord
          </SidebarItem>
          <SidebarItem to="/admin/contacts" className={isActive('/admin/contacts') ? 'active' : ''}>
            <FaEnvelope /> Contacts
          </SidebarItem>
          <SidebarItem to="/admin/products" className={isActive('/admin/products') ? 'active' : ''}>
            <FaBox /> Produits
          </SidebarItem>
          <SidebarItem to="/admin/users" className={isActive('/admin/users') ? 'active' : ''}>
            <FaUsers /> Utilisateurs
          </SidebarItem>
          <SidebarItem to="/admin/analytics" className={isActive('/admin/analytics') ? 'active' : ''}>
            <FaChartLine /> Statistiques
          </SidebarItem>
          <SidebarItem to="/admin/settings" className={isActive('/admin/settings') ? 'active' : ''}>
            <FaCog /> Paramètres
          </SidebarItem>
          <SidebarButton onClick={handleReturnToSite}>
            <FaHome /> Retour au site
          </SidebarButton>
        </div>
        <SidebarButton onClick={handleLogout} isLogout>
          <FaSignOutAlt /> Déconnexion
        </SidebarButton>
      </Sidebar>
      <MainContent>
        <Outlet />
      </MainContent>
    </LayoutContainer>
  );
};

export default AdminLayout;