import React, { Component } from 'react';
import styled from 'styled-components';
import { FaPlus, FaTrash, FaSpinner, FaEdit, FaSync, FaSearch, FaTimes } from 'react-icons/fa';
import api from '../../utils/api';

// Styles avec styled-components
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

const UsersTable = styled.div`
  background-color: var(--admin-card-bg);
  border-radius: 12px;
  box-shadow: var(--admin-shadow-sm);
  border: 1px solid var(--admin-border);
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background-color: var(--admin-table-header-bg);
`;

const TableRow = styled.tr`
  border-bottom: 1px solid var(--admin-border);

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: var(--admin-table-hover);
  }
`;

const TableHeaderCell = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: var(--admin-text-primary);
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const TableCell = styled.td`
  padding: 1rem;
  color: var(--admin-text-secondary);
  vertical-align: middle;
`;

const UserName = styled.div`
  font-weight: 500;
  color: var(--admin-text-primary);
  margin-bottom: 0.25rem;
`;

const UserEmail = styled.div`
  font-size: 0.875rem;
  color: var(--admin-text-secondary);
`;

const RoleBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  
  ${props => {
    switch (props.role) {
      case 'SuperAdmin':
        return `
          background-color: #fee2e2;
          color: #dc2626;
        `;
      case 'Admin':
        return `
          background-color: #dbeafe;
          color: #2563eb;
        `;
      case 'Manager':
        return `
          background-color: #f3e8ff;
          color: #7c3aed;
        `;
      default:
        return `
          background-color: #f3f4f6;
          color: #6b7280;
        `;
    }
  }}
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
  
  ${props => props.active ? `
    background-color: #dcfce7;
    color: #16a34a;
  ` : `
    background-color: #fee2e2;
    color: #dc2626;
  `}
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  font-size: 1.125rem;
  color: var(--admin-text-secondary);
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  text-align: center;
  color: var(--admin-text-secondary);
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

const ModalTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--admin-text-primary);
  margin: 0;
`;

const ModalBody = styled.div`
  padding: 1.5rem;
`;

const ModalFooter = styled.div`
  padding: 1.5rem;
  border-top: 1px solid var(--admin-border);
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--admin-text-secondary);
  padding: 0;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;

  &:hover {
    background-color: var(--admin-hover-bg);
  }
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

const ErrorMessage = styled.div`
  color: var(--admin-danger);
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const AlertMessage = styled.div`
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 500;
  
  ${props => props.type === 'success' ? `
    background-color: #dcfce7;
    color: #16a34a;
    border: 1px solid #bbf7d0;
  ` : `
    background-color: #fee2e2;
    color: #dc2626;
    border: 1px solid #fecaca;
  `}
