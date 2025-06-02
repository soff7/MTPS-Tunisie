import React, { useState, useEffect } from 'react';
import { FaBell, FaUser, FaSearch, FaChevronDown, FaSignOutAlt, FaCog } from 'react-icons/fa';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  right: 0;
  left: var(--sidebar-width);
  height: var(--header-height);
  background-color: white;
  box-shadow: var(--admin-shadow-sm);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  z-index: 900;
  transition: left 0.3s ease;

  @media (max-width: 1024px) {
    left: 0;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SidebarToggle = styled.button`
  background: none;
  border: none;
  color: var(--admin-text-secondary);
  cursor: pointer;
  display: none;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.2s ease;

  @media (max-width: 1024px) {
    display: block;
  }

  &:hover {
    background-color: var(--admin-bg);
    color: var(--admin-text-primary);
  }
`;

const PageTitle = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--admin-text-primary);
  margin: 0;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const SearchForm = styled.form`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 1rem;
  color: var(--admin-text-secondary);
`;

const SearchInput = styled.input`
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid var(--admin-border);
  border-radius: 8px;
  background-color: var(--admin-bg);
  color: var(--admin-text-primary);
  font-size: 0.95rem;
  min-width: 250px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--admin-primary);
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }
`;

const NotificationButton = styled.button`
  background: none;
  border: none;
  color: var(--admin-text-secondary);
  cursor: pointer;
  position: relative;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--admin-bg);
    color: var(--admin-text-primary);
  }
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: -0.25rem;
  right: -0.25rem;
  background-color: var(--admin-danger);
  color: white;
  border-radius: 50%;
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
`;

const ProfileMenu = styled.div`
  position: relative;
`;

const ProfileButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--admin-bg);
  }
`;

const ProfileAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: var(--admin-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ProfileName = styled.span`
  font-weight: 500;
  color: var(--admin-text-primary);
  font-size: 0.95rem;
`;

const ProfileRole = styled.span`
  font-size: 0.75rem;
  color: var(--admin-text-secondary);
`;

const DropdownIcon = styled.span`
  color: var(--admin-text-secondary);
  transition: transform 0.2s ease;
  transform: ${props => props.open ? 'rotate(180deg)' : 'rotate(0)'};
`;

const ProfileDropdown = styled.div`
  position: absolute;
  right: 0;
  top: calc(100% + 0.5rem);
  background-color: white;
  border-radius: 8px;
  box-shadow: var(--admin-shadow-md);
  width: 240px;
  z-index: 1000;
  overflow: hidden;
  display: ${props => props.open ? 'block' : 'none'};
`;

const DropdownHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid var(--admin-border);
`;

const UserName = styled.div`
  font-weight: 600;
  color: var(--admin-text-primary);
  margin-bottom: 0.25rem;
`;

const UserEmail = styled.div`
  font-size: 0.8rem;
  color: var(--admin-text-secondary);
`;

const DropdownMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const DropdownItem = styled.li`
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--admin-text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--admin-bg);
    color: var(--admin-text-primary);
  }

  &:last-child {
    color: var(--admin-danger);
    
    &:hover {
      background-color: rgba(239, 68, 68, 0.1);
    }
  }
`;

const AdminHeader = ({ toggleSidebar }) => {
  const [user, setUser] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <HeaderContainer>
      <HeaderLeft>
        <SidebarToggle onClick={toggleSidebar}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </SidebarToggle>
        <PageTitle>Tableau de bord</PageTitle>
      </HeaderLeft>
      
      <HeaderRight>
        <SearchForm onSubmit={handleSearch}>
          <SearchIcon>
            <FaSearch />
          </SearchIcon>
          <SearchInput 
            type="text" 
            placeholder="Rechercher..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchForm>

        <NotificationButton>
          <FaBell />
          {notifications > 0 && (
            <NotificationBadge>{notifications}</NotificationBadge>
          )}
        </NotificationButton>

        <ProfileMenu>
          <ProfileButton onClick={() => setShowProfileMenu(!showProfileMenu)}>
            <ProfileAvatar>
              {user?.name?.charAt(0) || 'A'}
            </ProfileAvatar>
            <ProfileInfo>
              <ProfileName>{user?.name || 'Administrateur'}</ProfileName>
              <ProfileRole>
                {user?.role === 'superadmin' ? 'Super Admin' : 'Admin'}
              </ProfileRole>
            </ProfileInfo>
            <DropdownIcon open={showProfileMenu}>
              <FaChevronDown />
            </DropdownIcon>
          </ProfileButton>

          <ProfileDropdown open={showProfileMenu}>
            <DropdownHeader>
              <UserName>{user?.name}</UserName>
              <UserEmail>{user?.email}</UserEmail>
            </DropdownHeader>
            <DropdownMenu>
              <DropdownItem>
                <FaUser /> Mon profil
              </DropdownItem>
              <DropdownItem>
                <FaCog /> Paramètres
              </DropdownItem>
              <DropdownItem onClick={() => {
                localStorage.clear();
                window.location.href = '/';
              }}>
                <FaSignOutAlt /> Déconnexion
              </DropdownItem>
            </DropdownMenu>
          </ProfileDropdown>
        </ProfileMenu>
      </HeaderRight>
    </HeaderContainer>
  );
};

export default AdminHeader;