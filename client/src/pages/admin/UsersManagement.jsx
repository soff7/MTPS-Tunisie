import React, { Component } from 'react';
import styled from 'styled-components';
import { FaPlus, FaTrash, FaSpinner, FaEdit, FaSync, FaSearch, FaTimes } from 'react-icons/fa';

// Styles avec styled-components pour correspondre au design précédent
const Container = styled.div`
  padding: 2rem;
  background-color: var(--admin-bg);
  min-height: calc(100vh - var(--header-height));
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: var(--admin-text-primary);
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const PrimaryButton = styled(Button)`
  background-color: var(--admin-primary);
  color: white;

  &:hover:not(:disabled) {
    background-color: var(--admin-primary-dark);
  }
`;

const DangerButton = styled(Button)`
  background-color: var(--admin-danger);
  color: white;

  &:hover:not(:disabled) {
    background-color: #dc2626;
  }
`;

const SecondaryButton = styled(Button)`
  background-color: var(--admin-secondary);
  color: white;

  &:hover:not(:disabled) {
    background-color: var(--admin-secondary-dark);
  }
`;

const SuccessButton = styled(Button)`
  background-color: var(--admin-success);
  color: white;

  &:hover:not(:disabled) {
    background-color: var(--admin-success-dark);
  }
`;

const SmallButton = styled(Button)`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 1rem;
`;

const FiltersSection = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: var(--admin-card-bg);
  border-radius: 12px;
  box-shadow: var(--admin-shadow-sm);
  border: 1px solid var(--admin-border);
`;

const SearchBox = styled.div`
  flex: 1;
  max-width: 400px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--admin-border);
  border-radius: 8px;
  font-family: inherit;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: var(--admin-primary);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const FilterSelect = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid var(--admin-border);
  border-radius: 8px;
  font-family: inherit;
  box-sizing: border-box;
  min-width: 180px;

  &:focus {
    outline: none;
    border-color: var(--admin-primary);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: var(--admin-card-bg);
  border-radius: 12px;
  box-shadow: var(--admin-shadow-sm);
  border: 1px solid var(--admin-border);
  width: 90%;
  max-width: ${props => props.$maxWidth || '500px'};
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid var(--admin-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalBody = styled.div`
  padding: 1.5rem;
`;

const UserForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: var(--admin-text-primary);
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--admin-border);
  border-radius: 8px;
  font-family: inherit;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: var(--admin-primary);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--admin-border);
  border-radius: 8px;
  font-family: inherit;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: var(--admin-primary);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const FormActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  justify-content: flex-end;
`;

const UsersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 1.5rem;
`;

const UserCard = styled.div`
  background-color: var(--admin-card-bg);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: var(--admin-shadow-sm);
  border: 1px solid var(--admin-border);
`;

const UserName = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: var(--admin-text-primary);
`;

const UserEmail = styled.p`
  color: var(--admin-text-secondary);
  margin-bottom: 0.5rem;
`;

const UserRole = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  background-color: ${props => {
    const role = props.role?.toLowerCase();
    return role === 'superadmin' ? 'rgba(194, 24, 91, 0.1)' : 'rgba(25, 118, 210, 0.1)';
  }};
  color: ${props => {
    const role = props.role?.toLowerCase();
    return role === 'superadmin' ? '#c2185b' : '#1976d2';
  }};
`;

const UserDate = styled.p`
  color: var(--admin-text-secondary);
  font-size: 0.75rem;
  margin-top: 0.5rem;
`;

const UserActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: var(--admin-text-secondary);

  .spinner {
    animation: spin 1s linear infinite;
    margin-right: 0.5rem;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  color: var(--admin-danger);
  padding: 1rem;
  background-color: rgba(239, 68, 68, 0.1);
  border-radius: 8px;
  margin-bottom: 1rem;
  border-left: 4px solid var(--admin-danger);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SuccessMessage = styled.div`
  color: #059669;
  padding: 1rem;
  background-color: rgba(5, 150, 105, 0.1);
  border-radius: 8px;
  margin-bottom: 1rem;
  border-left: 4px solid #059669;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: var(--admin-text-secondary);

  h3 {
    margin-bottom: 0.5rem;
    color: var(--admin-text-primary);
  }