`;

class UserManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: true,
      searchTerm: '',
      roleFilter: 'all',
      statusFilter: 'all',
      showModal: false,
      modalMode: 'create',
      currentUser: null,
      formData: {
        name: '',
        email: '',
        password: '',
        role: 'User'
      },
      formErrors: {},
      submitting: false,
      message: '',
      messageType: '',
      isOffline: false
    };
  }

  componentDidMount() {
    this.loadUsers();
  }

  loadUsers = async () => {
    try {
      this.setState({ loading: true, message: '', isOffline: false });
      
      const response = await api.get('/auth/users');
      this.setState({ 
        users: response.data,
        loading: false 
      });
    } catch (error) {
      console.error('Error loading users:', error);
      
      let errorMessage = 'Failed to load users';
      if (error.response) {
        if (error.response.status === 404) {
          errorMessage = 'Endpoint not found. Please check backend configuration.';
        } else if (error.response.status === 401) {
          errorMessage = 'Unauthorized. Please login again.';
          localStorage.removeItem('token');
          window.location.href = '/signin';
        } else if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        }
      } else if (error.request) {
        errorMessage = 'No response from server. Check your network connection.';
        this.setState({ isOffline: true });
      }
      
      this.setState({ 
        loading: false,
        message: errorMessage,
        messageType: 'error'
      });
    }
  };

  handleSearchChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  handleRoleFilterChange = (e) => {
    this.setState({ roleFilter: e.target.value });
  };

  handleStatusFilterChange = (e) => {
    this.setState({ statusFilter: e.target.value });
  };

  getFilteredUsers = () => {
    const { users, searchTerm, roleFilter, statusFilter } = this.state;
    
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      const matchesStatus = statusFilter === 'all' || 
                           (statusFilter === 'active' && user.isActive) ||
                           (statusFilter === 'inactive' && !user.isActive);
      
      return matchesSearch && matchesRole && matchesStatus;
    });
  };

  openCreateModal = () => {
    this.setState({
      showModal: true,
      modalMode: 'create',
      currentUser: null,
      formData: {
        name: '',
        email: '',
        password: '',
        role: 'User'
      },
      formErrors: {}
    });
  };

  openEditModal = (user) => {
    this.setState({
      showModal: true,
      modalMode: 'edit',
      currentUser: user,
      formData: {
        name: user.name,
        email: user.email,
        password: '',
        role: user.role
      },
      formErrors: {}
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      modalMode: 'create',
      currentUser: null,
      formData: {
        name: '',
        email: '',
        password: '',
        role: 'User'
      },
      formErrors: {},
      message: '',
      messageType: ''
    });
  };

  handleFormChange = (e) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [e.target.name]: e.target.value
      }
    });
  };

  validateForm = () => {
    const { formData, modalMode } = this.state;
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }

    if (modalMode === 'create' && !formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password && formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    this.setState({ formErrors: errors });
    return Object.keys(errors).length === 0;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!this.validateForm()) {
      return;
    }

    this.setState({ submitting: true });

    try {
      const { formData, modalMode, currentUser } = this.state;
      
      if (modalMode === 'create') {
        await api.post('/auth/users', formData);
        this.setState({
          message: 'User created successfully',
          messageType: 'success'
        });
      } else {
        await api.put(`/auth/users/${currentUser._id}`, formData);
        this.setState({
          message: 'User updated successfully',
          messageType: 'success'
        });
      }
      
      this.closeModal();
      this.loadUsers();
    } catch (error) {
      console.error('Error:', error);
      this.setState({
        message: error.response?.data?.message || 'Error saving user',
        messageType: 'error'
      });
    } finally {
      this.setState({ submitting: false });
    }
  };

  handleDelete = async (user) => {
    if (!window.confirm(`Are you sure you want to delete user ${user.name}?`)) {
      return;
    }

    try {
      await api.delete(`/auth/users/${user._id}`);
      this.setState({
        message: 'User deleted successfully',
        messageType: 'success'
      });
      this.loadUsers();
    } catch (error) {
      console.error('Error:', error);
      this.setState({
        message: error.response?.data?.message || 'Error deleting user',
        messageType: 'error'
      });
    }
  };

  formatDate = (dateString) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  render() {
    const { 
      loading, 
      searchTerm, 
      roleFilter, 
      statusFilter, 
      showModal, 
      modalMode, 
      formData, 
      formErrors, 
      submitting,
      message,
      messageType,
      isOffline
    } = this.state;

    const filteredUsers = this.getFilteredUsers();

    return (
      <Container>
        <Header>
          <Title>User Management</Title>
          <HeaderActions>
            <SecondaryButton onClick={this.loadUsers} disabled={loading}>
              <FaSync />
              Refresh
            </SecondaryButton>
            <PrimaryButton onClick={this.openCreateModal}>
              <FaPlus />
              Add User
            </PrimaryButton>
          </HeaderActions>
        </Header>

        {message && (
          <AlertMessage type={messageType}>
            {message}
          </AlertMessage>
        )}

        {isOffline && (
          <AlertMessage type="error">
            You are currently offline. Some features may not be available.
          </AlertMessage>
        )}

        <FiltersSection>
          <SearchBox>
            <SearchInput
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={this.handleSearchChange}
            />
          </SearchBox>
          
          <FilterSelect value={roleFilter} onChange={this.handleRoleFilterChange}>
            <option value="all">All Roles</option>
            <option value="SuperAdmin">SuperAdmin</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="User">User</option>
          </FilterSelect>
          
          <FilterSelect value={statusFilter} onChange={this.handleStatusFilterChange}>
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </FilterSelect>
        </FiltersSection>

        <UsersTable>
          {loading ? (
            <LoadingSpinner>
              <FaSpinner className="fa-spin" style={{ marginRight: '0.5rem' }} />
              Loading users...
            </LoadingSpinner>
          ) : filteredUsers.length === 0 ? (
            <EmptyState>
              <FaSearch size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
              <h3>No users found</h3>
              <p>No users match the search criteria.</p>
            </EmptyState>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>User</TableHeaderCell>
                  <TableHeaderCell>Role</TableHeaderCell>
                  <TableHeaderCell>Status</TableHeaderCell>
                  <TableHeaderCell>Last Login</TableHeaderCell>
                  <TableHeaderCell>Created At</TableHeaderCell>
                  <TableHeaderCell>Actions</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <tbody>
                {filteredUsers.map(user => (
                  <TableRow key={user._id}>
                    <TableCell>
                      <UserName>{user.name}</UserName>
                      <UserEmail>{user.email}</UserEmail>
                    </TableCell>
                    <TableCell>
                      <RoleBadge role={user.role}>{user.role}</RoleBadge>
                    </TableCell>
                    <TableCell>
                      <StatusBadge active={user.isActive}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </StatusBadge>
                    </TableCell>
                    <TableCell>
                      {this.formatDate(user.lastLogin)}
                    </TableCell>
                    <TableCell>
                      {this.formatDate(user.createdAt)}
                    </TableCell>
                    <TableCell>
                      <ActionButtons>
                        <SmallButton 
                          onClick={() => this.openEditModal(user)}
                          style={{ backgroundColor: '#f59e0b', color: 'white' }}
                        >
                          <FaEdit />
                        </SmallButton>
                        <SmallButton 
                          onClick={() => this.handleDelete(user)}
                          style={{ backgroundColor: '#dc2626', color: 'white' }}
                        >
                          <FaTrash />
                        </SmallButton>
                      </ActionButtons>
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          )}
        </UsersTable>

        {showModal && (
          <ModalOverlay onClick={this.closeModal}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <ModalHeader>
                <ModalTitle>
                  {modalMode === 'create' ? 'Create User' : 'Edit User'}
                </ModalTitle>
                <CloseButton onClick={this.closeModal}>
                  <FaTimes />
                </CloseButton>
              </ModalHeader>
              
              <ModalBody>
                <UserForm onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <Label>Full Name</Label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={this.handleFormChange}
                      placeholder="Enter full name"
                    />
                    {formErrors.name && <ErrorMessage>{formErrors.name}</ErrorMessage>}
                  </FormGroup>

                  <FormGroup>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={this.handleFormChange}
                      placeholder="Enter email"
                    />
                    {formErrors.email && <ErrorMessage>{formErrors.email}</ErrorMessage>}
                  </FormGroup>

                  <FormGroup>
                    <Label>
                      {modalMode === 'create' ? 'Password' : 'New Password (optional)'}
                    </Label>
                    <Input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={this.handleFormChange}
                      placeholder={modalMode === 'create' ? 'Enter password' : 'Leave blank to keep current'}
                    />
                    {formErrors.password && <ErrorMessage>{formErrors.password}</ErrorMessage>}
                  </FormGroup>

                  <FormGroup>
                    <Label>Role</Label>
                    <Select
                      name="role"
                      value={formData.role}
                      onChange={this.handleFormChange}
                    >
                      <option value="User">User</option>
                      <option value="Manager">Manager</option>
                      <option value="Admin">Admin</option>
                      <option value="SuperAdmin">SuperAdmin</option>
                    </Select>
                  </FormGroup>
                </UserForm>
              </ModalBody>

              <ModalFooter>
                <Button type="button" onClick={this.closeModal}>
                  Cancel
                </Button>
                <PrimaryButton 
                  onClick={this.handleSubmit}
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <FaSpinner className="fa-spin" />
                      {modalMode === 'create' ? 'Creating...' : 'Updating...'}
                    </>
                  ) : (
                    modalMode === 'create' ? 'Create' : 'Update'
                  )}
                </PrimaryButton>
              </ModalFooter>
            </ModalContent>
          </ModalOverlay>
        )}
      </Container>
    );
  }
}

export default UserManagement;