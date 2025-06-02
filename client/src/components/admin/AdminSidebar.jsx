import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaTachometerAlt, FaEnvelope, FaBox, FaUsers, FaChartLine, FaCog, FaSignOutAlt } from 'react-icons/fa';

const SidebarContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: var(--sidebar-width);
  height: 100vh;
  background: linear-gradient(180deg, #1e293b 0%, #2d3748 100%);
  color: var(--admin-text-light);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(-100%)'};

  @media (min-width: 1025px) {
    transform: translateX(0);
  }
`;

const SidebarHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const LogoText = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--admin-text-light);
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: var(--admin-text-light);
  opacity: 0.7;
  cursor: pointer;
  font-size: 1.5rem;
  display: none;

  @media (max-width: 1024px) {
    display: block;
  }

  &:hover {
    opacity: 1;
  }
`;

const Nav = styled.nav`
  flex: 1;
  padding: 1.5rem 0;
  overflow-y: auto;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  margin: 0.5rem 0;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
  margin: 0 0.5rem;
  border-radius: 8px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: var(--admin-text-light);
  }

  &.active {
    background-color: rgba(79, 70, 229, 0.3);
    color: #ffffff;
    border-left-color: #4f46e5;
    font-weight: 600;
  }
`;

const NavIcon = styled.span`
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
`;

const NavText = styled.span`
  flex: 1;
`;

const SidebarFooter = styled.div`
  padding: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(239, 68, 68, 0.15);
    color: #fca5a5;
  }
`;

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

const navItems = [
  { path: "/admin", icon: <FaTachometerAlt />, text: "Tableau de bord" },
  { path: "/admin/contacts", icon: <FaEnvelope />, text: "Contacts" },
  { path: "/admin/products", icon: <FaBox />, text: "Produits" },
  { path: "/admin/users", icon: <FaUsers />, text: "Utilisateurs" },
  { path: "/admin/analytics", icon: <FaChartLine />, text: "Statistiques" }, // Changé de /admin/stats à /admin/analytics
  { path: "/admin/settings", icon: <FaCog />, text: "Paramètres" }
];

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <SidebarContainer isOpen={isOpen}>
      <SidebarHeader>
        <Logo>
          <NavIcon>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L3 7L12 12L21 7L12 2Z" fill="currentColor" />
              <path d="M3 12L12 17L21 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M3 17L12 22L21 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </NavIcon>
          <LogoText>MTPS Admin</LogoText>
        </Logo>
        <CloseButton onClick={toggleSidebar}>&times;</CloseButton>
      </SidebarHeader>

      <Nav>
        <NavList>
          {navItems.map((item) => (
            <NavItem key={item.path}>
              <NavLink 
                to={item.path} 
                className={location.pathname === item.path ? 'active' : ''}
              >
                <NavIcon>{item.icon}</NavIcon>
                <NavText>{item.text}</NavText>
              </NavLink>
            </NavItem>
          ))}
        </NavList>
      </Nav>

      <SidebarFooter>
        <LogoutButton onClick={handleLogout}>
          <NavIcon><FaSignOutAlt /></NavIcon>
          <NavText>Déconnexion</NavText>
        </LogoutButton>
      </SidebarFooter>
    </SidebarContainer>
  );
};

export default AdminSidebar;