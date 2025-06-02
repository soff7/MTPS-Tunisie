import React, { Component } from 'react';

class UsersManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: true,
      error: null,
      showAddForm: false,
      newUser: {
        name: '',
        email: '',
        password: '',
        role: 'Manager',
        privileges: [],
        image: null
      }
    };
    this.API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    this.pages = ['contacts', 'products', 'users', 'analytics', 'settings'];
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
    try {
      const res = await fetch(`${this.API_BASE_URL}/api/users`);
      const data = await res.json();
      this.setState({ users: data, loading: false });
    } catch (err) {
      this.setState({ error: err.message, loading: false });
    }
  };

  handleAddUser = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', this.state.newUser.name);
    formData.append('email', this.state.newUser.email);
    formData.append('password', this.state.newUser.password);
    formData.append('role', this.state.newUser.role);
    formData.append('privileges', JSON.stringify(this.state.newUser.privileges));
    if (this.state.newUser.image) formData.append('image', this.state.newUser.image);

    try {
      const res = await fetch(`${this.API_BASE_URL}/api/users`, {
        method: 'POST',
        body: formData
      });
      const addedUser = await res.json();
      this.setState(prevState => ({
        users: [...prevState.users, addedUser],
        showAddForm: false,
        newUser: { name: '', email: '', password: '', role: 'Manager', privileges: [], image: null }
      }));
    } catch (err) {
      this.setState({ error: err.message });
    }
  };

  handleDelete = async (userId) => {
    try {
      await fetch(`${this.API_BASE_URL}/api/users/${userId}`, {
        method: 'DELETE'
      });
      this.setState(prevState => ({
        users: prevState.users.filter(u => u._id !== userId)
      }));
    } catch (err) {
      this.setState({ error: err.message });
    }
  };

  handleInputChange = (field, value) => {
    this.setState(prevState => ({
      newUser: { ...prevState.newUser, [field]: value }
    }));
  };

  handleFileChange = (field, file) => {
    this.setState(prevState => ({
      newUser: { ...prevState.newUser, [field]: file }
    }));
  };

  handlePrivilegeChange = (page) => {
    this.setState(prevState => {
      const privileges = prevState.newUser.privileges.includes(page)
        ? prevState.newUser.privileges.filter(p => p !== page)
        : [...prevState.newUser.privileges, page];
      return {
        newUser: { ...prevState.newUser, privileges }
      };
    });
  };

  toggleAddForm = () => {
    this.setState(prevState => ({ showAddForm: !prevState.showAddForm }));
  };

  render() {
    const { users, loading, error, showAddForm, newUser } = this.state;

    return (
      <div className="users-management">
        <h1>Gestion des Utilisateurs</h1>
        <button className="add-btn" onClick={this.toggleAddForm}>Ajouter un Administrateur</button>
        
        {showAddForm && (
          <form className="add-user-form" onSubmit={this.handleAddUser}>
            <h2>Ajouter un Nouvel Administrateur</h2>
            <input
              type="text"
              placeholder="Nom"
              value={newUser.name}
              onChange={(e) => this.handleInputChange('name', e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => this.handleInputChange('email', e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={newUser.password}
              onChange={(e) => this.handleInputChange('password', e.target.value)}
              required
            />
            <select
              value={newUser.role}
              onChange={(e) => this.handleInputChange('role', e.target.value)}
            >
              <option value="SuperAdmin">SuperAdmin</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
            </select>
            <div className="privileges-section">
              <h3>Privilèges</h3>
              {this.pages.map(page => (
                <label key={page}>
                  <input
                    type="checkbox"
                    checked={newUser.privileges.includes(page)}
                    onChange={() => this.handlePrivilegeChange(page)}
                  />
                  {page.charAt(0).toUpperCase() + page.slice(1)}
                </label>
              ))}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => this.handleFileChange('image', e.target.files[0])}
            />
            <button type="submit">Ajouter</button>
            <button type="button" onClick={this.toggleAddForm}>Annuler</button>
          </form>
        )}

        {loading ? (
          <p>Chargement...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <div className="users-list">
            {users.map(user => (
              <div key={user._id} className="user-card">
                <h3>{user.name}</h3>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Rôle:</strong> {user.role}</p>
                <p><strong>Privilèges:</strong> {user.privileges.join(', ')}</p>
                {user.image && <img src={`${this.API_BASE_URL}/${user.image}`} alt={user.name} />}
                <button className="delete-btn" onClick={() => this.handleDelete(user._id)}>Supprimer</button>
              </div>
            ))}
          </div>
        )}
        <style>
          {`
            .users-management {
              padding: 2rem;
              background-color: #1A3C4D;
              color: white;
              min-height: 100vh;
            }

            .users-management h1 {
              font-size: 2.5rem;
              margin-bottom: 2rem;
            }

            .add-btn {
              padding: 0.75rem 1.5rem;
              background-color: #4A8CAD;
              color: white;
              border: none;
              border-radius: 5px;
              cursor: pointer;
              margin-bottom: 1rem;
            }

            .add-user-form {
              background-color: #2A5C7D;
              padding: 1.5rem;
              border-radius: 8px;
              margin-bottom: 2rem;
            }

            .add-user-form h2 {
              margin-bottom: 1rem;
            }

            .add-user-form input,
            .add-user-form select {
              width: 100%;
              padding: 0.5rem;
              margin-bottom: 1rem;
              border-radius: 5px;
            }

            .privileges-section {
              margin-bottom: 1rem;
            }

            .privileges-section label {
              display: block;
              margin-bottom: 0.5rem;
            }

            .add-user-form button {
              padding: 0.5rem 1rem;
              border: none;
              border-radius: 5px;
              cursor: pointer;
              margin-right: 0.5rem;
            }

            .add-user-form button[type="submit"] {
              background-color: #4A8CAD;
              color: white;
            }

            .add-user-form button[type="button"] {
              background-color: #D9534F;
              color: white;
            }

            .users-list {
              display: flex;
              flex-direction: column;
              gap: 1.5rem;
            }

            .user-card {
              background-color: #2A5C7D;
              padding: 1.5rem;
              border-radius: 8px;
            }

            .user-card img {
              max-width: 200px;
              margin: 1rem 0;
            }

            .delete-btn {
              padding: 0.5rem 1rem;
              background-color: #D9534F;
              color: white;
              border: none;
              border-radius: 5px;
              cursor: pointer;
            }

            .error {
              color: #D9534F;
            }
          `}
        </style>
      </div>
    );
  }
}

export default UsersManagement;