`;

class UsersManagementCRUD extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: true,
      error: null,
      success: null,
      showAddForm: false,
      showEditForm: false,
      editingUser: null,
      newUser: { name: '', email: '', password: '', role: 'Admin' },
      editUser: { name: '', email: '', role: 'Admin' },
      searchTerm: '',
      selectedRole: 'all',
      showDeleteModal: false,
      userToDelete: null
    };
    this.API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  }

  componentDidMount() {
    this.fetchUsers();
  }

  // Clear messages after 5 seconds
  componentDidUpdate(prevProps, prevState) {
    if (this.state.error !== prevState.error || this.state.success !== prevState.success) {
      if (this.state.error || this.state.success) {
        setTimeout(() => {
          this.setState({ error: null, success: null });
        }, 5000);
      }
    }
  }

fetchUsers = async () => {
  try {
    this.setState({ loading: true });
    const res = await fetch(`${this.API_BASE_URL}/api/users`, {
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!res.ok) throw new Error(`Erreur ${res.status}: ${res.statusText}`);
    
    const data = await res.json();
    
    // Normaliser les rôles lors de la récupération
    const normalizedUsers = Array.isArray(data) ? data.map(user => ({
      ...user,
      role: user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase() : 'Admin'
    })) : [];
    
    this.setState({ 
      users: normalizedUsers, 
      loading: false,
      error: null
    });
  } catch (err) {
    console.error('Erreur lors du chargement:', err);
    this.setState({ 
      error: err.message, 
      loading: false,
      users: []
    });
  }
}

  handleAddUser = async (event) => {
    event.preventDefault();
    const { newUser } = this.state;
    
    if (!newUser.name || !newUser.email || !newUser.password) {
      this.setState({ error: 'Tous les champs sont requis' });
      return;
    }

    if (newUser.password.length < 6) {
      this.setState({ error: 'Le mot de passe doit contenir au moins 6 caractères' });
      return;
    }

    this.setState({ loading: true, error: null });
    
    try {
      const res = await fetch(`${this.API_BASE_URL}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newUser)
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `Erreur HTTP: ${res.status}`);
      }
      
      const addedUser = await res.json();
      this.setState(prevState => ({
        users: [...prevState.users, addedUser],
        newUser: { name: '', email: '', password: '', role: 'Admin' },
        showAddForm: false,
        success: 'Utilisateur ajouté avec succès',
        loading: false
      }));
    } catch (err) {
      console.error('Erreur lors de l\'ajout:', err);
      this.setState({ 
        error: err.message, 
        loading: false 
      });
    }
  }

  handleEditUser = async (event) => {
    event.preventDefault();
    const { editUser, editingUser } = this.state;
    
    if (!editUser.name || !editUser.email) {
      this.setState({ error: 'Le nom et l\'email sont requis' });
      return;
    }

    this.setState({ loading: true, error: null });
    
    try {
      const res = await fetch(`${this.API_BASE_URL}/api/users/${editingUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          name: editUser.name,
          email: editUser.email,
          role: editUser.role
        })
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `Erreur HTTP: ${res.status}`);
      }
      
      const updatedUser = await res.json();
      this.setState(prevState => ({
        users: prevState.users.map(user => 
          user._id === editingUser._id ? updatedUser : user
        ),
        showEditForm: false,
        editingUser: null,
        editUser: { name: '', email: '', role: 'Admin' },
        success: 'Utilisateur modifié avec succès',
        loading: false
      }));
    } catch (err) {
      console.error('Erreur lors de la modification:', err);
      this.setState({ 
        error: err.message, 
        loading: false 
      });
    }
  }

  confirmDelete = (user) => {
    this.setState({
      showDeleteModal: true,
      userToDelete: user
    });
  }

  deleteUser = async () => {
    const { userToDelete } = this.state;
    if (!userToDelete) return;

    this.setState({ loading: true, error: null });
    
    try {
      const res = await fetch(`${this.API_BASE_URL}/api/users/${userToDelete._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `Erreur HTTP: ${res.status}`);
      }
      
      this.setState(prevState => ({
        users: prevState.users.filter(user => user._id !== userToDelete._id),
        showDeleteModal: false,
        userToDelete: null,
        success: 'Utilisateur supprimé avec succès',
        loading: false
      }));
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
      this.setState({ 
        error: err.message, 
        loading: false 
      });
    }
  }

  toggleAddForm = () => {
    this.setState(prevState => ({ 
      showAddForm: !prevState.showAddForm,
      newUser: { name: '', email: '', password: '', role: 'Admin' },
      error: null
    }));
  }

  startEdit = (user) => {
    this.setState({
      showEditForm: true,
      editingUser: user,
      editUser: {
        name: user.name,
        email: user.email,
        role: user.role
      },
      error: null
    });
  }

  cancelEdit = () => {
    this.setState({
      showEditForm: false,
      editingUser: null,
      editUser: { name: '', email: '', role: 'Admin' },
      error: null
    });
  }

  handleInputChange = (formType, field, value) => {
    const stateKey = formType === 'add' ? 'newUser' : 'editUser';
    this.setState(prevState => ({
      [stateKey]: { ...prevState[stateKey], [field]: value }
    }));
  }

  getFilteredUsers = () => {
  const { users, searchTerm, selectedRole } = this.state;
  
  return users.filter(user => {
    const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Normaliser la comparaison des rôles
    const userRole = user.role?.toLowerCase();
    const filterRole = selectedRole === 'all' ? 'all' : selectedRole.toLowerCase();
    
    const matchesRole = selectedRole === 'all' || userRole === filterRole;
    
    return matchesSearch && matchesRole;
  });
}

  render() {
    const { 
      loading, error, success, showAddForm, showEditForm, editingUser, 
      newUser, editUser, searchTerm, selectedRole, showDeleteModal, userToDelete 
    } = this.state;
    
    const userRole = 'SuperAdmin'; // Simulé, normalement depuis localStorage
    const filteredUsers = this.getFilteredUsers();

    return (
      <Container>
        <Header>
          <Title>Gestion des Utilisateurs</Title>
          <HeaderActions>
            {userRole === 'SuperAdmin' && (
              <PrimaryButton onClick={this.toggleAddForm}>
                <FaPlus /> {showAddForm ? 'Annuler' : 'Ajouter un utilisateur'}
              </PrimaryButton>
            )}
            <SecondaryButton onClick={this.fetchUsers}>
              <FaSync /> Actualiser
            </SecondaryButton>
          </HeaderActions>
        </Header>

        {error && (
          <ErrorMessage>
            <span>{error}</span>
            <button 
              onClick={() => this.setState({ error: null })}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <FaTimes />
            </button>
          </ErrorMessage>
        )}

        {success && <SuccessMessage>{success}</SuccessMessage>}

        <FiltersSection>
          <SearchBox>
            <div style={{ position: 'relative' }}>
              <SearchInput
                type="text"
                placeholder="Rechercher par nom ou email..."
                value={searchTerm}
                onChange={(e) => this.setState({ searchTerm: e.target.value })}
              />
              <FaSearch style={{
                position: 'absolute',
                right: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--admin-text-secondary)'
              }} />
            </div>
          </SearchBox>
          <div>
            <FilterSelect
              value={selectedRole}
              onChange={(e) => this.setState({ selectedRole: e.target.value })}
            >
              <option value="all">Tous les rôles</option>
              <option value="Admin">Admin</option>
              <option value="SuperAdmin">Super Admin</option>
            </FilterSelect>
          </div>
        </FiltersSection>

        {/* Formulaire d'ajout */}
        {showAddForm && (
          <ModalOverlay>
            <ModalContent>
              <ModalHeader>
                <h3>Ajouter un nouvel utilisateur</h3>
                <button 
                  onClick={this.toggleAddForm}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <FaTimes />
                </button>
              </ModalHeader>
              <ModalBody>
                <UserForm onSubmit={this.handleAddUser}>
                  <FormGroup>
                    <Label>Nom complet *</Label>
                    <Input
                      type="text"
                      value={newUser.name}
                      onChange={(e) => this.handleInputChange('add', 'name', e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Email *</Label>
                    <Input
                      type="email"
                      value={newUser.email}
                      onChange={(e) => this.handleInputChange('add', 'email', e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Mot de passe *</Label>
                    <Input
                      type="password"
                      value={newUser.password}
                      onChange={(e) => this.handleInputChange('add', 'password', e.target.value)}
                      required
                      minLength="6"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Rôle</Label>
                    <Select
                      value={newUser.role}
                      onChange={(e) => this.handleInputChange('add', 'role', e.target.value)}
                    >
                      <option value="Admin">Admin</option>
                      {userRole === 'SuperAdmin' && <option value="SuperAdmin">Super Admin</option>}
                    </Select>
                  </FormGroup>
                  <FormActions>
                    <SecondaryButton 
                      type="button"
                      onClick={this.toggleAddForm}
                    >
                      Annuler
                    </SecondaryButton>
                    <SuccessButton 
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? <FaSpinner className="spinner" /> : 'Ajouter'}
                    </SuccessButton>
                  </FormActions>
                </UserForm>
              </ModalBody>
            </ModalContent>
          </ModalOverlay>
        )}

        {/* Formulaire d'édition */}
        {showEditForm && editingUser && (
          <ModalOverlay>
            <ModalContent>
              <ModalHeader>
                <h3>Modifier l'utilisateur</h3>
                <button 
                  onClick={this.cancelEdit}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <FaTimes />
                </button>
              </ModalHeader>
              <ModalBody>
                <UserForm onSubmit={this.handleEditUser}>
                  <FormGroup>
                    <Label>Nom complet *</Label>
                    <Input
                      type="text"
                      value={editUser.name}
                      onChange={(e) => this.handleInputChange('edit', 'name', e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Email *</Label>
                    <Input
                      type="email"
                      value={editUser.email}
                      onChange={(e) => this.handleInputChange('edit', 'email', e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Rôle</Label>
                    <Select
                      value={editUser.role}
                      onChange={(e) => this.handleInputChange('edit', 'role', e.target.value)}
                      disabled={editingUser.role === 'SuperAdmin' && userRole !== 'SuperAdmin'}
                    >
                      <option value="Admin">Admin</option>
                      {userRole === 'SuperAdmin' && <option value="SuperAdmin">Super Admin</option>}
                    </Select>
                  </FormGroup>
                  <FormActions>
                    <SecondaryButton 
                      type="button"
                      onClick={this.cancelEdit}
                    >
                      Annuler
                    </SecondaryButton>
                    <SuccessButton 
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? <FaSpinner className="spinner" /> : 'Modifier'}
                    </SuccessButton>
                  </FormActions>
                </UserForm>
              </ModalBody>
            </ModalContent>
          </ModalOverlay>
        )}

        {/* Modal de confirmation de suppression */}
        {showDeleteModal && userToDelete && (
          <ModalOverlay>
            <ModalContent $maxWidth="400px">
              <ModalHeader>
                <h3>Confirmer la suppression</h3>
              </ModalHeader>
              <ModalBody>
                <p>Êtes-vous sûr de vouloir supprimer l'utilisateur <strong>{userToDelete.name}</strong> ?</p>
                <p style={{ color: 'var(--admin-danger)', fontStyle: 'italic', marginTop: '0.5rem' }}>
                  Cette action est irréversible.
                </p>
              </ModalBody>
              <FormActions style={{ padding: '1.5rem', paddingTop: 0 }}>
                <SecondaryButton 
                  onClick={() => this.setState({ showDeleteModal: false, userToDelete: null })}
                >
                  Annuler
                </SecondaryButton>
                <DangerButton 
                  onClick={this.deleteUser}
                  disabled={loading}
                >
                  {loading ? <FaSpinner className="spinner" /> : 'Supprimer'}
                </DangerButton>
              </FormActions>
            </ModalContent>
          </ModalOverlay>
        )}

        {/* Liste des utilisateurs */}
        {loading && !showAddForm && !showEditForm ? (
          <Loading>
            <FaSpinner className="spinner" />
            Chargement des utilisateurs...
          </Loading>
        ) : (
          <>
            {filteredUsers.length === 0 ? (
              <EmptyState>
                <h3>Aucun utilisateur trouvé</h3>
                <p>Commencez par ajouter votre premier utilisateur.</p>
              </EmptyState>
            ) : (
              <UsersGrid>
                {filteredUsers.map(user => (
                  <UserCard key={user._id || user.id || Math.random()}>
                    <div>
                      <UserName>{user.name}</UserName>
                      <UserEmail>{user.email}</UserEmail>
                      <UserRole role={user.role}>{user.role}</UserRole>
                      {user.createdAt && (
                        <UserDate>
                          Créé le: {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                        </UserDate>
                      )}
                    </div>
                    
                    {userRole === 'SuperAdmin' && user.role !== 'SuperAdmin' && (
                      <UserActions>
                        <SmallButton 
                          onClick={() => this.startEdit(user)}
                          style={{ backgroundColor: '#f59e0b', color: 'white' }}
                        >
                          <FaEdit /> Modifier
                        </SmallButton>
                        <SmallButton 
                          onClick={() => this.confirmDelete(user)}
                          style={{ backgroundColor: 'var(--admin-danger)', color: 'white' }}
                        >
                          <FaTrash /> Supprimer
                        </SmallButton>
                      </UserActions>
                    )}
                  </UserCard>
                ))}
              </UsersGrid>
            )}
          </>
        )}
      </Container>
    );
  }
}

export default UsersManagementCRUD;